import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { CustomExperienceModel } from "../models/CustomExperience.js";
import { PackagedTourModel, serializePackagedTour } from "../models/PackagedTour.js";
import { parsePackagedTourFields } from "../parse-tour.js";
import { fileUrl, upload } from "../uploads.js";

export const tourRouter = Router();
const imageUpload = upload.single("image");

async function coverFromExperiences(slugs: string[]) {
  const first = await CustomExperienceModel.findOne({ slug: slugs[0] }).lean();
  return first?.image ? String(first.image) : "";
}

tourRouter.get("/", async (req, res) => {
  try {
    const activeOnly = req.query.active === "true";
    const filter = activeOnly ? { active: true } : {};
    const rows = await PackagedTourModel.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ tours: rows.map((row) => serializePackagedTour(row as Record<string, unknown>)) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load tours" });
  }
});

tourRouter.get("/:slug", async (req, res) => {
  try {
    const doc = await PackagedTourModel.findOne({ slug: req.params.slug }).lean();
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
    let image = fileUrl(req.file);
    if (!image) image = await coverFromExperiences(fields.experienceSlugs);
    if (!image) {
      res.status(400).json({ error: "Add a photo, or pick trips that already have photos" });
      return;
    }
    const existing = await PackagedTourModel.findOne({ slug: fields.slug });
    if (existing) {
      res.status(409).json({ error: "A tour with this name already exists" });
      return;
    }
    const created = await PackagedTourModel.create({ ...fields, image });
    res.status(201).json({ tour: serializePackagedTour(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create tour" });
  }
});

tourRouter.put("/:slug", requireAdmin, imageUpload, async (req, res) => {
  try {
    const current = await PackagedTourModel.findOne({ slug: req.params.slug });
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parsePackagedTourFields(req.body ?? {});
    const nextImage = fileUrl(req.file) || (current.image as string) || (await coverFromExperiences(fields.experienceSlugs));
    current.set({ ...fields, slug: current.slug, image: nextImage });
    await current.save();
    res.json({ tour: serializePackagedTour(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update tour" });
  }
});

tourRouter.delete("/:slug", requireAdmin, async (req, res) => {
  const deleted = await PackagedTourModel.findOneAndDelete({ slug: req.params.slug });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
