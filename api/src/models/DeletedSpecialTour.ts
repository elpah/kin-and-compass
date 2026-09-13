import mongoose, { Schema } from "mongoose";

const DeletedSpecialTourSchema = new Schema(
  {
    tourId: { type: String, required: true, index: true },
    tourName: { type: String, required: true },
    tourDescription: { type: String, default: "" },
    tourDuration: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    categorySlug: { type: String, default: "" },
    images: {
      type: [
        {
          linkUrl: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      ],
      default: [],
    },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "deleted_special_tours", strict: false },
);

export const DeletedSpecialTourModel =
  mongoose.models.DeletedSpecialTour ?? mongoose.model("DeletedSpecialTour", DeletedSpecialTourSchema);
