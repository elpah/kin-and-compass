"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export type User = {
  name: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
};

export type Inquiry = {
  id: string;
  kind: string;
  createdAt: string;
  payload: Record<string, string>;
};

export type Order = {
  id: string;
  createdAt: string;
  total: number;
  items: { name: string; qty: number; price: number }[];
  status: string;
};

export type Donation = {
  id: string;
  createdAt: string;
  amount: number;
  frequency: "once" | "monthly";
  projectSlug: string;
  projectName: string;
  name: string;
  email: string;
};

export type AccountProfile = {
  name: string;
  email: string;
  phone: string;
  hasPassword: boolean;
  hasGoogle: boolean;
};

type AuthContextValue = {
  user: User | null;
  profile: AccountProfile | null;
  accessToken: string;
  ready: boolean;
  inquiries: Inquiry[];
  orders: Order[];
  donations: Donation[];
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string, code: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  addInquiry: (kind: string, payload: Record<string, string>) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  addDonation: (donation: Omit<Donation, "id" | "createdAt">) => string;
  saveProfile: (input: { name: string; phone: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const INQ_KEY = "kc-inquiries";
const ORD_KEY = "kc-orders";
const DON_KEY = "kc-donations";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const ready = status !== "loading";
  const accessToken = session?.accessToken ?? "";
  const user = session?.user?.email && session.user.role !== "admin"
    ? {
        name: profile?.name || session.user.name || session.user.email.split("@")[0],
        email: profile?.email || session.user.email,
        phone: profile?.phone,
        isAdmin: false,
      }
    : null;

  useEffect(() => {
    if (!ready) return;
    try {
      const i = localStorage.getItem(INQ_KEY);
      const o = localStorage.getItem(ORD_KEY);
      const d = localStorage.getItem(DON_KEY);
      if (i) setInquiries(JSON.parse(i) as Inquiry[]);
      if (o) setOrders(JSON.parse(o) as Order[]);
      if (d) setDonations(JSON.parse(d) as Donation[]);
    } catch {
      /* ignore */
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(INQ_KEY, JSON.stringify(inquiries));
    localStorage.setItem(ORD_KEY, JSON.stringify(orders));
    localStorage.setItem(DON_KEY, JSON.stringify(donations));
  }, [inquiries, orders, donations, ready]);

  useEffect(() => {
    if (!accessToken) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (response) => {
        if (!response.ok) return;
        const data = (await response.json()) as {
          user: { name: string; email: string; phone?: string };
          hasPassword?: boolean;
          hasGoogle?: boolean;
        };
        if (cancelled) return;
        setProfile({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone ?? "",
          hasPassword: Boolean(data.hasPassword),
          hasGoogle: Boolean(data.hasGoogle),
        });
      })
      .catch(() => {
        /* keep session name */
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      accessToken,
      ready,
      inquiries,
      orders,
      donations,
      login: async (identifier, password) => {
        const result = await signIn("credentials", { email: identifier, password, redirect: false });
        if (result?.error) throw new Error("Email, phone, or password is incorrect.");
      },
      register: async (email, password, name, phone) => {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, phone }),
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(data.error ?? "Could not create account.");
        const identifier = email || phone || "";
        const result = await signIn("credentials", { email: identifier, password, redirect: false });
        if (result?.error) throw new Error("Account created, but sign-in failed. Try signing in.");
      },
      loginWithGoogle: async () => {
        const { getProviders } = await import("next-auth/react");
        const providers = await getProviders();
        if (!providers?.google) {
          throw new Error(
            "Google sign-in is not set up yet. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET, and authorize http://localhost:3000/api/auth/callback/google.",
          );
        }
        await signIn("google", { callbackUrl: "/account" });
      },
      loginWithPhone: async (phone, code, name) => {
        const result = await signIn("credentials", { phone, code, name, redirect: false });
        if (result?.error) throw new Error("That code is incorrect or has expired.");
      },
      logout: async () => {
        await signOut({ redirect: false });
      },
      addInquiry: (kind, payload) =>
        setInquiries((prev) => [
          {
            id: `inq-${Date.now()}`,
            kind,
            payload,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]),
      addOrder: (order) => {
        const id = `KC-${Date.now().toString().slice(-8)}`;
        setOrders((prev) => [
          {
            ...order,
            id,
            createdAt: new Date().toISOString(),
            status: "Processing",
          },
          ...prev,
        ]);
        return id;
      },
      addDonation: (donation) => {
        const id = `GV-${Date.now().toString().slice(-8)}`;
        setDonations((prev) => [
          {
            ...donation,
            id,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        return id;
      },
      saveProfile: async ({ name, phone }) => {
        if (!accessToken) throw new Error("Sign in required");
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name, phone }),
        });
        const data = (await response.json()) as {
          error?: string;
          user?: { name: string; email: string; phone?: string };
          hasPassword?: boolean;
          hasGoogle?: boolean;
        };
        if (!response.ok) throw new Error(data.error ?? "Could not save your profile.");
        if (data.user) {
          setProfile({
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone ?? "",
            hasPassword: Boolean(data.hasPassword),
            hasGoogle: Boolean(data.hasGoogle),
          });
        }
      },
      changePassword: async (currentPassword, newPassword) => {
        if (!accessToken) throw new Error("Sign in required");
        const response = await fetch(`${API_URL}/auth/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(data.error ?? "Could not update password.");
        setProfile((prev) => (prev ? { ...prev, hasPassword: true } : prev));
      },
    }),
    [user, profile, accessToken, ready, inquiries, orders, donations],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
