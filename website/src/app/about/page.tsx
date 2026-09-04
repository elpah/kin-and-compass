import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import { brand, pillars } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Kin and Compass Travel and Tour - come as a traveler, leave as family. One country, five ways to connect.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="The house"
        title="Come as a traveler. Leave as family."
        text="Kin and Compass is a Ghana house for journeys that go past the itinerary: culture, commerce, opportunity, and a footprint that matters."
        image={covers.homepage}
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-[17px] leading-relaxed text-ink/85 sm:px-6">
        <p className="script text-2xl text-crimson">Who we are</p>
        <h2 className="display mt-2 text-4xl text-burgundy">
          One desk in Accra. Five doors in.
        </h2>
        <p className="mt-5">
          {brand.legal} begins in Ghana because that is home: the Atlantic, the
          markets, the universities, and the lodges waiting for guests who have
          been briefed with care. We move beyond tourism. Culture meets commerce.
          Opportunity meets intention.
        </p>
        <p className="mt-5">
          Someone researching Accra should be able to plan a trip, learn Twi, buy
          shea from a named atelier, ask about a lodge or a factory, and give to
          community work - without opening five tabs.
        </p>
        <p className="mt-5">
          Travel and learning will grow with the continent. Investment briefings
          and the Give Back desk stay in Ghana until there is real work to show
          elsewhere.
        </p>
      </section>

      <section className="border-y border-sand bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
            One country
          </p>
          <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">
            Five ways to connect
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group overflow-hidden rounded-lg bg-cream ring-1 ring-sand hover:ring-crimson"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="script text-lg text-rose">{p.kicker}</p>
                  <h3 className="display text-2xl text-burgundy">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-lg">
          <Image src={covers.extra} alt="" fill className="object-cover" />
        </div>
        <div>
          <p className="script text-2xl text-crimson">Where we sit</p>
          <h2 className="display mt-2 text-3xl text-burgundy">Osu, Accra</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/85">
            The desk is in {brand.address}. Write, call, or WhatsApp. We reply
            within two business days. Urgent travel dates move faster on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/travel"
              className="rounded bg-burgundy px-5 py-3 text-sm font-semibold text-white"
            >
              Visit Ghana
            </Link>
            <Link
              href="/contact"
              className="rounded ring-1 ring-burgundy px-5 py-3 text-sm font-semibold text-burgundy"
            >
              Write to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
