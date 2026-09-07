import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { mkdirSync } from "fs";
import { join } from "path";
import { env } from "./env.js";

export const CLOUDINARY_FOLDER = "kinandcompass";

export const uploadDir = join(process.cwd(), "uploads");
mkdirSync(uploadDir, { recursive: true });

if (env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });
} else {
  cloudinary.config({ secure: true });
}

export type CloudinaryUpload = {
  linkUrl: string;
  publicId: string;
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype);
    cb(null, ok);
  },
});

export async function uploadToCloudinary(
  file: Express.Multer.File | undefined,
  subfolder: string,
): Promise<CloudinaryUpload | null> {
  if (!file?.buffer) return null;
  const folder = `${CLOUDINARY_FOLDER}/${subfolder}`;
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, uploaded) => {
        if (error || !uploaded) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(uploaded);
      },
    );
    stream.end(file.buffer);
  });
  return { linkUrl: result.secure_url, publicId: result.public_id };
}

export async function uploadManyToCloudinary(files: Express.Multer.File[] | undefined, subfolder: string) {
  if (!files?.length) return [];
  const uploaded: CloudinaryUpload[] = [];
  for (const file of files) {
    const item = await uploadToCloudinary(file, subfolder);
    if (item) uploaded.push(item);
  }
  return uploaded;
}
