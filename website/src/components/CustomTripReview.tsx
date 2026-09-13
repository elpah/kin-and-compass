"use client";

import { InquiryForm } from "@/components/InquiryForm";
import { useCustomTrip } from "@/context/CustomTripContext";
import { formatMoney } from "@/lib/utils";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useMemo } from "react";

export function CustomTripReview({ experiences }: { experiences: CustomExperience[] }) {
  const { slugs, remove } = useCustomTrip();
  const selected = useMemo(
    () => slugs.map((id) => experiences.find((item) => item.tourId === id)).filter(Boolean) as CustomExperience[],
    [slugs, experiences],
  );
  const total = selected.reduce((sum, item) => sum + item.tourPrice, 0);

  if (selected.length === 0) {
    return (
      <p className="mt-8 text-muted">
        Nothing in this trip yet.{" "}
        <Link href="/travel/custom" className="font-semibold text-crimson">
          Add experiences
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="mt-10">
      <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {selected.map((item) => (
              <tr key={item.tourId} className="border-t border-sand">
                <td className="px-4 py-3">
                  <p className="font-semibold text-burgundy">{item.tourName}</p>
                  <p className="mt-1 text-muted">Duration: {item.tourDuration}</p>
                </td>
                <td className="px-4 py-3">{item.tourPrice > 0 ? formatMoney(item.tourPrice) : ""}</td>
                <td className="px-4 py-3">
                  <button type="button" className="font-semibold text-crimson" onClick={() => remove(item.tourId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > 0 ? (
        <p className="mt-6 display text-3xl text-burgundy">Estimated price: {formatMoney(total)}</p>
      ) : null}
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        After you request, we will send a you a proposed itinerary.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/travel/custom"
          className="inline-flex h-12 items-center rounded-lg px-6 text-sm font-semibold text-burgundy ring-1 ring-sand"
        >
          Add more experiences
        </Link>
        <Link
          href="/travel/custom/request"
          className="inline-flex h-12 items-center rounded-lg bg-crimson px-6 text-sm font-semibold text-white"
        >
          Continue to request
        </Link>
      </div>
    </div>
  );
}
