"use client";

import { useCustomTrip } from "@/context/CustomTripContext";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import type { CustomExperience } from "@kincompass/shared";
import Image from "next/image";
import Link from "next/link";

export function CustomTripBuilder({ experiences }: { experiences: CustomExperience[] }) {
  const { slugs, add, remove, has } = useCustomTrip();
  const selected = experiences.filter((item) => slugs.includes(item.slug));
  const total = selected.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {experiences.length === 0 ? (
        <p className="mt-8 text-muted">
          No experiences are published yet. Check back soon, or write us at bookings.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {experiences.map((item) => {
              const inTrip = has(item.slug);
              return (
                <article
                  key={item.slug}
                  className="overflow-hidden rounded-lg bg-white ring-1 ring-sand md:grid md:grid-cols-5"
                >
                  <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[200px]">
                    <Image src={asset(item.image)} alt="" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                  <div className="flex flex-col p-5 md:col-span-3 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="display text-2xl text-burgundy">{item.name}</h2>
                        <p className="mt-1 text-sm font-semibold text-crimson">
                          {item.duration} · {formatMoney(item.price)}
                        </p>
                      </div>
                      {inTrip && (
                        <span className="rounded-lg bg-burgundy px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                          In your trip
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                    {inTrip ? (
                      <button
                        type="button"
                        onClick={() => remove(item.slug)}
                        className="mt-4 h-11 self-start rounded-lg px-5 text-sm font-semibold text-crimson ring-1 ring-sand"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => add(item.slug)}
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
                ? "Add experiences to build one itinerary."
                : `${selected.length} experience${selected.length === 1 ? "" : "s"} selected.`}
            </p>
            {selected.length > 0 && (
              <ul className="mt-4 space-y-3 border-t border-sand pt-4">
                {selected.map((item) => (
                  <li key={item.slug} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-burgundy">{item.name}</p>
                      <p className="text-muted">{item.duration}</p>
                    </div>
                    <p className="shrink-0 font-semibold">{formatMoney(item.price)}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 flex items-baseline justify-between border-t border-sand pt-4">
              <span className="text-sm text-muted">Total</span>
              <span className="display text-3xl text-burgundy">{formatMoney(total)}</span>
            </p>
            <Link
              href="/travel/custom/review"
              className={`mt-5 flex h-12 items-center justify-center rounded-lg text-sm font-semibold ${
                selected.length
                  ? "bg-crimson text-white"
                  : "pointer-events-none bg-sand text-muted"
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
