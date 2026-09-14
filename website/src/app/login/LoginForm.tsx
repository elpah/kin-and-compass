"use client";

import { AuthCard, authField, authPrimary } from "@/components/AuthCard";
import { RequiredMark } from "@/components/RequiredMark";
import { GoogleIcon } from "@/components/GoogleIcon";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const googleErrors: Record<string, string> = {
  GoogleNoEmail: "Google did not share an email for this account.",
  GoogleFailed: "Could not finish Google sign-in. Try again.",
  StaffAccount: "Staff must use the admin desk.",
  OAuthCallback: "Google sign-in was cancelled or failed.",
  OAuthSignin: "Could not start Google sign-in.",
  Configuration: "Google sign-in is not configured yet.",
  Callback: "Could not complete Google sign-in.",
  AccessDenied: "Google sign-in was denied.",
};

export function LoginForm({ googleReady }: { googleReady: boolean }) {
  const { login, register, loginWithGoogle, user, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace("/account");
  }, [ready, user, router]);

  useEffect(() => {
    const code = params.get("error");
    if (code) setError(googleErrors[code] ?? "Could not sign in with Google.");
  }, [params]);

  return (
    <AuthCard
      title={mode === "in" ? "Sign in" : "Create account"}
      text={
        mode === "in"
          ? "Customer account. Staff use the admin desk."
          : "Create a customer account to save trips and orders."
      }
    >
      <button
        type="button"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-sand bg-white text-sm font-semibold text-ink hover:bg-cream disabled:opacity-60"
        onClick={async () => {
          setError("");
          if (!googleReady) {
            setError(
              "Google sign-in is not set up yet. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET, and authorize http://localhost:3000/api/auth/callback/google.",
            );
            return;
          }
          setPending(true);
          try {
            await loginWithGoogle();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not start Google sign-in.");
            setPending(false);
          }
        }}
      >
        <GoogleIcon />
        {mode === "in" ? "Sign in with Google" : "Sign up with Google"}
      </button>
      {error && <p className="mt-3 text-sm text-crimson">{error}</p>}

      <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
        <span className="h-px flex-1 bg-sand" />
        or
        <span className="h-px flex-1 bg-sand" />
      </div>

      <form
        className="grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setPending(true);
          const data = new FormData(e.currentTarget);
          try {
            if (mode === "up") {
              await register(String(data.get("email") || ""), String(data.get("password")), String(data.get("name") || ""));
            } else {
              await login(String(data.get("email")), String(data.get("password")));
            }
            router.push("/account");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not sign in");
          } finally {
            setPending(false);
          }
        }}
      >
        {mode === "up" && (
          <label className="block text-sm font-medium text-burgundy">
            Full name
            <RequiredMark />
            <input name="name" required autoComplete="name" className={authField} />
          </label>
        )}
        <label className="block text-sm font-medium text-burgundy">
          Email
          <RequiredMark />
          <input name="email" type="email" required autoComplete="email" className={authField} />
        </label>
        <label className="block text-sm font-medium text-burgundy">
          Password
          <RequiredMark />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            className={authField}
          />
        </label>
        {mode === "in" && (
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm font-semibold text-crimson hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
        <button type="submit" disabled={pending} className={authPrimary}>
          {pending ? "Please wait..." : mode === "in" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {mode === "in" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-semibold text-crimson hover:underline"
          onClick={() => {
            setMode(mode === "in" ? "up" : "in");
            setError("");
          }}
        >
          {mode === "in" ? "Create one" : "Sign in"}
        </button>
      </p>
    </AuthCard>
  );
}
