import type { CloudinaryImage, CustomExperience } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";

const CustomExperienceSchema = new Schema(
  {
    tourId: { type: String, required: true, unique: true, index: true },
    tourName: { type: String, required: true },
    tourDescription: { type: String, default: "" },
    tourDuration: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    tourImage: {
      linkUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  { timestamps: true, collection: "custom_tours", strict: false },
);

export const CustomExperienceModel =
  mongoose.models.CustomExperience ?? mongoose.model("CustomExperience", CustomExperienceSchema);

export function serializeTourImage(value: unknown): CloudinaryImage {
  if (typeof value === "string") {
    return { linkUrl: value, publicId: "" };
  }
  if (value && typeof value === "object") {
    const row = value as { linkUrl?: string; publicId?: string };
    return { linkUrl: String(row.linkUrl ?? ""), publicId: String(row.publicId ?? "") };
  }
  return { linkUrl: "", publicId: "" };
}

export function serializeCustomExperience(doc: Record<string, unknown>): CustomExperience {
  return {
    tourId: String(doc.tourId ?? doc.slug ?? ""),
    tourName: String(doc.tourName ?? doc.name ?? ""),
    tourDescription: String(doc.tourDescription ?? doc.description ?? ""),
    tourDuration: String(doc.tourDuration ?? doc.duration ?? ""),
    tourPrice: Number(doc.tourPrice ?? doc.price ?? 0),
    tourImage: serializeTourImage(doc.tourImage ?? doc.TourImage ?? doc.image),
    active: doc.active !== false,
    deleted: Boolean(doc.deletedAt),
  };
}
