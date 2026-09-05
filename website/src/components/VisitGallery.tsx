"use client";

import { visitSlides } from "@/data/visitGallery";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;

export function VisitGallery() {
  const [index, setIndex] = useState(0);
  const current = visitSlides[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % visitSlides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-b border-black/10">
        {visitSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
              i === index
                ? "border-crimson text-crimson"
                : "border-transparent text-muted hover:text-burgundy"
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-sand">
        {visitSlides.map((slide, i) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent pt-28">
          <div className="p-6 sm:p-10">
            <p className="script text-3xl text-rose sm:text-5xl">{current.label}</p>
            <p className="mt-3 max-w-3xl text-lg font-medium text-white drop-shadow-md sm:text-2xl">
              {current.line}
            </p>
            <Link
              href="/travel/custom"
              className="mt-5 inline-flex h-11 items-center rounded bg-crimson px-5 text-sm font-semibold text-white hover:bg-rose"
            >
              Book this
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
