import { randomUUID } from "crypto";
import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { CustomExperienceModel, serializeTourImage } from "../models/CustomExperience.js";
import { PackagedTourModel, serializePackagedTour } from "../models/PackagedTour.js";
import { parsePackagedTourFields } from "../parse-tour.js";
import { DeletedPackagedTourModel } from "../models/DeletedPackagedTour.js";
import { hardDeleteFromArchive, moveToArchive, restoreFromArchive } from "../archive.js";
import { upload, uploadToCloudinary } from "../uploads.js";

export const tourRouter = Router();
const imageUpload = upload.single("image");

function findPackagedTour(id: string) {
  return PackagedTourModel.findOne({
    $or: [{ packagedTourId: id }, { slug: id }],
  });
}

async function coverFromCustomTours(ids: string[]) {
  const first = await CustomExperienceModel.findOne({
    $or: [{ tourId: ids[0] }, { slug: ids[0] }],
  }).lean();
  if (!first) return { linkUrl: "", publicId: "" };
  return serializeTourImage(
    (first as { tourImage?: unknown }).tourImage ??
      (first as { TourImage?: unknown }).TourImage ??
      (first as { image?: unknown }).image,
  );
}

async function priceFromCustomTours(ids: string[]) {
  const rows = await CustomExperienceModel.find({
    $or: [{ tourId: { $in: ids } }, { slug: { $in: ids } }],
  }).lean();
  const byId = new Map(
    rows.map((row) => {
      const id = String((row as { tourId?: string; slug?: string }).tourId ?? (row as { slug?: string }).slug ?? "");
      const price = Number((row as { tourPrice?: number; price?: number }).tourPrice ?? (row as { price?: number }).price ?? 0);
      return [id, price] as const;
    }),
  );
  return ids.reduce((sum, id) => sum + (byId.get(id) ?? 0), 0);
}

tourRouter.get("/", async (req, res) => {
  try {
    const view = String(req.query.view ?? "");
    const activeOnly = req.query.active === "true";

    if (view === "deleted") {
      const rows = await DeletedPackagedTourModel.find().sort({ deletedAt: -1, createdAt: -1 }).lean();
      res.json({
        tours: rows.map((row) => ({ ...serializePackagedTour(row as Record<string, unknown>), deleted: true })),
      });
      return;
    }

    const filter = activeOnly ? { active: { $ne: false } } : {};
    const live = await PackagedTourModel.find(filter).sort({ createdAt: -1 }).lean();
    if (view === "all") {
      const archived = await DeletedPackagedTourModel.find().sort({ deletedAt: -1, createdAt: -1 }).lean();
      res.json({
        tours: [
          ...live.map((row) => serializePackagedTour(row as Record<string, unknown>)),
          ...archived.map((row) => ({ ...serializePackagedTour(row as Record<string, unknown>), deleted: true })),
        ],
      });
      return;
    }

    res.json({ tours: live.map((row) => serializePackagedTour(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load tours" });
  }
});

tourRouter.get("/:id", async (req, res) => {
  try {
    const doc = await findPackagedTour(req.params.id).lean();
    if (!doc) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ tour: serializePackagedTour(doc as Record<string, unknown>) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load tour" });
  }
});

tourRouter.post("/", requireAdmin, imageUpload, async (req, res) => {
  try {
    const fields = parsePackagedTourFields(req.body ?? {});
    const uploaded = await uploadToCloudinary(req.file, "packaged-tours");
    const image = uploaded ?? (await coverFromCustomTours(fields.tourIds));
    if (!image.linkUrl) {
      res.status(400).json({ error: "Add a photo, or pick trips that already have photos" });
      return;
    }
    const price = await priceFromCustomTours(fields.tourIds);
    const created = await PackagedTourModel.create({
      ...fields,
      packagedTourId: randomUUID(),
      duration: "",
      price,
      image,
    });
    res.status(201).json({ tour: serializePackagedTour(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create tour" });
  }
});

tourRouter.put("/:id", requireAdmin, imageUpload, async (req, res) => {
  try {
    const current = await findPackagedTour(req.params.id);
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parsePackagedTourFields(req.body ?? {});
    const uploaded = await uploadToCloudinary(req.file, "packaged-tours");
    const currentImage = serializeTourImage(current.get("image"));
    const fallback = await coverFromCustomTours(fields.tourIds);
    const image = uploaded ?? (currentImage.linkUrl ? currentImage : fallback);
    const price = await priceFromCustomTours(fields.tourIds);
    current.set({
      ...fields,
      packagedTourId: current.get("packagedTourId") || current.get("slug"),
      duration: "",
      price,
      image,
    });
    await current.save();
    res.json({ tour: serializePackagedTour(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update tour" });
  }
});

const packagedTourLookup = (id: string) => ({
  $or: [{ packagedTourId: id }, { slug: id }],
});

tourRouter.post("/:id/restore", requireAdmin, async (req, res) => {
  try {
    const restored = await restoreFromArchive(
      DeletedPackagedTourModel,
      PackagedTourModel,
      packagedTourLookup(req.params.id),
    );
    if (!restored) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ tour: serializePackagedTour(restored.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to restore tour" });
  }
});

tourRouter.delete("/:id", requireAdmin, async (req, res) => {
  const query = packagedTourLookup(req.params.id);
  if (req.query.permanent === "true") {
    const removed = await hardDeleteFromArchive(DeletedPackagedTourModel, query);
    if (!removed) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ok: true });
    return;
  }
  const deleted = await moveToArchive(PackagedTourModel, DeletedPackagedTourModel, query);
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
