"use client";

import { login } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-burgundy/10">
            <Image src="/logo.jpeg" alt="" fill className="object-cover object-top scale-110" sizes="48px" />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-burgundy">
              Kin and Compass
            </p>
            <p className="script text-lg leading-none text-crimson">Admin</p>
          </div>
        </div>
        <h1 className="display mt-8 text-4xl text-burgundy">Sign in</h1>
        <p className="mt-2 text-sm text-muted">House tools for the store and Visit Ghana.</p>
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
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="h-12 rounded-lg bg-burgundy font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
