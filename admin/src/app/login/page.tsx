"use client";

import { ErrorBanner, LoadingScreen, Spinner } from "@/components/Feedback";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { status, data } = useSession();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const next = params.get("next") || "/";

  useEffect(() => {
    if (status === "authenticated" && data?.user.role === "admin") router.replace(next);
  }, [status, data?.user.role, router, next]);

  if (status === "loading" || (status === "authenticated" && data?.user.role === "admin")) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-burgundy/10">
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-cover object-top scale-110"
              sizes="48px"
            />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-burgundy">
              Kin and Compass
            </p>
            <p className="script text-lg leading-none text-crimson">Admin</p>
          </div>
        </div>
        <h1 className="display mt-8 text-4xl text-burgundy">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Staff email and password only.</p>
        <form
          className="mt-8 grid gap-3"
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
                    ? "This account cannot use admin."
                    : "Email or password is incorrect.",
                );
                return;
              }
              router.push(next);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not sign in. Try again.");
            } finally {
              setPending(false);
            }
          }}
        >
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="h-12 rounded-lg border border-sand bg-white px-4 outline-none focus:ring-2 focus:ring-crimson/30"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="h-12 rounded-lg border border-sand bg-white px-4 outline-none focus:ring-2 focus:ring-crimson/30"
          />
          {error && <ErrorBanner title="Sign-in failed" message={error} />}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-burgundy font-semibold text-white disabled:opacity-60"
          >
            {pending ? (
              <>
                <Spinner className="h-4 w-4 border-white/30 border-t-white" />
                Signing in
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
