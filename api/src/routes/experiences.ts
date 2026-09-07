import { randomUUID } from "crypto";
import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { parseCustomExperienceFields } from "../parse-experience.js";
import {
  CustomExperienceModel,
  serializeCustomExperience,
  serializeTourImage,
} from "../models/CustomExperience.js";
import { DeletedCustomExperienceModel } from "../models/DeletedCustomExperience.js";
import { hardDeleteFromArchive, moveToArchive, restoreFromArchive } from "../archive.js";
import { upload, uploadToCloudinary } from "../uploads.js";

export const experienceRouter = Router();
const imageUpload = upload.single("image");

experienceRouter.get("/", async (req, res) => {
  try {
    const view = String(req.query.view ?? "");
    const activeOnly = req.query.active === "true";

    if (view === "deleted") {
      const rows = await DeletedCustomExperienceModel.find().sort({ deletedAt: -1, createdAt: -1 }).lean();
      res.json({
        experiences: rows.map((row) => ({
          ...serializeCustomExperience(row as Record<string, unknown>),
          deleted: true,
        })),
      });
      return;
    }

    const filter = activeOnly ? { active: { $ne: false } } : {};
    const live = await CustomExperienceModel.find(filter).sort({ createdAt: -1 }).lean();
    if (view === "all") {
      const archived = await DeletedCustomExperienceModel.find().sort({ deletedAt: -1, createdAt: -1 }).lean();
      res.json({
        experiences: [
          ...live.map((row) => serializeCustomExperience(row as Record<string, unknown>)),
          ...archived.map((row) => ({
            ...serializeCustomExperience(row as Record<string, unknown>),
            deleted: true,
          })),
        ],
      });
      return;
    }

    res.json({ experiences: live.map((row) => serializeCustomExperience(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load experiences" });
  }
});

experienceRouter.get("/:tourId", async (req, res) => {
  try {
    const doc = await CustomExperienceModel.findOne({
      $or: [{ tourId: req.params.tourId }, { slug: req.params.tourId }],
    }).lean();
    if (!doc) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ experience: serializeCustomExperience(doc as Record<string, unknown>) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load experience" });
  }
});

experienceRouter.post("/", requireAdmin, imageUpload, async (req, res) => {
  try {
    const fields = parseCustomExperienceFields(req.body ?? {});
    const tourImage = await uploadToCloudinary(req.file, "custom-tours");
    if (!tourImage) {
      res.status(400).json({ error: "An image is required" });
      return;
    }
    const tourId = randomUUID();
    const created = await CustomExperienceModel.create({ ...fields, tourId, tourImage });
    res.status(201).json({ experience: serializeCustomExperience(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create trip" });
  }
});

experienceRouter.put("/:tourId", requireAdmin, imageUpload, async (req, res) => {
  try {
    const current = await CustomExperienceModel.findOne({
      $or: [{ tourId: req.params.tourId }, { slug: req.params.tourId }],
    });
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parseCustomExperienceFields(req.body ?? {});
    const uploaded = await uploadToCloudinary(req.file, "custom-tours");
    const currentImage = serializeTourImage(current.get("tourImage") ?? current.get("TourImage") ?? current.get("image"));
    current.set({
      ...fields,
      tourId: current.get("tourId"),
      tourImage: uploaded ?? currentImage,
    });
    await current.save();
    res.json({ experience: serializeCustomExperience(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update trip" });
  }
});

const experienceLookup = (tourId: string) => ({
  $or: [{ tourId }, { slug: tourId }],
});

experienceRouter.post("/:tourId/restore", requireAdmin, async (req, res) => {
  try {
    const restored = await restoreFromArchive(
      DeletedCustomExperienceModel,
      CustomExperienceModel,
      experienceLookup(req.params.tourId),
    );
    if (!restored) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ experience: serializeCustomExperience(restored.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to restore trip" });
  }
});

experienceRouter.delete("/:tourId", requireAdmin, async (req, res) => {
  const query = experienceLookup(req.params.tourId);
  if (req.query.permanent === "true") {
    const removed = await hardDeleteFromArchive(DeletedCustomExperienceModel, query);
    if (!removed) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ok: true });
    return;
  }
  const deleted = await moveToArchive(CustomExperienceModel, DeletedCustomExperienceModel, query);
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
