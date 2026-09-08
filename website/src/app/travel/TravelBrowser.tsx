import { TourCard } from "@/components/Cards";
import { FAQ } from "@/components/FAQ";
import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import { travelFaqs } from "@/data/site";
import type { PackagedTour } from "@kincompass/shared";
import Link from "next/link";

export function TravelBrowser({ tours }: { tours: PackagedTour[] }) {
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
        {tours.length === 0 ? (
          <p className="text-sm text-muted">No tours are published yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tours.map((t) => (
              <TourCard key={t.packagedTourId} tour={t} />
            ))}
          </div>
        )}
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
