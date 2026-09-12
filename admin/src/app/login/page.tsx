"use client";

import { ErrorBanner, LoadingScreen, Spinner } from "@/components/Feedback";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { status, data } = useSession();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && data?.user.role === "admin") router.replace("/");
  }, [status, data?.user.role, router]);

  if (status === "loading" || (status === "authenticated" && data?.user.role === "admin")) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-burgundy-deep px-4 py-16">
      <div className="w-full max-w-md rounded-xl bg-cream p-6 shadow-sm ring-1 ring-white/10 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-burgundy/10">
            <Image
              src="/logo-mark.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-top scale-110"
              sizes="48px"
            />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-burgundy">
              Kin and Compass
            </p>
            <p className="text-sm font-semibold text-crimson">Staff desk</p>
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-semibold text-burgundy">Staff sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Email and password for the admin desk only. This is not the public website.
        </p>
        <form
          className="mt-8 grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setPending(true);
            const form = new FormData(event.currentTarget);
            try {
              const result = await signIn("credentials", {
                email: String(form.get("email")),
                password: String(form.get("password")),
                redirect: false,
              });
              if (result?.error) {
                setError(
                  result.error === "AccessDenied"
                    ? "This account cannot use the staff desk. Use the public website to sign in."
                    : "Email or password is incorrect.",
                );
                return;
              }
              router.push("/");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not sign in. Try again.");
            } finally {
              setPending(false);
            }
          }}
        >
          <label className="block text-sm font-medium text-burgundy">
            Staff email
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 h-12 w-full rounded-lg border border-sand bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-crimson/25"
            />
          </label>
          <label className="block text-sm font-medium text-burgundy">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 h-12 w-full rounded-lg border border-sand bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-crimson/25"
            />
          </label>
          {error && <ErrorBanner title="Sign-in failed" message={error} />}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-burgundy text-sm font-semibold text-white disabled:opacity-60"
          >
            {pending ? (
              <>
                <Spinner className="h-4 w-4 border-white/30 border-t-white" />
                Signing in
              </>
            ) : (
              "Sign in to desk"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
