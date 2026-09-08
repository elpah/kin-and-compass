import "@/lib/load-root-env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) return null;
        const data = (await response.json()) as {
          token: string;
          user: { id: string; name: string; email: string; role: "admin" | "customer" };
        };
        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          accessToken: data.token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.role === "admin";
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : "";
      if (session.user) {
        session.user.role = token.role === "admin" ? "admin" : "customer";
      }
      return session;
    },
  },
});
