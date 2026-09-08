"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="px-4 py-32 text-sm text-muted">Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 pb-20 pt-32">
        <h1 className="display text-4xl text-burgundy">Reset password</h1>
        <p className="mt-3 text-sm text-muted">This link is missing a token.</p>
        <Link href="/forgot-password" className="mt-6 inline-block text-sm text-crimson">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-32">
      <h1 className="display text-4xl text-burgundy">Choose a new password</h1>
      <form
        className="mt-8 grid gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          const form = new FormData(event.currentTarget);
          const password = String(form.get("password") ?? "");
          const confirm = String(form.get("confirm") ?? "");
          if (password !== confirm) {
            setError("Passwords do not match.");
            return;
          }
          setPending(true);
          try {
            const response = await fetch(`${API_URL}/auth/reset`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, password }),
            });
            const data = (await response.json()) as { error?: string };
            if (!response.ok) throw new Error(data.error ?? "Could not reset password.");
            router.push("/login");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not reset password.");
          } finally {
            setPending(false);
          }
        }}
      >
        <input name="password" type="password" required minLength={6} placeholder="New password" className="h-12 rounded-lg border border-sand px-4" />
        <input name="confirm" type="password" required minLength={6} placeholder="Confirm password" className="h-12 rounded-lg border border-sand px-4" />
        {error && <p className="text-sm text-crimson">{error}</p>}
        <button type="submit" disabled={pending} className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60">
          {pending ? "Please wait..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
