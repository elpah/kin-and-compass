import { Router } from "express";
import { env } from "../env.js";
import { sendMail } from "../notify.js";

export const inquiryRouter = Router();

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ccFor(kind: string) {
  if (kind === "custom-trip" || kind.startsWith("tour:")) return env.mailBooking;
  return env.mailContact;
}

inquiryRouter.post("/", async (req, res) => {
  const kind = String(req.body?.kind ?? "").trim();
  const payload =
    req.body?.payload && typeof req.body.payload === "object"
      ? (req.body.payload as Record<string, unknown>)
      : {};
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
  const rows = Object.entries(payload)
    .map(([key, value]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top"><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(String(value ?? ""))}</td></tr>`)
    .join("");
  const houseHtml = `<p>New ${escapeHtml(kind)} inquiry from ${escapeHtml(name)}.</p><table>${rows}</table>`;
  const guestHtml = `<p>Hello ${escapeHtml(name)},</p><p>We received your message and will write back shortly.</p><p>Kin and Compass</p>`;
  try {
    const houseOk = await sendMail(desk, `New inquiry: ${kind}`, houseHtml, { cc, replyTo: email });
    const guestOk = await sendMail(email, "We received your message", guestHtml, { replyTo: desk });
    if (!houseOk || !guestOk) {
      res.status(503).json({ error: "Could not send email." });
      return;
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Could not send email." });
  }
});
