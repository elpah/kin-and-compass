import { Router } from "express";
import { readAdminSession, requireAdmin } from "../auth.js";

export const adminRouter = Router();

adminRouter.get("/me", requireAdmin, async (req, res) => {
  const session = res.locals.admin ?? (await readAdminSession(req));
  if (!session) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  res.json({ user: { name: session.name, email: session.email } });
});
