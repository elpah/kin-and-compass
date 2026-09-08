"use client";

import { me } from "@/lib/api";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || data?.user.role !== "admin") {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/")}`);
      return;
    }
    let cancelled = false;
    me()
      .then(() => {
        if (!cancelled) setAllowed(true);
      })
      .catch(async (err) => {
        setError(err instanceof Error ? err.message : "This account cannot use admin.");
        await signOut({ redirect: false });
        router.replace("/login");
      });
    return () => {
      cancelled = true;
    };
  }, [status, data?.user.role, router, pathname]);

  if (error) {
    return <p className="px-6 py-16 text-sm text-crimson">{error}</p>;
  }

  if (status === "loading" || !allowed) {
    return <p className="px-6 py-16 text-sm text-muted">Checking sign-in...</p>;
  }

  return children;
}
