"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CustomTripContextValue = {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const CustomTripContext = createContext<CustomTripContextValue | null>(null);
const KEY = "kc-custom-trip";

export function CustomTripProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setSlugs(JSON.parse(raw) as string[]);
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
    if (ready) localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs, ready]);

  const value = useMemo<CustomTripContextValue>(
    () => ({
      slugs,
      add: (slug) => setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug])),
      remove: (slug) => setSlugs((prev) => prev.filter((item) => item !== slug)),
      clear: () => setSlugs([]),
      has: (slug) => slugs.includes(slug),
    }),
    [slugs],
  );

  return <CustomTripContext.Provider value={value}>{children}</CustomTripContext.Provider>;
}

export function useCustomTrip() {
  const ctx = useContext(CustomTripContext);
  if (!ctx) throw new Error("useCustomTrip must be used within CustomTripProvider");
  return ctx;
}
