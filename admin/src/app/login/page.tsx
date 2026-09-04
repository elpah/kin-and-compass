"use client";

import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-20">
      <p className="script text-2xl text-crimson">House tools</p>
      <h1 className="display text-4xl text-burgundy">Admin sign in</h1>
      <form
        className="mt-8 grid gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setPending(true);
          const form = new FormData(event.currentTarget);
          try {
            await login(String(form.get("email")), String(form.get("password")));
            router.push("/");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not sign in");
          } finally {
            setPending(false);
          }
        }}
      >
        <input name="email" type="email" required placeholder="Email" className="h-12 rounded-xl border border-sand px-4" />
        <input name="password" type="password" required placeholder="Password" className="h-12 rounded-xl border border-sand px-4" />
        {error && <p className="text-sm text-crimson">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
