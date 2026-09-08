"use client";

import { ErrorBanner, Spinner } from "@/components/Feedback";
import { me } from "@/lib/api";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState("");

  const verify = useCallback(() => {
    setError("");
    return me()
      .then(() => setAllowed(true))
      .catch(async (err) => {
        const message = err instanceof Error ? err.message : "This account cannot use admin.";
        if (/sign in/i.test(message)) {
          await signOut({ redirect: false });
          router.replace("/login");
          return;
        }
        setAllowed(false);
        setError(message);
      });
  }, [router]);

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || data?.user.role !== "admin") {
      router.replace("/login");
      return;
    }
    let cancelled = false;
    void me()
      .then(() => {
        if (!cancelled) setAllowed(true);
      })
      .catch(async (err) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "This account cannot use admin.";
        if (/sign in/i.test(message)) {
          await signOut({ redirect: false });
          router.replace("/login");
          return;
        }
        setAllowed(false);
        setError(message);
      });
    return () => {
      cancelled = true;
    };
  }, [status, data?.user.role, router]);

  if (error) {
    return (
      <div className="max-w-md">
        <ErrorBanner title="Could not open admin" message={error} onRetry={() => void verify()} />
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-burgundy"
          onClick={() => void signOut({ callbackUrl: "/login" })}
        >
          Sign out
        </button>
      </div>
    );
  }

  if (status === "loading" || !allowed) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="h-10 w-10" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return children;
}
