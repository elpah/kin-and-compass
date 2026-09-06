import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { parseCustomExperienceFields } from "../parse-experience.js";
import {
  CustomExperienceModel,
  serializeCustomExperience,
} from "../models/CustomExperience.js";
import { fileUrl, upload } from "../uploads.js";

export const experienceRouter = Router();
const imageUpload = upload.single("image");

experienceRouter.get("/", async (req, res) => {
  try {
    const activeOnly = req.query.active === "true";
    const filter = activeOnly ? { active: true } : {};
    const rows = await CustomExperienceModel.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ experiences: rows.map((row) => serializeCustomExperience(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load experiences" });
  }
});

experienceRouter.get("/:slug", async (req, res) => {
  try {
    const doc = await CustomExperienceModel.findOne({ slug: req.params.slug }).lean();
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
    const image = fileUrl(req.file);
    if (!image) {
      res.status(400).json({ error: "An image is required" });
      return;
    }
    const existing = await CustomExperienceModel.findOne({ slug: fields.slug });
    if (existing) {
      res.status(409).json({ error: "A trip with this name already exists" });
      return;
    }
    const created = await CustomExperienceModel.create({ ...fields, image });
    res.status(201).json({ experience: serializeCustomExperience(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create trip" });
  }
});

experienceRouter.put("/:slug", requireAdmin, imageUpload, async (req, res) => {
  try {
    const current = await CustomExperienceModel.findOne({ slug: req.params.slug });
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parseCustomExperienceFields(req.body ?? {});
    const nextImage = fileUrl(req.file);
    current.set({
      ...fields,
      slug: current.slug,
      image: nextImage || current.image,
    });
    await current.save();
    res.json({ experience: serializeCustomExperience(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update trip" });
  }
});

experienceRouter.delete("/:slug", requireAdmin, async (req, res) => {
  const deleted = await CustomExperienceModel.findOneAndDelete({ slug: req.params.slug });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
