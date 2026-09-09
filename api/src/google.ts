import { env } from "./env.js";

export async function googleProfileFromIdToken(idToken: string) {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );
  if (!response.ok) return null;
  const payload = (await response.json()) as {
    aud?: string;
    email?: string;
    email_verified?: boolean | string;
    name?: string;
    sub?: string;
    iss?: string;
  };
  const issuerOk =
    payload.iss === "https://accounts.google.com" || payload.iss === "accounts.google.com";
  const verified = payload.email_verified === true || payload.email_verified === "true";
  const email = String(payload.email ?? "").trim().toLowerCase();
  const sub = String(payload.sub ?? "").trim();
  if (!issuerOk || !verified || !email.includes("@") || !sub) return null;
  if (!env.googleClientId || payload.aud !== env.googleClientId) return null;
  return {
    email,
    name: String(payload.name ?? "").trim() || email.split("@")[0] || "Guest",
    googleId: sub,
  };
}
