"use client";

import Link from "next/link";

export function FormActions({
  cancelHref,
  primaryLabel,
  pending = false,
  primaryType = "submit",
  onPrimary,
  secondaryLabel,
  onSecondary,
}: {
  cancelHref: string;
  primaryLabel: string;
  pending?: boolean;
  primaryType?: "submit" | "button";
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  const hasSecondary = Boolean(secondaryLabel && onSecondary);
  const btn =
    "inline-flex h-12 items-center justify-center rounded-lg text-sm font-semibold disabled:opacity-60";

  return (
    <div className="flex w-full flex-wrap justify-between gap-y-3">
      <Link href={cancelHref} className={`${btn} w-[49%] text-burgundy ring-1 ring-sand`}>
        Cancel
      </Link>
      {hasSecondary ? (
        <button
          type="button"
          disabled={pending}
          onClick={onSecondary}
          className={`${btn} w-[49%] text-burgundy ring-1 ring-sand`}
        >
          {secondaryLabel}
        </button>
      ) : null}
      <button
        type={primaryType}
        disabled={pending}
        onClick={onPrimary}
        className={`${btn} ${hasSecondary ? "w-full" : "w-[49%]"} bg-burgundy text-white`}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
