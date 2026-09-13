"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import type { PulseTab } from "@/lib/pulse";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 3200;

export function VisitGallery({ categories }: { categories: PulseTab[] }) {
  const [tab, setTab] = useState(0);
  const [img, setImg] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = categories[tab] ?? categories[0];
  const shots = current?.images ?? [];
  const activeSrc = shots[img] ?? shots[0];
  const nextSrc = shots.length ? shots[(img + 1) % shots.length] : undefined;
  const upcomingTab = categories[(tab + 1) % categories.length];
  const upcomingSrc = upcomingTab && upcomingTab.slug !== current?.slug ? upcomingTab.images[0] : undefined;

  useEffect(() => {
    if (paused || !current || categories.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const list = categories[tab]?.images ?? [];
      if (list.length > 1 && img < list.length - 1) {
        setImg(img + 1);
      } else {
        setTab((t) => (t + 1) % categories.length);
        setImg(0);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [tab, img, cycle, paused, categories, current]);

  function selectTab(next: number) {
    setTab(next);
    setImg(0);
    setCycle((n) => n + 1);
  }

  if (!current || !activeSrc) return null;

  return (
    <div className="mt-6 sm:mt-10">
      <div
        role="tablist"
        aria-label="Visit Ghana experiences"
        className="flex gap-x-3 overflow-x-auto border-b border-black/10 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:gap-x-6 sm:gap-y-1 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category, i) => (
          <button
            key={category.slug}
            type="button"
            role="tab"
            aria-selected={i === tab}
            id={`visit-tab-${category.slug}`}
            aria-controls="visit-gallery-panel"
            onClick={() => selectTab(i)}
            className={`-mb-px shrink-0 border-b-2 pb-1.5 text-xs font-semibold transition-colors sm:pb-3 sm:text-sm ${
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
        id="visit-gallery-panel"
        role="tabpanel"
        aria-labelledby={`visit-tab-${current.slug}`}
        className="relative mt-3 aspect-[4/5] overflow-hidden rounded-lg bg-sand sm:mt-6 sm:aspect-[3/2]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as Node | null;
          if (!next || !event.currentTarget.contains(next)) setPaused(false);
        }}
      >
        <div
          className="absolute inset-0 flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${img * 100}%)` }}
        >
          {shots.map((src, index) => (
            <div key={`${current.slug}-${src}-${index}`} className="relative h-full w-full shrink-0">
              <CloudinaryImage
                src={src}
                alt={index === 0 ? current.label : ""}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={65}
                priority={tab === 0 && index === 0}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
        {nextSrc && nextSrc !== activeSrc ? (
          <CloudinaryImage
            src={nextSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={65}
            className="pointer-events-none opacity-0"
          />
        ) : null}
        {upcomingSrc && upcomingSrc !== activeSrc && upcomingSrc !== nextSrc ? (
          <CloudinaryImage
            src={upcomingSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={65}
            className="pointer-events-none opacity-0"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent pt-16 sm:pt-28">
          <div className="p-4 sm:p-10">
            <p className="script text-3xl text-rose sm:text-5xl">{current.label}</p>
            <p className="mt-2 max-w-3xl text-base font-medium text-white drop-shadow-md sm:mt-3 sm:text-2xl">
              {current.line}
            </p>
            <Link
              href={`/travel/custom?category=${encodeURIComponent(current.slug)}`}
              onClick={() => setPaused(true)}
              className="mt-3 inline-flex h-10 items-center rounded bg-crimson px-4 text-sm font-semibold text-white hover:bg-rose sm:mt-5 sm:h-11 sm:px-5"
            >
              Book tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
