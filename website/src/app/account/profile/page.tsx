"use client";

import { RequiredMark } from "@/components/RequiredMark";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function AccountProfilePage() {
  const { user, profile, saveProfile } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setName(profile?.name || user?.name || "");
    setPhone(profile?.phone || user?.phone || "");
  }, [profile, user]);

  if (!user) return null;

  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">Profile</p>
      <h2 className="display mt-1 text-3xl text-burgundy">Your details</h2>
      <p className="mt-2 text-sm text-muted">
        This is how Kin and Compass addresses you on bookings and replies.
      </p>

      <form
        className="mt-8 space-y-4 rounded-lg bg-white p-6 ring-1 ring-sand"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setSaved(false);
          setPending(true);
          try {
            await saveProfile({ name, phone });
            setSaved(true);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not save your profile.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            Full name
            <RequiredMark />
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="name"
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3 outline-none focus:ring-2 focus:ring-crimson/25"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Email</span>
          <input
            value={user.email}
            disabled
            className="mt-1 h-12 w-full rounded-lg border border-sand bg-blush/50 px-3 text-muted"
          />
          <span className="mt-1 block text-xs text-muted">Email is tied to sign-in and cannot be changed here.</span>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            placeholder="+233..."
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3 outline-none focus:ring-2 focus:ring-crimson/25"
          />
        </label>
        {error && <p className="text-sm text-crimson">{error}</p>}
        {saved && <p className="text-sm text-burgundy">Profile saved.</p>}
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-lg bg-burgundy px-6 text-sm font-semibold text-white hover:bg-burgundy-deep disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
}
