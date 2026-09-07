import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), "../.env") });
config({ path: resolve(process.cwd(), "../.env.local"), override: true });

export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  websiteUrl: process.env.WEBSITE_URL ?? "http://localhost:3000",
  adminUrl: process.env.ADMIN_URL ?? "http://localhost:3001",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  cloudinaryUrl: process.env.CLOUDINARY_URL ?? "",
};

export function requireEnv() {
  if (!env.mongoUri) throw new Error("MONGODB_URI is not set");
  if (!env.authSecret) throw new Error("AUTH_SECRET is not set");
}
