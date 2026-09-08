"use client";

import { ErrorBanner, LoadingScreen } from "@/components/Feedback";
import { me } from "@/lib/api";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState("");

  const verify = useCallback(() => {
    setError("");
    setAllowed(false);
    return me()
      .then(() => setAllowed(true))
      .catch(async (err) => {
        const message = err instanceof Error ? err.message : "This account cannot use admin.";
        if (/sign in/i.test(message)) {
          await signOut({ redirect: false });
          router.replace(`/login?next=${encodeURIComponent(pathname || "/")}`);
          return;
        }
        setError(message);
      });
  }, [pathname, router]);

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || data?.user.role !== "admin") {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/")}`);
      return;
    }
    let cancelled = false;
    verify().then(() => {
      if (cancelled) setAllowed(false);
    });
    return () => {
      cancelled = true;
    };
  }, [status, data?.user.role, router, pathname, verify]);

  if (error) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <div className="w-full max-w-md">
          <ErrorBanner title="Could not open admin" message={error} onRetry={() => void verify()} />
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-burgundy"
            onClick={() => void signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  if (status === "loading" || !allowed) {
    return <LoadingScreen />;
  }

  return children;
}
