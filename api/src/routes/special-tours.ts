import { randomUUID } from "crypto";
import { Router } from "express";
import { readAdminSession, requireAdmin } from "../auth.js";
import { hardDeleteFromArchive, moveToArchive, restoreFromArchive } from "../archive.js";
import { DeletedSpecialTourModel } from "../models/DeletedSpecialTour.js";
import { SpecialTourCategoryModel } from "../models/SpecialTourCategory.js";
import { SpecialTourModel, serializeSpecialTour } from "../models/SpecialTour.js";
import { MAX_GALLERY_IMAGES } from "@kincompass/shared";
import { parseKeepImages, parseSpecialTourFields } from "../parse-special-tour.js";
import { routeParam } from "../route-param.js";
import { assertGalleryLimit, upload, uploadManyToCloudinary } from "../uploads.js";
import { ensureDefaultSpecialTourCategories } from "./special-tour-categories.js";

export const specialTourRouter = Router();
const imagesUpload = upload.array("images", MAX_GALLERY_IMAGES);

const lookup = (tourId: string) => ({ $or: [{ tourId }, { slug: tourId }] });

specialTourRouter.get("/", async (req, res) => {
  try {
    await ensureDefaultSpecialTourCategories();
    const view = String(req.query.view ?? "");
    const activeOnly = req.query.active === "true";
    const category = String(req.query.category ?? "").trim();
    const admin = await readAdminSession(req);

    if (view === "deleted") {
      if (!admin) {
        res.status(401).json({ error: "Sign in required" });
        return;
      }
      const filter = category ? { categorySlug: category } : {};
      const rows = await DeletedSpecialTourModel.find(filter).sort({ deletedAt: -1, createdAt: -1 }).lean();
      res.json({
        tours: rows.map((row) => ({
          ...serializeSpecialTour(row as Record<string, unknown>),
          deleted: true,
        })),
      });
      return;
    }

    const filter: Record<string, unknown> = {};
    if (!admin || activeOnly) filter.active = { $ne: false };
    if (category) filter.categorySlug = category;
    const live = await SpecialTourModel.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ tours: live.map((row) => serializeSpecialTour(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load special tours" });
  }
});

specialTourRouter.get("/:tourId", async (req, res) => {
  try {
    const tourId = routeParam(req.params.tourId);
    const admin = await readAdminSession(req);
    const doc = await SpecialTourModel.findOne(lookup(tourId)).lean();
    if (!doc) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const tour = serializeSpecialTour(doc as Record<string, unknown>);
    if (!admin && !tour.active) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ tour });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load special tour" });
  }
});

specialTourRouter.post("/", requireAdmin, imagesUpload, async (req, res) => {
  try {
    const fields = parseSpecialTourFields(req.body ?? {});
    const category = await SpecialTourCategoryModel.findOne({ slug: fields.categorySlug });
    if (!category) {
      res.status(400).json({ error: "Choose a valid category" });
      return;
    }
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    assertGalleryLimit(files.length);
    const images = await uploadManyToCloudinary(files, "pulse_tours");
    if (!images.length) {
      res.status(400).json({ error: "Add at least one photo" });
      return;
    }
    const tourId = randomUUID();
    const created = await SpecialTourModel.create({ ...fields, tourId, images });
    res.status(201).json({ tour: serializeSpecialTour(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create special tour" });
  }
});

specialTourRouter.put("/:tourId", requireAdmin, imagesUpload, async (req, res) => {
  try {
    const tourId = routeParam(req.params.tourId);
    const current = await SpecialTourModel.findOne(lookup(tourId));
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parseSpecialTourFields(req.body ?? {});
    const category = await SpecialTourCategoryModel.findOne({ slug: fields.categorySlug });
    if (!category) {
      res.status(400).json({ error: "Choose a valid category" });
      return;
    }
    const kept = parseKeepImages(req.body ?? {});
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    assertGalleryLimit(kept.length + files.length);
    const uploaded = await uploadManyToCloudinary(files, "pulse_tours");
    const images = [...kept, ...uploaded];
    if (!images.length) {
      res.status(400).json({ error: "Add at least one photo" });
      return;
    }
    current.set({
      ...fields,
      tourId: current.get("tourId"),
      images,
    });
    await current.save();
    res.json({ tour: serializeSpecialTour(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update special tour" });
  }
});

specialTourRouter.post("/:tourId/restore", requireAdmin, async (req, res) => {
  try {
    const restored = await restoreFromArchive(
      DeletedSpecialTourModel,
      SpecialTourModel,
      lookup(routeParam(req.params.tourId)),
    );
    if (!restored) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ tour: serializeSpecialTour(restored.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to restore special tour" });
  }
});

specialTourRouter.delete("/:tourId", requireAdmin, async (req, res) => {
  const query = lookup(routeParam(req.params.tourId));
  if (req.query.permanent === "true") {
    const removed = await hardDeleteFromArchive(DeletedSpecialTourModel, query);
    if (!removed) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ok: true });
    return;
  }
  const deleted = await moveToArchive(SpecialTourModel, DeletedSpecialTourModel, query);
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
