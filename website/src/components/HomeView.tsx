"use client";

import { covers } from "@/assets/covers";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { FadeIn } from "@/components/FadeIn";
import { HomeHero } from "@/components/HomeHero";
import { ProductCard } from "@/components/ProductCard";
import { pillars } from "@/data/site";
import type { Product } from "@kincompass/shared";
import type { PulseTab } from "@/lib/pulse";
import dynamic from "next/dynamic";
import Link from "next/link";

const VisitGallery = dynamic(
  () =>
    import("@/components/VisitGallery").then((mod) => ({ default: mod.VisitGallery })),
  {
    ssr: true,
    loading: () => <div className="mt-10 aspect-[4/5] rounded-lg bg-sand sm:aspect-[3/2]" />,
  },
);

export function HomeView({ products, pulse }: { products: Product[]; pulse: PulseTab[] }) {
  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
            Four ways in
          </p>
          <h2 className="display mt-2 text-4xl text-burgundy sm:text-5xl">
            ONE COUNTRY. FOUR WAYS TO CONNECT.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, index) => (
            <FadeIn key={p.href} delay={index * 0.08}>
              <Link
                href={p.href}
                className="group relative isolate block min-h-[320px] overflow-hidden rounded-lg"
              >
                <CloudinaryImage
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={65}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="script text-xl text-rose">{p.kicker}</p>
                  <h3 className="display text-3xl text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{p.text}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-neutral-200 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4">
              <div>
                <p className="script text-2xl text-rose">Visit Ghana</p>
                <h2 className="display text-4xl text-burgundy sm:text-5xl">Tours with a pulse</h2>
              </div>
              <Link href="/travel/custom" className="text-sm font-semibold text-burgundy hover:text-crimson">
                Plan a trip →
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <VisitGallery categories={pulse} />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
                Store
              </p>
              <h2 className="display mt-2 text-4xl text-burgundy">From ateliers, not warehouses</h2>
            </div>
            <Link href="/store" className="text-sm font-semibold text-burgundy hover:text-crimson">
              Shop all →
            </Link>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, index) => (
            <FadeIn key={p.slug} delay={index * 0.07}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <FadeIn>
          <Link href="/invest" className="group relative block min-h-[380px] overflow-hidden rounded-lg">
            <CloudinaryImage
              src={covers.invest}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={65}
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
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link href="/charity" className="group relative block min-h-[380px] overflow-hidden rounded-lg">
            <CloudinaryImage
              src={covers.impact}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={65}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="script text-2xl text-rose">Give back to Ghana</p>
              <h2 className="display text-4xl text-white">Travel With Purpose</h2>
              <p className="mt-3 max-w-md text-sm text-white/75">
                Leave a legacy. Give back. Get involved. Make an impact.
              </p>
            </div>
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
