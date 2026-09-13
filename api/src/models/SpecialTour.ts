import type { CloudinaryImage, SpecialTour } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";
import { serializeTourImage } from "./CustomExperience.js";

const SpecialTourSchema = new Schema(
  {
    tourId: { type: String, required: true, unique: true, index: true },
    tourName: { type: String, required: true },
    tourDescription: { type: String, default: "" },
    tourDuration: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    categorySlug: { type: String, required: true, index: true },
    images: {
      type: [
        {
          linkUrl: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      ],
      default: [],
    },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  { timestamps: true, collection: "special_tours", strict: false },
);

export const SpecialTourModel =
  mongoose.models.SpecialTour ?? mongoose.model("SpecialTour", SpecialTourSchema);

export function serializeSpecialTourImages(value: unknown): CloudinaryImage[] {
  if (!Array.isArray(value)) {
    const one = serializeTourImage(value);
    return one.linkUrl ? [one] : [];
  }
  return value.map((item) => serializeTourImage(item)).filter((item) => item.linkUrl);
}

export function serializeSpecialTour(doc: Record<string, unknown>): SpecialTour {
  const images = serializeSpecialTourImages(doc.images ?? doc.tourImages);
  return {
    tourId: String(doc.tourId ?? ""),
    tourName: String(doc.tourName ?? ""),
    tourDescription: String(doc.tourDescription ?? ""),
    tourDuration: String(doc.tourDuration ?? ""),
    tourPrice: Number(doc.tourPrice ?? 0),
    categorySlug: String(doc.categorySlug ?? ""),
    images,
    tourImage: images[0] ?? { linkUrl: "", publicId: "" },
    active: doc.active !== false,
    deleted: Boolean(doc.deletedAt),
  };
}
