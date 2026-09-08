import "@/lib/load-root-env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type AuthPayload = {
  token: string;
  user: { id: string; name: string; email: string; phone?: string; role: "admin" | "customer" };
};

async function sessionUser(data: AuthPayload) {
  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email || data.user.phone || data.user.id,
    role: data.user.role,
    accessToken: data.token,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email or phone", type: "text" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        const phone = String(credentials?.phone ?? "").trim();
        const code = String(credentials?.code ?? "").trim();
        if (phone && code) {
          const response = await fetch(`${API_URL}/auth/phone/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone,
              code,
              name: String(credentials?.name ?? ""),
            }),
          });
          if (!response.ok) return null;
          return sessionUser((await response.json()) as AuthPayload);
        }
        const identifier = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");
        if (!identifier || !password) return null;
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        });
        if (!response.ok) return null;
        return sessionUser((await response.json()) as AuthPayload);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        const response = await fetch(`${API_URL}/auth/oauth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: "google",
            email: user.email,
            name: user.name ?? "",
            providerId: account.providerAccountId,
          }),
        });
        if (!response.ok) throw new Error("Could not complete Google sign-in.");
        const data = (await response.json()) as AuthPayload;
        token.role = data.user.role;
        token.accessToken = data.token;
        token.sub = data.user.id;
        return token;
      }
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
