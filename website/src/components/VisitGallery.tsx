"use client";

import { visitCategories } from "@/data/visitGallery";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 3200;

export function VisitGallery() {
  const [tab, setTab] = useState(0);
  const [img, setImg] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = visitCategories[tab];
  const activeSrc = current.images[img];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const shots = visitCategories[tab].images;
      if (img < shots.length - 1) {
        setImg(img + 1);
      } else {
        setTab((t) => (t + 1) % visitCategories.length);
        setImg(0);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [tab, img, cycle, paused]);

  function selectTab(next: number) {
    setTab(next);
    setImg(0);
    setCycle((n) => n + 1);
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Visit Ghana experiences"
        className="flex flex-wrap gap-x-6 gap-y-1 border-b border-black/10"
      >
        {visitCategories.map((category, i) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={i === tab}
            onClick={() => selectTab(i)}
            className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
              i === tab
                ? "border-crimson text-crimson"
                : "border-transparent text-muted hover:text-burgundy"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div
        className="relative mt-6 aspect-[4/5] overflow-hidden rounded-lg bg-sand sm:aspect-[16/9]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as Node | null;
          if (!next || !event.currentTarget.contains(next)) setPaused(false);
        }}
      >
        <Image
          key={`${current.id}-${img}`}
          src={activeSrc}
          alt={current.label}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          priority={tab === 0 && img === 0}
          className={`object-cover ${
            current.id === "experience" ? "object-center" : "object-top"
          }`}
        />
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
