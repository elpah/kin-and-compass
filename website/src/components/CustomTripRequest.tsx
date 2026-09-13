"use client";

import { InquiryForm } from "@/components/InquiryForm";
import { useCustomTrip } from "@/context/CustomTripContext";
import { brand } from "@/data/site";
import { formatMoney } from "@/lib/utils";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useMemo, useState } from "react";

export function CustomTripRequest({
  experiences,
}: {
  experiences: CustomExperience[];
}) {
  const { slugs, clear } = useCustomTrip();
  const [sent, setSent] = useState(false);
  const selected = useMemo(
    () =>
      slugs
        .map((id) => experiences.find((item) => item.tourId === id))
        .filter(Boolean) as CustomExperience[],
    [slugs, experiences],
  );
  const total = selected.reduce((sum, item) => sum + item.tourPrice, 0);
  const line = selected
    .map((item) =>
      item.tourPrice > 0
        ? `${item.tourName} (${item.tourDuration}, ${formatMoney(item.tourPrice)})`
        : `${item.tourName} (${item.tourDuration})`,
    )
    .join("\n");

  if (sent) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-lg bg-blush px-6 py-8 text-center ring-1 ring-sand">
          <p className="script text-2xl text-crimson">Received</p>
          <p className="mt-2 text-sm text-muted">
            Thank you. We sent a confirmation to your email and will write back shortly.
          </p>
        </div>
      </div>
    );
  }

  if (selected.length === 0) {
    return (
      <p className="text-muted">
        Add experiences first.{" "}
        <Link href="/travel/custom" className="font-semibold text-crimson">
          Build your trip
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-6 text-sm text-muted">
        Booking request:{" "}
        <a
          href={`mailto:${brand.bookingEmail}`}
          className="font-semibold text-burgundy hover:text-crimson"
        >
          {brand.bookingEmail}
        </a>
      </p>
      <div className="mb-8 rounded-lg bg-white p-5 ring-1 ring-sand">
        <p className="text-sm font-semibold text-burgundy">
          Attached itinerary
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {selected.map((item) => (
            <li key={item.tourId}>
              {item.tourName} · Duration: {item.tourDuration}
              {item.tourPrice > 0 ? ` · ${formatMoney(item.tourPrice)}` : ""}
            </li>
          ))}
        </ul>
        {total > 0 ? (
          <p className="mt-3 font-semibold text-burgundy">Estimated price {formatMoney(total)}</p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-muted">
          After you request, we will send a proposed itinerary.
        </p>
        <Link
          href="/travel/custom/review"
          className="mt-3 inline-block text-sm font-semibold text-crimson"
        >
          Edit trip
        </Link>
      </div>
      <InquiryForm
        kind="custom-trip"
        submitLabel="Request my itinerary"
        onSuccess={() => {
          setSent(true);
          clear();
        }}
        extraPayload={{
          experiences: line,
          total: String(total),
        }}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "start", label: "Start date", type: "date", required: true },
          { name: "end", label: "End date", type: "date", required: true },
          {
            name: "guests",
            label: "Group size",
            type: "number",
            required: true,
          },
          {
            name: "include",
            label: "Include",
            checkboxes: [
              { value: "Hotel", label: "Hotel" },
              { value: "Flight", label: "Flight" },
              { value: "Transport", label: "Transport" },
              { value: "Food", label: "Food" },
              { value: "Photographer", label: "Photographer" },
            ],
          },
          { name: "note", label: "Anything else", textarea: true },
        ]}
      />
    </div>
  );
}
