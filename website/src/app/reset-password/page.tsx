"use client";

import { AuthCard, authField, authPrimary } from "@/components/AuthCard";
import { RequiredMark } from "@/components/RequiredMark";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="px-4 py-32 text-center text-sm text-muted">Loading...</p>}>
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
      <AuthCard title="Reset password" text="This link is missing a token.">
        <Link href="/forgot-password" className="text-sm font-semibold text-crimson hover:underline">
          Request a new link
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Choose a new password">
      <form
        className="grid gap-4"
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
        <label className="block text-sm font-medium text-burgundy">
          New password
          <RequiredMark />
          <input name="password" type="password" required minLength={6} autoComplete="new-password" className={authField} />
        </label>
        <label className="block text-sm font-medium text-burgundy">
          Confirm password
          <RequiredMark />
          <input name="confirm" type="password" required minLength={6} autoComplete="new-password" className={authField} />
        </label>
        {error && <p className="text-sm text-crimson">{error}</p>}
        <button type="submit" disabled={pending} className={authPrimary}>
          {pending ? "Please wait..." : "Update password"}
        </button>
      </form>
    </AuthCard>
  );
}
