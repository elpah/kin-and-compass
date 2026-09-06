"use client";

import { TourCard } from "@/components/Cards";
import { FAQ } from "@/components/FAQ";
import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import { travelFaqs } from "@/data/site";
import { tourRegions, tourTypes, tours } from "@/data/tours";
import Link from "next/link";
import { useState } from "react";

export function TravelBrowser() {
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");
  const filtered = tours.filter((t) => {
    if (region !== "All" && t.region !== region) return false;
    if (type !== "All" && t.type !== type) return false;
    return true;
  });

  return (
    <>
      <PageHero
        kicker="Travel"
        title="Visit Ghana."
        text="Beaches, cities, food, heritage, and nights that run on highlife. Request a seat - or write us a custom brief."
        image={covers.travel}
      >
        <Link
          href="/travel/custom"
          className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white"
        >
          Design Custom Trip
        </Link>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["All", ...tourRegions].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`shrink-0 rounded px-4 py-2 text-sm font-semibold ${
                region === r ? "bg-burgundy text-white" : "bg-white ring-1 ring-sand"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["All", ...tourTypes].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`shrink-0 rounded px-3 py-1.5 text-xs font-semibold ${
                type === t ? "bg-crimson text-white" : "bg-blush text-burgundy"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
        <div className="mt-16">
          <h2 className="display text-3xl text-burgundy">Before you pack</h2>
          <div className="mt-6 max-w-3xl">
            <FAQ items={travelFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
