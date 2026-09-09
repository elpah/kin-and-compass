"use client";

import { RequiredMark } from "@/components/RequiredMark";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function AccountSettingsPage() {
  const { profile, changePassword, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">Settings</p>
        <h2 className="display mt-1 text-3xl text-burgundy">Sign-in and security</h2>
        <p className="mt-2 text-sm text-muted">Update your password and manage this session.</p>
      </div>

      <section className="rounded-lg bg-white p-6 ring-1 ring-sand">
        <h3 className="font-semibold text-burgundy">How you sign in</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {profile?.hasGoogle && <li>Google is connected to this account.</li>}
          {profile?.hasPassword && <li>Email and password are enabled.</li>}
          {!profile?.hasPassword && !profile?.hasGoogle && (
            <li>Phone or email sign-in is enabled for this account.</li>
          )}
        </ul>
      </section>

      {profile?.hasPassword ? (
        <form
          className="space-y-4 rounded-lg bg-white p-6 ring-1 ring-sand"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setSaved(false);
            if (newPassword !== confirm) {
              setError("New passwords do not match.");
              return;
            }
            setPending(true);
            try {
              await changePassword(currentPassword, newPassword);
              setSaved(true);
              setCurrentPassword("");
              setNewPassword("");
              setConfirm("");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not update password.");
            } finally {
              setPending(false);
            }
          }}
        >
          <h3 className="font-semibold text-burgundy">Change password</h3>
          <label className="block text-sm">
            <span className="font-medium text-burgundy">
              Current password
              <RequiredMark />
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="mt-1 h-12 w-full rounded-lg border border-sand px-3 outline-none focus:ring-2 focus:ring-crimson/25"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-burgundy">
              New password
              <RequiredMark />
            </span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="mt-1 h-12 w-full rounded-lg border border-sand px-3 outline-none focus:ring-2 focus:ring-crimson/25"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-burgundy">
              Confirm new password
              <RequiredMark />
            </span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="mt-1 h-12 w-full rounded-lg border border-sand px-3 outline-none focus:ring-2 focus:ring-crimson/25"
            />
          </label>
          {error && <p className="text-sm text-crimson">{error}</p>}
          {saved && <p className="text-sm text-burgundy">Password updated.</p>}
          <button
            type="submit"
            disabled={pending}
            className="h-12 rounded-lg bg-burgundy px-6 text-sm font-semibold text-white hover:bg-burgundy-deep disabled:opacity-60"
          >
            {pending ? "Saving..." : "Update password"}
          </button>
        </form>
      ) : (
        <div className="rounded-lg bg-white p-6 text-sm text-muted ring-1 ring-sand">
          This account signs in with Google or phone, so there is no password to change here.
        </div>
      )}

      <section className="rounded-lg bg-white p-6 ring-1 ring-sand">
        <h3 className="font-semibold text-burgundy">Session</h3>
        <p className="mt-2 text-sm text-muted">Sign out on this device. You can sign back in anytime.</p>
        <button
          type="button"
          onClick={() => void logout()}
          className="mt-4 h-11 rounded-lg px-5 text-sm font-semibold text-crimson ring-1 ring-sand hover:bg-blush"
        >
          Sign out
        </button>
      </section>
    </div>
  );
}
