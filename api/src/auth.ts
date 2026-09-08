import type { Request, Response, NextFunction } from "express";
import { bearerToken, verifyAuthToken, type AuthToken } from "./token.js";

export type AdminSession = AuthToken & { role: "admin" };

export async function readAdminSession(req: Request): Promise<AdminSession | null> {
  const token = bearerToken(req.headers.authorization);
  if (!token) return null;
  try {
    const user = await verifyAuthToken(token);
    if (user.role !== "admin") return null;
    return { ...user, role: "admin" };
  } catch {
    return null;
  }
}

export async function requireUser(req: Request, res: Response, next: NextFunction) {
  const token = bearerToken(req.headers.authorization);
  if (!token) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  try {
    res.locals.user = await verifyAuthToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : "Sign in required" });
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await readAdminSession(req);
    if (!session) {
      res.status(401).json({ error: "Sign in required" });
      return;
    }
    res.locals.admin = session;
    next();
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : "Sign in required" });
  }
}
