"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  name: string;
  email: string;
  isAdmin?: boolean;
};

type Inquiry = {
  id: string;
  kind: string;
  createdAt: string;
  payload: Record<string, string>;
};

type Order = {
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

type AuthContextValue = {
  user: User | null;
  inquiries: Inquiry[];
  orders: Order[];
  donations: Donation[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  addInquiry: (kind: string, payload: Record<string, string>) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  addDonation: (donation: Omit<Donation, "id" | "createdAt">) => string;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const USER_KEY = "kc-user";
const INQ_KEY = "kc-inquiries";
const ORD_KEY = "kc-orders";
const DON_KEY = "kc-donations";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const u = localStorage.getItem(USER_KEY);
        const i = localStorage.getItem(INQ_KEY);
        const o = localStorage.getItem(ORD_KEY);
        const d = localStorage.getItem(DON_KEY);
        if (u) setUser(JSON.parse(u) as User);
        if (i) setInquiries(JSON.parse(i) as Inquiry[]);
        if (o) setOrders(JSON.parse(o) as Order[]);
        if (d) setDonations(JSON.parse(d) as Donation[]);
      } catch {
        /* ignore */
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
    localStorage.setItem(INQ_KEY, JSON.stringify(inquiries));
    localStorage.setItem(ORD_KEY, JSON.stringify(orders));
    localStorage.setItem(DON_KEY, JSON.stringify(donations));
  }, [user, inquiries, orders, donations, ready]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      inquiries,
      orders,
      donations,
      login: (email, name) => {
        setUser({
          name: name || email.split("@")[0],
          email,
          isAdmin:
            email.endsWith("@kinandcompass.com") ||
            email.endsWith("@kinandcompasstravels.com") ||
            email.endsWith("@kingandcompasstravels.com"),
        });
      },
      logout: () => setUser(null),
      addInquiry: (kind, payload) =>
        setInquiries((prev) => [
          {
            id: `inq-${Date.now()}`,
            kind,
            createdAt: new Date().toISOString(),
            payload,
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
    }),
    [user, inquiries, orders, donations],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
