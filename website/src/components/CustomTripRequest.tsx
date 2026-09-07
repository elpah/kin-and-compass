"use client";

import { InquiryForm } from "@/components/InquiryForm";
import { useCustomTrip } from "@/context/CustomTripContext";
import { brand } from "@/data/site";
import { formatMoney } from "@/lib/utils";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useMemo } from "react";

export function CustomTripRequest({ experiences }: { experiences: CustomExperience[] }) {
  const { slugs } = useCustomTrip();
  const selected = useMemo(
    () => slugs.map((id) => experiences.find((item) => item.tourId === id)).filter(Boolean) as CustomExperience[],
    [slugs, experiences],
  );
  const total = selected.reduce((sum, item) => sum + item.tourPrice, 0);
  const line = selected.map((item) => `${item.tourName} (${item.tourDuration}, ${formatMoney(item.tourPrice)})`).join("; ");

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
        Bookings:{" "}
        <a href={`mailto:${brand.bookingEmail}`} className="font-semibold text-burgundy hover:text-crimson">
          {brand.bookingEmail}
        </a>
      </p>
      <div className="mb-8 rounded-lg bg-white p-5 ring-1 ring-sand">
        <p className="text-sm font-semibold text-burgundy">Attached itinerary</p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {selected.map((item) => (
            <li key={item.tourId}>
              {item.tourName} · Duration: {item.tourDuration} · {formatMoney(item.tourPrice)}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-burgundy">Estimated price {formatMoney(total)}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          After you request, we will send a confirmed schedule.
        </p>
        <Link href="/travel/custom/review" className="mt-3 inline-block text-sm font-semibold text-crimson">
          Edit trip
        </Link>
      </div>
      <InquiryForm
        kind="custom-trip"
        submitLabel="Request my itinerary"
        extraPayload={{
          experiences: line,
          total: String(total),
        }}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "start", label: "Start date", type: "date", required: true },
          { name: "end", label: "End date", type: "date", required: true },
          { name: "guests", label: "Group size", type: "number", required: true },
          { name: "note", label: "Anything else", textarea: true },
        ]}
      />
    </div>
  );
}
