import type { CustomExperience } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";

const CustomExperienceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const CustomExperienceModel =
  mongoose.models.CustomExperience ?? mongoose.model("CustomExperience", CustomExperienceSchema);

export function serializeCustomExperience(doc: Record<string, unknown>): CustomExperience {
  const row = doc as unknown as CustomExperience;
  return {
    slug: row.slug,
    name: row.name,
    price: row.price,
    duration: row.duration,
    description: row.description,
    image: row.image,
    active: row.active !== false,
  };
}
