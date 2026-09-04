import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Kin and Compass - a house for travel, culture, commerce, giving, and opportunity in Ghana.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        compact
        kicker="The house"
        title="Not another brochure for a single trip."
        text="Someone researching Accra should be able to learn Twi, buy shea, ask about a lodge, and give to a named school - without opening five tabs."
        image="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="mx-auto max-w-3xl px-4 py-14 text-[17px] leading-relaxed text-ink/85 sm:px-6">
        <p>
          Kin and Compass Travel and Tour begins in Ghana because that is home: the
          Atlantic, the markets, the universities, the lodges waiting for guests who
          have been briefed with care.
        </p>
        <p className="mt-5">
          The long map includes Nigeria, Senegal, Kenya, Tanzania, South Africa,
          Rwanda, Morocco, and the rest of the continent - each with travel and
          learning rooms of their own. Investment briefings and charity work stay
          in Ghana.
        </p>
        <p className="mt-5">
          We design for mobile first, for photography that is contemporary rather
          than costume, and for language that treats visitors as adults.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/travel" className="rounded bg-burgundy px-5 py-3 text-sm font-semibold text-white">
            Visit Ghana
          </Link>
          <Link href="/contact" className="rounded ring-1 ring-burgundy px-5 py-3 text-sm font-semibold text-burgundy">
            Write to us
          </Link>
        </div>
      </section>
    </>
  );
}
