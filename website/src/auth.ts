import "@/lib/load-root-env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const secure = process.env.NODE_ENV === "production";

function authCookies(prefix: string) {
  const base = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure,
  };
  const readable = { ...base, httpOnly: false };
  const name = (key: string) => `${secure ? "__Secure-" : ""}${prefix}.${key}`;
  return {
    sessionToken: { name: name("session-token"), options: base },
    callbackUrl: { name: name("callback-url"), options: readable },
    csrfToken: { name: name("csrf-token"), options: readable },
    pkceCodeVerifier: { name: name("pkce.code_verifier"), options: base },
    state: { name: name("state"), options: base },
    nonce: { name: name("nonce"), options: base },
  };
}

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

export const googleAuthConfigured = Boolean(
  process.env.AUTH_GOOGLE_ID?.trim() && process.env.AUTH_GOOGLE_SECRET?.trim(),
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  cookies: authCookies("kc-site"),
  providers: [
    ...(googleAuthConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
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
          const payload = (await response.json()) as AuthPayload;
          if (payload.user.role === "admin") return null;
          return sessionUser(payload);
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
        const payload = (await response.json()) as AuthPayload;
        if (payload.user.role === "admin") return null;
        return sessionUser(payload);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return user.role !== "admin";
      }
      if (account?.provider !== "google") return true;
      const idToken = String(account.id_token ?? "").trim();
      if (!idToken) return "/login?error=GoogleFailed";
      try {
        const response = await fetch(`${API_URL}/auth/oauth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        if (!response.ok) return "/login?error=GoogleFailed";
        const data = (await response.json()) as AuthPayload;
        if (data.user.role === "admin") return "/login?error=StaffAccount";
        user.id = data.user.id;
        user.name = data.user.name;
        user.email = data.user.email;
        user.role = data.user.role;
        user.accessToken = data.token;
        return true;
      } catch {
        return "/login?error=GoogleFailed";
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        if (user.id) token.sub = user.id;
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
