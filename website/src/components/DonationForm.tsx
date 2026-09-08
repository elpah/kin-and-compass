"use client";

import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const presets = [25, 50, 100, 250];

export function DonationForm({
  projectSlug = "general",
  projectName = "General Ghana fund",
}: {
  projectSlug?: string;
  projectName?: string;
}) {
  const { addDonation, user } = useAuth();
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [gift, setGift] = useState<{ amount: number; frequency: "once" | "monthly" } | null>(
    null,
  );

  const chosen = custom ? Number(custom) : amount;

  if (receipt && gift) {
    return (
      <div className="rounded-lg bg-blush px-6 py-8 text-center ring-1 ring-sand">
        <p className="script text-2xl text-crimson">Thank you</p>
        <p className="mt-2 text-sm text-muted">
          {formatMoney(gift.amount)} {gift.frequency === "monthly" ? "monthly" : "one-time"} toward{" "}
          {projectName}.
        </p>
        <p className="mt-3 font-semibold text-burgundy">Receipt {receipt}</p>
        <p className="mt-2 text-xs text-muted">
          A record is stored in your browser. Sign in to keep it on your account.
        </p>
        <Link
          href={user ? "/account" : "/login"}
          className="mt-5 inline-flex h-11 items-center rounded bg-burgundy px-5 text-sm font-semibold text-white"
        >
          View donation history
        </Link>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const value = Number(custom || amount);
        if (!Number.isFinite(value) || value < 1) return;
        const id = addDonation({
          amount: value,
          frequency,
          projectSlug,
          projectName,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
        });
        setGift({ amount: value, frequency });
        setReceipt(id);
      }}
    >
      <div className="flex rounded-lg bg-sand p-1">
        {(
          [
            ["once", "One-time"],
            ["monthly", "Monthly"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFrequency(key)}
            className={`flex-1 rounded py-2 text-sm font-semibold ${
              frequency === key ? "bg-burgundy text-white" : "text-burgundy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {presets.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setAmount(n);
              setCustom("");
            }}
            className={`rounded py-2.5 text-sm font-semibold ring-1 ${
              !custom && amount === n
                ? "bg-burgundy text-white ring-burgundy"
                : "bg-white text-burgundy ring-sand"
            }`}
          >
            {formatMoney(n)}
          </button>
        ))}
      </div>

      <label className="block text-sm">
        <span className="font-medium text-burgundy">Custom amount (USD)</span>
        <input
          type="number"
          min={1}
          step={1}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Other amount"
          className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-burgundy">Name</span>
        <input
          name="name"
          required
          defaultValue={user?.name}
          className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Email</span>
        <input
          name="email"
          type="email"
          required
          defaultValue={user?.email}
          className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
        />
      </label>

      <p className="text-xs text-muted">
        Card processing is being enabled. This records your intent and a receipt number so the
        Oregon desk can confirm the gift.
      </p>

      <button
        type="submit"
        className="mt-1 h-12 rounded bg-crimson text-sm font-semibold text-white hover:bg-rose"
      >
        Give {Number.isFinite(chosen) && chosen > 0 ? formatMoney(chosen) : ""}{" "}
        {frequency === "monthly" ? "monthly" : "now"}
      </button>
    </form>
  );
}
