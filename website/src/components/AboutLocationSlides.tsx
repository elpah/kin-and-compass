"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { useEffect, useState } from "react";

const slides = [
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169812/travel_etjpti.webp",
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169805/IMG_1206_wtpvfa.webp",
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169805/IMG_1208_iecdxq.webp",
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169807/IMG_1209_syymvo.webp",
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169806/IMG_1210_ehmkyg.webp",
  "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789169806/IMG_1211_fn85tt.webp",
];
const INTERVAL_MS = 3200;

export function AboutLocationSlides() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = slides[index]!;
  const next = slides[(index + 1) % slides.length]!;

  return (
    <>
      <CloudinaryImage
        src={current}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={65}
        priority={index === 0}
        className="object-cover"
      />
      <CloudinaryImage
        src={next}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={65}
        className="pointer-events-none opacity-0"
      />
    </>
  );
}
