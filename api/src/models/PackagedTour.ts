import type { PackagedTour } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";

const PackagedTourSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    experienceSlugs: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const PackagedTourModel =
  mongoose.models.PackagedTour ?? mongoose.model("PackagedTour", PackagedTourSchema);

export function serializePackagedTour(doc: Record<string, unknown>): PackagedTour {
  const row = doc as unknown as PackagedTour;
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    duration: row.duration,
    price: row.price,
    image: row.image,
    experienceSlugs: row.experienceSlugs ?? [],
    active: row.active !== false,
  };
}
