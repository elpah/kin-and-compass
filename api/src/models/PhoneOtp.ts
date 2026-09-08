import mongoose, { Schema } from "mongoose";

const PhoneOtpSchema = new Schema(
  {
    phone: { type: String, required: true, index: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: "phone_otps" },
);

export const PhoneOtp = mongoose.models.PhoneOtp ?? mongoose.model("PhoneOtp", PhoneOtpSchema);
