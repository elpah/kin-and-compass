import bcrypt from "bcryptjs";
import { createHash, randomBytes, randomInt } from "crypto";
import { Router } from "express";
import { requireUser } from "../auth.js";
import { env } from "../env.js";
import { PhoneOtp } from "../models/PhoneOtp.js";
import { User } from "../models/User.js";
import { sendMail, sendSms } from "../notify.js";
import { normalizePhone } from "../phone.js";
import { signAuthToken } from "../token.js";
import type { AuthToken } from "../token.js";

export const authRouter = Router();

function publicUser(user: { id: string; name: string; email?: string; phone?: string; role: string }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email ?? "",
    phone: user.phone ?? "",
    role: user.role === "admin" ? "admin" : "customer",
  };
}

function sessionEmail(user: { email?: string; phone?: string }) {
  return (user.email || user.phone || "user").toLowerCase();
}

async function sessionFor(user: { _id: unknown; name: string; email?: string; phone?: string; role?: string }) {
  const role = user.role === "admin" ? "admin" : "customer";
  const id = String(user._id);
  const token = await signAuthToken({
    sub: id,
    email: sessionEmail(user),
    name: user.name,
    role,
  });
  return { token, user: publicUser({ id, name: user.name, email: user.email, phone: user.phone, role }) };
}

authRouter.post("/login", async (req, res) => {
  const identifier = String(req.body?.identifier ?? req.body?.email ?? "").trim();
  const password = String(req.body?.password ?? "");
  if (!identifier || !password) {
    res.status(400).json({ error: "Email or phone, and password, are required." });
    return;
  }
  const phone = normalizePhone(identifier);
  const user = identifier.includes("@")
    ? await User.findOne({ email: identifier.toLowerCase() })
    : phone
      ? await User.findOne({ phone })
      : null;
  if (!user?.passwordHash) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  if (!(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  res.json(await sessionFor(user));
});

authRouter.post("/register", async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(req.body?.phone ?? ""));
  const password = String(req.body?.password ?? "");
  if (!name || password.length < 6) {
    res.status(400).json({ error: "Name and a password of at least 6 characters are required." });
    return;
  }
  if (!email.includes("@") && !phone) {
    res.status(400).json({ error: "Provide an email or a phone number." });
    return;
  }
  if (email.includes("@") && (await User.findOne({ email }))) {
    res.status(409).json({ error: "That email already has an account." });
    return;
  }
  if (phone && (await User.findOne({ phone }))) {
    res.status(409).json({ error: "That phone number already has an account." });
    return;
  }
  const user = await User.create({
    name,
    email: email.includes("@") ? email : undefined,
    phone: phone || undefined,
    passwordHash: await bcrypt.hash(password, 10),
    role: "customer",
  });
  res.status(201).json(await sessionFor(user));
});

authRouter.post("/oauth", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const name = String(req.body?.name ?? "").trim() || email.split("@")[0] || "Guest";
  const googleId = String(req.body?.providerId ?? "").trim();
  if (!email.includes("@") || !googleId) {
    res.status(400).json({ error: "Google sign-in is missing an email." });
    return;
  }
  let user = await User.findOne({ $or: [{ googleId }, { email }] });
  if (!user) {
    user = await User.create({ name, email, googleId, role: "customer" });
  } else {
    if (!user.googleId) user.googleId = googleId;
    if (!user.name) user.name = name;
    await user.save();
  }
  res.json(await sessionFor(user));
});

authRouter.post("/forgot", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  res.json({ ok: true });
  if (!email.includes("@")) return;
  const user = await User.findOne({ email });
  if (!user?.passwordHash) return;
  const raw = randomBytes(32).toString("hex");
  user.resetTokenHash = createHash("sha256").update(raw).digest("hex");
  user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60);
  await user.save();
  const link = `${env.websiteUrl}/reset-password?token=${raw}`;
  await sendMail(
    email,
    "Reset your Kin and Compass password",
    `<p>Reset your password:</p><p><a href="${link}">${link}</a></p><p>This link expires in one hour.</p>`,
  );
});

authRouter.post("/reset", async (req, res) => {
  const token = String(req.body?.token ?? "");
  const password = String(req.body?.password ?? "");
  if (!token || password.length < 6) {
    res.status(400).json({ error: "A valid token and a password of at least 6 characters are required." });
    return;
  }
  const resetTokenHash = createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetTokenHash,
    resetTokenExpires: { $gt: new Date() },
  });
  if (!user) {
    res.status(400).json({ error: "This reset link is invalid or has expired." });
    return;
  }
  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  await user.save();
  res.json({ ok: true });
});

authRouter.post("/phone/start", async (req, res) => {
  const phone = normalizePhone(String(req.body?.phone ?? ""));
  if (!phone) {
    res.status(400).json({ error: "Enter a valid phone number with country code." });
    return;
  }
  const code = String(randomInt(100000, 1000000));
  await PhoneOtp.deleteMany({ phone });
  await PhoneOtp.create({
    phone,
    codeHash: await bcrypt.hash(code, 10),
    expiresAt: new Date(Date.now() + 1000 * 60 * 10),
  });
  const sent = await sendSms(phone, `Your Kin and Compass code is ${code}`);
  if (!sent) {
    res.status(503).json({ error: "Phone sign-in is not configured yet. Use email, or add Twilio keys." });
    return;
  }
  res.json({ ok: true });
});

authRouter.post("/phone/verify", async (req, res) => {
  const phone = normalizePhone(String(req.body?.phone ?? ""));
  const code = String(req.body?.code ?? "").trim();
  const name = String(req.body?.name ?? "").trim();
  if (!phone || code.length !== 6) {
    res.status(400).json({ error: "Enter the 6-digit code we sent." });
    return;
  }
  const otp = await PhoneOtp.findOne({ phone, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
  if (!otp || !(await bcrypt.compare(code, otp.codeHash))) {
    res.status(401).json({ error: "That code is incorrect or has expired." });
    return;
  }
  await PhoneOtp.deleteMany({ phone });
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({
      name: name || phone,
      phone,
      role: "customer",
    });
  }
  res.json(await sessionFor(user));
});

authRouter.post("/password", requireUser, async (req, res) => {
  const session = res.locals.user as AuthToken;
  const currentPassword = String(req.body?.currentPassword ?? "");
  const newPassword = String(req.body?.newPassword ?? "");
  if (newPassword.length < 6) {
    res.status(400).json({ error: "Use a password with at least 6 characters." });
    return;
  }
  const user = await User.findById(session.sub);
  if (!user) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  if (!user.passwordHash || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
    res.status(401).json({ error: "Current password is incorrect." });
    return;
  }
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
});
