"use client";

import { covers } from "@/assets/covers";
import { CoverImage } from "@/components/CoverImage";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <CoverImage src={covers.homepage} priority />
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/90 via-ink/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-transparent to-ink/30" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
        <motion.p
          className="script text-3xl font-medium text-rose sm:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        >
          Travel And Tour
        </motion.p>
        <motion.h1
          className="display mt-2 max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          Come as a traveler, Leave as family.
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-lg font-medium text-white/90"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          Move beyond tourism, creating journeys where culture meets commerce,
          opportunity meets intention, and every traveler leaves a footprint
          that matters.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
        >
          <Link
            href="/travel"
            className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white hover:bg-rose"
          >
            Book now
          </Link>
          <Link
            href="/store"
            className="inline-flex h-12 items-center rounded bg-white/10 px-6 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
          >
            Shop the store
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
