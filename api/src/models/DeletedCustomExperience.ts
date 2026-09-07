import mongoose, { Schema } from "mongoose";

const DeletedCustomExperienceSchema = new Schema(
  {
    tourId: { type: String, required: true, index: true },
    tourName: { type: String, required: true },
    tourDuration: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    tourImage: {
      linkUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "deleted_custom_tours", strict: false },
);

export const DeletedCustomExperienceModel =
  mongoose.models.DeletedCustomExperience ??
  mongoose.model("DeletedCustomExperience", DeletedCustomExperienceSchema);
