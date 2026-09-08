"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function LoginPage() {
  const { login, register, loginWithGoogle, loginWithPhone, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [method, setMethod] = useState<"password" | "phone">("password");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-32">
      <p className="script text-2xl text-crimson">{mode === "in" ? "Welcome back" : "Create account"}</p>
      <h1 className="display text-4xl text-burgundy">
        {mode === "in" ? "Sign in" : "Join the house"}
      </h1>
      <p className="mt-2 text-sm text-muted">Google, email, or phone. Staff use the admin site.</p>

      <button
        type="button"
        className="mt-8 flex h-12 w-full items-center justify-center rounded-lg border border-sand bg-white text-sm font-semibold text-burgundy"
        onClick={() => void loginWithGoogle()}
      >
        Continue with Google
      </button>

      <div className="mt-6 flex gap-2">
        <Tab active={method === "password"} onClick={() => setMethod("password")}>
          Email / password
        </Tab>
        <Tab active={method === "phone"} onClick={() => setMethod("phone")}>
          Phone
        </Tab>
      </div>

      {method === "password" ? (
        <form
          className="mt-4 grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setPending(true);
            const data = new FormData(e.currentTarget);
            try {
              if (mode === "up") {
                await register(
                  String(data.get("email") || ""),
                  String(data.get("password")),
                  String(data.get("name") || ""),
                  String(data.get("phone") || ""),
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
          <input
            name="email"
            type={mode === "up" ? "email" : "text"}
            required
            placeholder={mode === "up" ? "Email" : "Email or phone"}
            className="h-12 rounded-lg border border-sand px-4"
          />
          {mode === "up" && (
            <input name="phone" type="tel" placeholder="Phone (optional)" className="h-12 rounded-lg border border-sand px-4" />
          )}
          <input name="password" type="password" required minLength={6} placeholder="Password" className="h-12 rounded-lg border border-sand px-4" />
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button type="submit" disabled={pending} className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60">
            {pending ? "Please wait..." : "Continue"}
          </button>
        </form>
      ) : (
        <form
          className="mt-4 grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setPending(true);
            const data = new FormData(e.currentTarget);
            const phone = String(data.get("phone"));
            try {
              if (!codeSent) {
                const response = await fetch(`${API_URL}/auth/phone/start`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phone }),
                });
                const body = (await response.json()) as { error?: string };
                if (!response.ok) throw new Error(body.error ?? "Could not send a code.");
                setCodeSent(true);
              } else {
                await loginWithPhone(phone, String(data.get("code")), String(data.get("name") || ""));
                router.push("/account");
              }
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not sign in");
            } finally {
              setPending(false);
            }
          }}
        >
          {mode === "up" && (
            <input name="name" placeholder="Full name" className="h-12 rounded-lg border border-sand px-4" />
          )}
          <input name="phone" type="tel" required placeholder="Phone with country code" className="h-12 rounded-lg border border-sand px-4" />
          {codeSent && (
            <input name="code" required minLength={6} maxLength={6} placeholder="6-digit code" className="h-12 rounded-lg border border-sand px-4" />
          )}
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button type="submit" disabled={pending} className="h-12 rounded bg-burgundy font-semibold text-white disabled:opacity-60">
            {pending ? "Please wait..." : codeSent ? "Verify code" : "Send code"}
          </button>
        </form>
      )}

      {mode === "in" && method === "password" && (
        <Link href="/forgot-password" className="mt-4 block text-sm text-crimson">
          Forgot password?
        </Link>
      )}
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

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 flex-1 rounded-lg text-sm font-semibold ${
        active ? "bg-burgundy text-white" : "bg-white text-burgundy ring-1 ring-sand"
      }`}
    >
      {children}
    </button>
  );
}
