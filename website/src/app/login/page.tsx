"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");

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
        Customer accounts live in this browser. Staff use the admin sign-in.
      </p>
      <form
        className="mt-8 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          login(String(data.get("email")), String(data.get("name") || ""));
          router.push("/account");
        }}
      >
        {mode === "up" && (
          <input name="name" required placeholder="Full name" className="h-12 rounded-lg border border-sand px-4" />
        )}
        <input name="email" type="email" required placeholder="Email" className="h-12 rounded-lg border border-sand px-4" />
        <input name="password" type="password" required placeholder="Password" className="h-12 rounded-lg border border-sand px-4" />
        <button type="submit" className="h-12 rounded bg-burgundy font-semibold text-white">
          Continue
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
