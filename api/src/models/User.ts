import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true, lowercase: true },
    phone: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    resetTokenHash: { type: String },
    resetTokenExpires: { type: Date },
  },
  { timestamps: true, collection: "users" },
);

export const User = mongoose.models.User ?? mongoose.model("User", UserSchema);
