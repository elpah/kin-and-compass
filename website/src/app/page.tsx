import { covers } from "@/assets/covers";
import { LessonCard, TourCard } from "@/components/Cards";
import { ProductCard } from "@/components/ProductCard";
import { lessons } from "@/data/lessons";
import { listFeaturedProducts } from "@/lib/api";
import { pillars } from "@/data/site";
import { tours } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredTours = tours.filter((t) => t.featured);
  const featuredProducts = await listFeaturedProducts(4).catch(() => []);
  const featuredLessons = lessons.filter((l) => l.featured).slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <Image
          src={covers.homepage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/90 via-ink/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-transparent to-ink/30" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <p className="script text-3xl font-medium text-rose sm:text-4xl">Travel And Tour</p>
          <h1 className="display mt-2 max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-7xl">
            Come as a traveler, Leave as family.
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-white/90">
            Move beyond tourism, creating journeys where culture meets commerce,
            opportunity meets intention, and every traveler leaves a footprint
            that matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/travel"
              className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white hover:bg-rose"
            >
              Visit Ghana
            </Link>
            <Link
              href="/stores"
              className="inline-flex h-12 items-center rounded bg-white/10 px-6 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
            >
              Shop the store
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
          Five ways in
        </p>
        <h2 className="display mt-2 text-4xl text-burgundy sm:text-5xl">
          ONE COUNTRY. FIVE WAYS TO CONNECT.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative isolate min-h-[320px] overflow-hidden rounded-lg"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="script text-xl text-rose">{p.kicker}</p>
                <h3 className="display text-3xl text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/75">{p.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-burgundy-deep py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="script text-2xl text-rose">Visit Ghana</p>
              <h2 className="display text-4xl sm:text-5xl">Tours with a pulse</h2>
            </div>
            <Link href="/travel" className="text-sm font-semibold text-white/80 hover:text-white">
              All itineraries →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredTours.slice(0, 2).map((tour) => (
              <div key={tour.slug} className="[&_.text-burgundy]:text-white [&_.text-muted]:text-white/70 [&_.bg-white]:bg-white/5 [&_.ring-sand]:ring-white/10">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
              Stores
            </p>
            <h2 className="display mt-2 text-4xl text-burgundy">From ateliers, not warehouses</h2>
          </div>
          <Link href="/stores" className="text-sm font-semibold text-burgundy hover:text-crimson">
            Shop all →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
                Learning
              </p>
              <h2 className="display mt-2 text-4xl text-burgundy">Arrive already listening</h2>
            </div>
            <Link href="/learning" className="text-sm font-semibold text-burgundy">
              All lessons →
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredLessons.map((l) => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <Link href="/invest" className="group relative min-h-[380px] overflow-hidden rounded-lg">
          <Image
            src={covers.invest}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="script text-2xl text-rose">Opportunity</p>
            <h2 className="display text-4xl text-white">Invest in Ghana</h2>
            <p className="mt-3 max-w-md text-sm text-white/75">
              Six general areas: agriculture, factories, mineral resources, tourism, real estate, and football.
            </p>
          </div>
        </Link>
        <Link href="/charity" className="group relative min-h-[380px] overflow-hidden rounded-lg">
          <Image
            src={covers.impact}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="script text-2xl text-rose">Give back to Ghana</p>
            <h2 className="display text-4xl text-white">Impact My Life</h2>
            <p className="mt-3 max-w-md text-sm text-white/75">
              A call for support as we stand up community work in Ghana.
            </p>
          </div>
        </Link>
      </section>
    </>
  );
}
