import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export function StoreComingSoon() {
  return (
    <>
      <PageHero
        kicker="Store"
        title="Objects with a place of origin."
        text="Fashion, shea, spice, cloth, and paper from ateliers we can name. Chosen for this house."
        image={covers.shop}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="script text-2xl text-crimson">The shop</p>
        <h2 className="display mt-2 text-4xl text-burgundy">Coming soon</h2>
        <p className="mt-5 text-[17px] leading-relaxed text-ink/85">
          We are still preparing this aisle. When it opens, you will find objects from Ghanaian makers here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/travel"
            className="inline-flex h-11 items-center rounded bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-deep"
          >
            Visit Ghana
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded px-5 text-sm font-semibold text-burgundy ring-1 ring-sand hover:bg-cream"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
