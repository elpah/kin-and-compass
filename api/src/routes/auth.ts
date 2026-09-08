import bcrypt from "bcryptjs";
import { Router } from "express";
import { requireUser } from "../auth.js";
import { User } from "../models/User.js";
import { signAuthToken } from "../token.js";
import type { AuthToken } from "../token.js";

export const authRouter = Router();

function publicUser(user: { id: string; name: string; email: string; role: string }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "admin" : "customer",
  };
}

authRouter.post("/login", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  const role = user.role === "admin" ? "admin" : "customer";
  const token = await signAuthToken({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role,
  });
  res.json({
    token,
    user: publicUser({ id: String(user._id), name: user.name, email: user.email, role }),
  });
});

authRouter.post("/register", async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  if (!name || !email.includes("@") || password.length < 6) {
    res.status(400).json({ error: "Name, a valid email, and a password of at least 6 characters are required." });
    return;
  }
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({ error: "That email already has an account." });
    return;
  }
  const user = await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role: "customer",
  });
  const token = await signAuthToken({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role: "customer",
  });
  res.status(201).json({
    token,
    user: publicUser({ id: String(user._id), name: user.name, email: user.email, role: "customer" }),
  });
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
  if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
    res.status(401).json({ error: "Current password is incorrect." });
    return;
  }
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
});
