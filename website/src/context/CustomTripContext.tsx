"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CustomTripContextValue = {
  slugs: string[];
  ready: boolean;
  add: (slug: string) => void;
  addMany: (ids: string[]) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const CustomTripContext = createContext<CustomTripContextValue | null>(null);
const KEY = "kc-custom-trip";

function readTrip(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeTrip(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* ignore */
  }
}

export function CustomTripProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readTrip();
    setSlugs((current) => (current.length > 0 ? current : stored));
    setReady(true);
  }, []);

  const add = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = prev.includes(slug) ? prev : [...prev, slug];
      writeTrip(next);
      return next;
    });
  }, []);

  const addMany = useCallback((ids: string[]) => {
    setSlugs((prev) => {
      const next = [...prev];
      for (const id of ids) {
        if (!next.includes(id)) next.push(id);
      }
      writeTrip(next);
      return next;
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = prev.filter((item) => item !== slug);
      writeTrip(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSlugs([]);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CustomTripContextValue>(
    () => ({
      slugs,
      ready,
      add,
      addMany,
      remove,
      clear,
      has: (slug) => slugs.includes(slug),
    }),
    [add, addMany, clear, ready, remove, slugs],
  );

  return <CustomTripContext.Provider value={value}>{children}</CustomTripContext.Provider>;
}

export function useCustomTrip() {
  const ctx = useContext(CustomTripContext);
  if (!ctx) throw new Error("useCustomTrip must be used within CustomTripProvider");
  return ctx;
}
