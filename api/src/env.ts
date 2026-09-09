import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), "../.env") });
config({ path: resolve(process.cwd(), "../.env.local"), override: true });

function originFrom(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  if (!trimmed) return [];
  try {
    const parsed = new URL(trimmed);
    const hosts = new Set([parsed.origin]);
    if (parsed.hostname.startsWith("www.")) {
      parsed.hostname = parsed.hostname.slice(4);
    } else if (parsed.hostname !== "localhost" && !parsed.hostname.endsWith(".localhost")) {
      parsed.hostname = `www.${parsed.hostname}`;
    }
    hosts.add(parsed.origin);
    return [...hosts];
  } catch {
    return [trimmed];
  }
}

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
  zohoSmtpHost: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com",
  zohoSmtpPort: Number(process.env.ZOHO_SMTP_PORT ?? 465),
  zohoSmtpUser: process.env.ZOHO_SMTP_USER ?? "",
  zohoSmtpPass: process.env.ZOHO_SMTP_PASS ?? "",
  mailAdmin: process.env.MAIL_ADMIN ?? process.env.ADMIN_EMAIL ?? "",
  mailContact: process.env.MAIL_CONTACT ?? "",
  mailBooking: process.env.MAIL_BOOKING ?? "",
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioFrom: process.env.TWILIO_FROM ?? "",
};

export const corsOrigins = [
  ...originFrom(env.websiteUrl),
  ...originFrom(env.adminUrl),
  ...(process.env.CORS_ORIGINS ?? "")
    .split(",")
    .flatMap((value) => originFrom(value)),
].filter((value, index, all) => all.indexOf(value) === index);

export function requireEnv() {
  if (!env.mongoUri) throw new Error("MONGODB_URI is not set");
  if (!env.authSecret || env.authSecret.length < 16) {
    throw new Error("Set AUTH_SECRET to a long random string");
  }
}
