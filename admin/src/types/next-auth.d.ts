import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: DefaultSession["user"] & {
      role: "admin" | "customer";
    };
  }

  interface User {
    role: "admin" | "customer";
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "customer";
    accessToken?: string;
  }
}
