import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), "../.env.local") });
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), "../.env") });

export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  websiteUrl: process.env.WEBSITE_URL ?? "http://localhost:3000",
  adminUrl: process.env.ADMIN_URL ?? "http://localhost:3001",
};

export function requireEnv() {
  if (!env.mongoUri) throw new Error("MONGODB_URI is not set");
  if (!env.authSecret) throw new Error("AUTH_SECRET is not set");
}
