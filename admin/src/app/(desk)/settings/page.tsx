"use client";

import { changePassword } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data } = useSession();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <p className="script text-2xl text-crimson">The house</p>
      <h1 className="display text-4xl text-burgundy">Settings</h1>
      <p className="mt-2 text-sm text-muted">
        House details are layout only. Password changes are saved.
      </p>

      <form className="mt-8 space-y-8" onSubmit={(event) => event.preventDefault()}>
        <section className="rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
          <h2 className="display text-2xl text-burgundy">House</h2>
          <div className="mt-5 grid gap-4">
            <Field label="House name" defaultValue="Kin and Compass" />
            <Field label="Tagline" defaultValue="Travel And Tour" />
            <Field label="Address" defaultValue="Oregon, USA" />
            <Field label="Email" type="email" defaultValue="info@kinandcompasstravels.com" />
            <Field label="Booking email" type="email" defaultValue="booking@kinandcompasstravels.com" />
            <Field label="Phone" defaultValue="+233 20 555 0100" />
          </div>
        </section>
      </form>

      <form
        className="mt-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const formEl = event.currentTarget;
          setError("");
          setSaved(false);
          const form = new FormData(formEl);
          const next = String(form.get("newPassword") ?? "");
          const confirm = String(form.get("confirmPassword") ?? "");
          if (next !== confirm) {
            setError("New password and confirmation do not match.");
            return;
          }
          setPending(true);
          try {
            await changePassword(String(form.get("currentPassword") ?? ""), next);
            formEl.reset();
            setSaved(true);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update password.");
          } finally {
            setPending(false);
          }
        }}
      >
        <section className="rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
          <h2 className="display text-2xl text-burgundy">Sign-in</h2>
          <p className="mt-2 text-sm text-muted">{data?.user.email}</p>
          <div className="mt-5 grid gap-4">
            <Field label="Current password" name="currentPassword" type="password" required />
            <Field label="New password" name="newPassword" type="password" required minLength={6} />
            <Field label="Confirm new password" name="confirmPassword" type="password" required minLength={6} />
          </div>
          {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
          {saved && <p className="mt-4 text-sm text-burgundy">Password updated.</p>}
          <button
            type="submit"
            disabled={pending}
            className="mt-6 h-12 rounded-lg bg-burgundy px-6 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Saving..." : "Update password"}
          </button>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
  name,
  required,
  minLength,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-burgundy">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
        className="mt-1 h-12 w-full rounded-lg border border-sand bg-cream px-3 outline-none focus:ring-2 focus:ring-crimson/30"
      />
    </label>
  );
}
