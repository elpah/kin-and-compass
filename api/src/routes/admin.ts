import { Router } from "express";
import {
  clearAdminCookie,
  readAdminSession,
  requireAdmin,
  setAdminCookie,
  signAdminToken,
  verifyAdminLogin,
} from "../auth.js";

export const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  const user = await verifyAdminLogin(String(email), String(password));
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token = await signAdminToken({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role: "admin",
  });
  setAdminCookie(res, token);
  res.json({ user: { name: user.name, email: user.email } });
});

adminRouter.post("/logout", (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

adminRouter.get("/me", async (_req, res) => {
  res.json({ user: { name: "Preview", email: "admin@kinandcompass.com" } });
});
