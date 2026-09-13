import type { SpecialTourCategory } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";
import { serializeTourImage } from "./CustomExperience.js";
import { serializeSpecialTourImages } from "./SpecialTour.js";

const SpecialTourCategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    line: { type: String, default: "" },
    sortOrder: { type: Number, default: 0, index: true },
    tourPrice: { type: Number, default: 0 },
    tourDuration: { type: String, default: "1 Day" },
    cover: {
      linkUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    images: {
      type: [
        {
          linkUrl: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, collection: "special_tour_categories" },
);

export const SpecialTourCategoryModel =
  mongoose.models.SpecialTourCategory ??
  mongoose.model("SpecialTourCategory", SpecialTourCategorySchema);

export function serializeSpecialTourCategory(doc: Record<string, unknown>): SpecialTourCategory {
  const cover = serializeTourImage(doc.cover);
  const fromGallery = serializeSpecialTourImages(doc.images);
  const images = fromGallery.length ? fromGallery : cover.linkUrl ? [cover] : [];
  return {
    slug: String(doc.slug ?? ""),
    label: String(doc.label ?? ""),
    line: String(doc.line ?? ""),
    sortOrder: Number(doc.sortOrder ?? 0),
    tourPrice: Number(doc.tourPrice ?? 0),
    tourDuration: String(doc.tourDuration || "1 Day"),
    images,
    cover: images[0],
  };
}
