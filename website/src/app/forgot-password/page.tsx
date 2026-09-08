"use client";

import { AuthCard, authField, authPrimary } from "@/components/AuthCard";
import Link from "next/link";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <AuthCard
      title="Reset password"
      text="Enter the email on your account. If it exists, we will send a reset link."
    >
      {sent ? (
        <p className="text-sm text-burgundy">If that email has a password, check your inbox for a reset link.</p>
      ) : (
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setPending(true);
            const email = String(new FormData(event.currentTarget).get("email") ?? "");
            try {
              const response = await fetch(`${API_URL}/auth/forgot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              if (!response.ok) throw new Error("Could not send a reset email.");
              setSent(true);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not send a reset email.");
            } finally {
              setPending(false);
            }
          }}
        >
          <label className="block text-sm font-medium text-burgundy">
            Email
            <input name="email" type="email" required autoComplete="email" className={authField} />
          </label>
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button type="submit" disabled={pending} className={authPrimary}>
            {pending ? "Please wait..." : "Send reset link"}
          </button>
        </form>
      )}
      <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-crimson hover:underline">
        Back to sign in
      </Link>
    </AuthCard>
  );
}
