import { Router } from "express";
import { env } from "../env.js";
import { guestInquiryHtml, houseInquiryHtml, inquirySubject } from "../mail-templates.js";
import { sendMail } from "../notify.js";

export const inquiryRouter = Router();

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
