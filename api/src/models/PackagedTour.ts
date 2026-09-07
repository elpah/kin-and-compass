import type { PackagedTour } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";
import { serializeTourImage } from "./CustomExperience.js";

const PackagedTourSchema = new Schema(
  {
    packagedTourId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, default: "" },
    price: { type: Number, required: true, default: 0 },
    image: {
      linkUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    tourIds: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "packaged_tours", strict: false },
);

export const PackagedTourModel =
  mongoose.models.PackagedTour ?? mongoose.model("PackagedTour", PackagedTourSchema);

export function serializePackagedTour(doc: Record<string, unknown>): PackagedTour {
  const tourIds = (doc.tourIds as string[] | undefined) ?? (doc.experienceSlugs as string[] | undefined) ?? [];
  return {
    packagedTourId: String(doc.packagedTourId ?? doc.slug ?? ""),
    name: String(doc.name ?? ""),
    description: String(doc.description ?? ""),
    duration: String(doc.duration ?? ""),
    price: Number(doc.price ?? 0),
    image: serializeTourImage(doc.image),
    tourIds,
    active: doc.active !== false,
    deleted: Boolean(doc.deletedAt),
  };
}
