"use client";

import Link from "next/link";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-32">
      <p className="script text-2xl text-crimson">Account</p>
      <h1 className="display text-4xl text-burgundy">Reset password</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the email on your account. If it exists, we will send a reset link.
      </p>
      {sent ? (
        <p className="mt-8 text-sm text-burgundy">
          If that email has a password, check your inbox for a reset link.
        </p>
      ) : (
        <form
          className="mt-8 grid gap-3"
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
          <input name="email" type="email" required placeholder="Email" className="h-12 rounded-lg border border-sand px-4" />
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button type="submit" disabled={pending} className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60">
            {pending ? "Please wait..." : "Send reset link"}
          </button>
        </form>
      )}
      <Link href="/login" className="mt-6 inline-block text-sm text-crimson">
        Back to sign in
      </Link>
    </div>
  );
}
