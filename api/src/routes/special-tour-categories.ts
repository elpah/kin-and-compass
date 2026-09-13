import { defaultSpecialTourCategories, slugify } from "@kincompass/shared";
import { Router } from "express";
import { requireAdmin } from "../auth.js";
import {
  SpecialTourCategoryModel,
  serializeSpecialTourCategory,
} from "../models/SpecialTourCategory.js";
import { parseKeepImages } from "../parse-special-tour.js";
import { routeParam } from "../route-param.js";
import { destroyRemovedCloudinaryImages, upload, uploadManyToCloudinary, uploadToCloudinary } from "../uploads.js";

export const specialTourCategoryRouter = Router();
const imagesUpload = upload.fields([
  { name: "images", maxCount: 12 },
  { name: "cover", maxCount: 1 },
]);

export async function ensureDefaultSpecialTourCategories() {
  const count = await SpecialTourCategoryModel.countDocuments();
  if (count > 0) return;
  await SpecialTourCategoryModel.insertMany([...defaultSpecialTourCategories]);
}

function parseCategoryFields(body: Record<string, unknown>) {
  const label = String(body.label ?? "").trim();
  const line = String(body.line ?? "").trim();
  const tourDuration = String(body.tourDuration ?? body.duration ?? "").trim() || "1 Day";
  const tourPrice = Number(body.tourPrice ?? body.price ?? 0);
  if (!label) throw new Error("Tour name is required");
  if (!Number.isFinite(tourPrice) || tourPrice < 0) throw new Error("Tour price is required");
  return { label, line, tourPrice, tourDuration };
}

async function readUploadedImages(req: {
  files?: Express.Multer.File[] | Record<string, Express.Multer.File[]>;
  file?: Express.Multer.File;
}) {
  const grouped = req.files && !Array.isArray(req.files) ? req.files : undefined;
  const listed = Array.isArray(req.files) ? req.files : [];
  const fromImages = grouped?.images ?? listed;
  const fromCover = grouped?.cover ?? (req.file ? [req.file] : []);
  const uploaded = await uploadManyToCloudinary([...fromImages, ...fromCover], "pulse_tours");
  if (uploaded.length) return uploaded;
  const one = await uploadToCloudinary(req.file, "pulse_tours");
  return one ? [one] : [];
}

specialTourCategoryRouter.get("/", async (_req, res) => {
  try {
    await ensureDefaultSpecialTourCategories();
    const rows = await SpecialTourCategoryModel.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json({ categories: rows.map((row) => serializeSpecialTourCategory(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load categories" });
  }
});

specialTourCategoryRouter.post("/", requireAdmin, imagesUpload, async (req, res) => {
  try {
    await ensureDefaultSpecialTourCategories();
    const fields = parseCategoryFields(req.body ?? {});
    const slug = slugify(fields.label);
    if (!slug) {
      res.status(400).json({ error: "Tour name is required" });
      return;
    }
    const existing = await SpecialTourCategoryModel.findOne({ slug });
    if (existing) {
      res.status(409).json({ error: "That tour already exists" });
      return;
    }
    const images = await readUploadedImages(req);
    const last = await SpecialTourCategoryModel.findOne().sort({ sortOrder: -1 }).lean();
    const sortOrder = Number((last as { sortOrder?: number } | null)?.sortOrder ?? -1) + 1;
    const created = await SpecialTourCategoryModel.create({
      ...fields,
      slug,
      sortOrder,
      images,
      cover: images[0] ?? { linkUrl: "", publicId: "" },
    });
    res.status(201).json({ category: serializeSpecialTourCategory(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create tour" });
  }
});

specialTourCategoryRouter.put("/:slug", requireAdmin, imagesUpload, async (req, res) => {
  try {
    const slug = routeParam(req.params.slug);
    const current = await SpecialTourCategoryModel.findOne({ slug });
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parseCategoryFields(req.body ?? {});
    const kept = parseKeepImages(req.body ?? {});
    const uploaded = await readUploadedImages(req);
    const keepSent = typeof req.body?.keepImages === "string";
    const existing = serializeSpecialTourCategory(current.toObject()).images;
    const images = keepSent || uploaded.length ? [...kept, ...uploaded] : existing;
    await destroyRemovedCloudinaryImages(existing, images);
    current.set({
      ...fields,
      slug: current.get("slug"),
      images,
      cover: images[0] ?? { linkUrl: "", publicId: "" },
    });
    await current.save();
    res.json({ category: serializeSpecialTourCategory(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update tour" });
  }
});

specialTourCategoryRouter.delete("/:slug", requireAdmin, async (req, res) => {
  try {
    const slug = routeParam(req.params.slug);
    const removed = await SpecialTourCategoryModel.findOneAndDelete({ slug });
    if (!removed) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const images = serializeSpecialTourCategory(removed.toObject()).images;
    await destroyRemovedCloudinaryImages(images, []);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to delete tour" });
  }
});
