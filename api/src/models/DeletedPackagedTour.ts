import mongoose, { Schema } from "mongoose";

const DeletedPackagedTourSchema = new Schema(
  {
    packagedTourId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: {
      linkUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    tourIds: { type: [String], default: [] },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "deleted_packaged_tours", strict: false },
);

export const DeletedPackagedTourModel =
  mongoose.models.DeletedPackagedTour ?? mongoose.model("DeletedPackagedTour", DeletedPackagedTourSchema);
