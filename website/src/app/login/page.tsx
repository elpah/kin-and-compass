"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { login, register, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-32">
      <p className="script text-2xl text-crimson">{mode === "in" ? "Welcome back" : "Create account"}</p>
      <h1 className="display text-4xl text-burgundy">
        {mode === "in" ? "Sign in" : "Join the house"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Use your email and password. Staff sign in on the admin site.
      </p>
      <form
        className="mt-8 grid gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setPending(true);
          const data = new FormData(e.currentTarget);
          try {
            if (mode === "up") {
              await register(
                String(data.get("email")),
                String(data.get("password")),
                String(data.get("name") || ""),
              );
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
          <input name="name" required placeholder="Full name" className="h-12 rounded-lg border border-sand px-4" />
        )}
        <input name="email" type="email" required placeholder="Email" className="h-12 rounded-lg border border-sand px-4" />
        <input name="password" type="password" required minLength={6} placeholder="Password" className="h-12 rounded-lg border border-sand px-4" />
        {error && <p className="text-sm text-crimson">{error}</p>}
        <button type="submit" disabled={pending} className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60">
          {pending ? "Please wait..." : "Continue"}
        </button>
      </form>
      <button
        type="button"
        className="mt-4 text-sm text-crimson"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in" ? "Need an account?" : "Already have one?"}
      </button>
    </div>
  );
}
