import { jwtVerify, SignJWT } from "jose";
import { env } from "./env.js";

export type AuthToken = {
  sub: string;
  email: string;
  name: string;
  role: "admin" | "customer";
};

function secret() {
  if (!env.authSecret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(env.authSecret);
}

export async function signAuthToken(payload: AuthToken) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyAuthToken(token: string): Promise<AuthToken> {
  const { payload } = await jwtVerify(token, secret());
  const email = String(payload.email ?? "");
  const role = payload.role === "admin" ? "admin" : "customer";
  if (!payload.sub || !email) throw new Error("Invalid token");
  return {
    sub: String(payload.sub),
    email,
    name: String(payload.name ?? email.split("@")[0]),
    role,
  };
}

export function bearerToken(authorization: string | undefined) {
  if (!authorization?.startsWith("Bearer ")) return "";
  return authorization.slice("Bearer ".length).trim();
}
