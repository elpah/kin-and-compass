"use client";

import { useCustomTrip } from "@/context/CustomTripContext";
import { MediaImage } from "@/components/CloudinaryImage";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import type { CustomExperience, SpecialTour } from "@kincompass/shared";
import { mergeTripCatalog } from "@/lib/trip";
import Link from "next/link";
import { useLayoutEffect, useMemo, useState } from "react";

export function CustomTripBuilder({
  experiences,
  specialTours,
  addTourIds = [],
}: {
  experiences: CustomExperience[];
  specialTours: SpecialTour[];
  addTourIds?: string[];
}) {
  const { slugs, add, addMany, remove } = useCustomTrip();
  const catalog = useMemo(() => mergeTripCatalog(experiences, specialTours), [experiences, specialTours]);
  const seedKey = addTourIds.join(",");
  const [skipped, setSkipped] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (!seedKey) return;
    addMany(addTourIds);
  }, [addMany, addTourIds, seedKey]);

  const selectedIds = useMemo(() => {
    const ids = new Set(slugs);
    for (const id of addTourIds) {
      if (!skipped.includes(id)) ids.add(id);
    }
    for (const id of skipped) ids.delete(id);
    return ids;
  }, [addTourIds, skipped, slugs]);

  const selected = catalog.filter((item) => selectedIds.has(item.tourId));
  const total = selected.reduce((sum, item) => sum + item.tourPrice, 0);

  return (
    <>
      {catalog.length === 0 ? (
        <p className="mt-8 text-muted">
          No custom tours are published yet. Check back soon, or write us at bookings.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {catalog.map((item) => {
              const inTrip = selectedIds.has(item.tourId);
              return (
                <article
                  key={item.tourId}
                  className="overflow-hidden rounded-lg bg-white ring-1 ring-sand md:grid md:grid-cols-5"
                >
                  <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[200px]">
                    <MediaImage
                      src={asset(item.tourImage)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                      quality={65}
                    />
                  </div>
                  <div className="flex flex-col p-5 md:col-span-3 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="display text-2xl text-burgundy">{item.tourName}</h2>
                        {item.tourPrice > 0 ? (
                          <p className="mt-1 text-sm font-semibold text-crimson">{formatMoney(item.tourPrice)}</p>
                        ) : null}
                        <p className="mt-1 text-sm text-muted">Duration: {item.tourDuration}</p>
                        {item.tourDescription ? (
                          <p className="mt-2 text-sm leading-relaxed text-muted">{item.tourDescription}</p>
                        ) : null}
                      </div>
                      {inTrip && (
                        <span className="rounded-lg bg-burgundy px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                          In your trip
                        </span>
                      )}
                    </div>
                    {inTrip ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSkipped((prev) => (prev.includes(item.tourId) ? prev : [...prev, item.tourId]));
                          remove(item.tourId);
                        }}
                        className="mt-4 h-11 self-start rounded-lg px-5 text-sm font-semibold text-crimson ring-1 ring-sand"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSkipped((prev) => prev.filter((id) => id !== item.tourId));
                          add(item.tourId);
                        }}
                        className="mt-4 h-11 self-start rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
                      >
                        Add to trip
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit rounded-lg bg-white p-6 ring-1 ring-sand lg:sticky lg:top-28">
            <p className="script text-2xl text-rose">Your custom trip</p>
            <p className="mt-1 text-sm text-muted">
              {selected.length === 0
                ? "Add custom tours to build one itinerary."
                : `${selected.length} custom tour${selected.length === 1 ? "" : "s"} selected.`}
            </p>
            {selected.length > 0 && (
              <ul className="mt-4 space-y-3 border-t border-sand pt-4">
                {selected.map((item) => (
                  <li key={item.tourId} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-burgundy">{item.tourName}</p>
                      <p className="text-muted">Duration: {item.tourDuration}</p>
                    </div>
                    {item.tourPrice > 0 ? (
                      <p className="shrink-0 font-semibold">{formatMoney(item.tourPrice)}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            {total > 0 ? (
              <p className="mt-4 flex items-baseline justify-between border-t border-sand pt-4">
                <span className="text-sm text-muted">Estimated price</span>
                <span className="display text-3xl text-burgundy">{formatMoney(total)}</span>
              </p>
            ) : null}
            <Link
              href="/travel/custom/review"
              className={`mt-5 flex h-12 items-center justify-center rounded-lg text-sm font-semibold ${
                selected.length ? "bg-crimson text-white" : "pointer-events-none bg-sand text-muted"
              }`}
            >
              Review trip
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
