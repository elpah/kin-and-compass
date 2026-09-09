import { Router } from "express";
import { env } from "../env.js";
import { guestInquiryHtml, houseInquiryHtml, inquirySubject } from "../mail-templates.js";
import { sendMail } from "../notify.js";

export const inquiryRouter = Router();

const recentHits = new Map<string, number[]>();

function tooMany(key: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (recentHits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (list.length >= 8) {
    recentHits.set(key, list);
    return true;
  }
  list.push(now);
  recentHits.set(key, list);
  return false;
}

function sanitizePayload(raw: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw).slice(0, 24)) {
    const name = key.slice(0, 40);
    if (typeof value === "string") out[name] = value.slice(0, 4000);
    else if (typeof value === "number" && Number.isFinite(value)) out[name] = value;
    else if (typeof value === "boolean") out[name] = value;
    else out[name] = String(value ?? "").slice(0, 4000);
  }
  return out;
}

function ccFor(kind: string) {
  if (kind === "custom-trip" || kind.startsWith("tour:")) return env.mailBooking;
  return env.mailContact;
}

inquiryRouter.post("/", async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (tooMany(ip)) {
    res.status(429).json({ error: "Please wait before sending another message." });
    return;
  }
  const kind = String(req.body?.kind ?? "").trim().slice(0, 80);
  const payload = sanitizePayload(
    req.body?.payload && typeof req.body.payload === "object"
      ? (req.body.payload as Record<string, unknown>)
      : {},
  );
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  if (!kind || !name || !email.includes("@")) {
    res.status(400).json({ error: "Name, email, and a form type are required." });
    return;
  }
  const desk = env.mailAdmin;
  const cc = ccFor(kind);
  if (!desk || !cc || !env.zohoSmtpUser || !env.zohoSmtpPass) {
    res.status(503).json({ error: "Email is not configured." });
    return;
  }
  try {
    const houseOk = await sendMail(desk, inquirySubject(kind, name), houseInquiryHtml(kind, payload), {
      cc,
      replyTo: email,
    });
    if (!houseOk) {
      res.status(503).json({ error: "Could not send email." });
      return;
    }
    await sendMail(email, "We received your message", guestInquiryHtml(name), { replyTo: desk });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Could not send email." });
  }
});
