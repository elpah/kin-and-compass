import { ADMIN_COOKIE } from "@kincompass/shared";
import { compare } from "bcryptjs";
import type { Request, Response, NextFunction } from "express";
import { jwtVerify, SignJWT } from "jose";
import { env } from "./env.js";
import { User } from "./models/User.js";

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: "admin";
};

function secret() {
  if (!env.authSecret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(env.authSecret);
}

export async function signAdminToken(session: AdminSession) {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function readAdminSession(req: Request): Promise<AdminSession | null> {
  const token = req.cookies?.[ADMIN_COOKIE] as string | undefined;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.role !== "admin" || !payload.email || !payload.sub) return null;
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name ?? ""),
      role: "admin",
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = await readAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.locals.admin = session;
  next();
}

export function setAdminCookie(res: Response, token: string) {
  res.cookie(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
}

export function clearAdminCookie(res: Response) {
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
}

export async function verifyAdminLogin(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase(), role: "admin" });
  if (!user) return null;
  const ok = await compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}
