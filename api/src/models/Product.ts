import { productCategories } from "@kincompass/shared";
import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    compareAt: { type: Number },
    category: { type: String, required: true, enum: productCategories },
    vendor: { type: String, required: true },
    country: { type: String, required: true, default: "Ghana" },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    description: { type: String, required: true },
    details: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true, collection: "stores" },
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", ProductSchema);
