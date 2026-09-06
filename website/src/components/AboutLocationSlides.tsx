"use client";

import img1206 from "@/assets/images/about_slide_images/IMG_1206.webp";
import img1208 from "@/assets/images/about_slide_images/IMG_1208.webp";
import img1209 from "@/assets/images/about_slide_images/IMG_1209.webp";
import img1210 from "@/assets/images/about_slide_images/IMG_1210.webp";
import img1211 from "@/assets/images/about_slide_images/IMG_1211.webp";
import travel from "@/assets/images/about_slide_images/travel.webp";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [travel, img1206, img1208, img1209, img1210, img1211];
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

  return (
    <>
      {slides.map((src, i) => (
        <Image
          key={src.src}
          src={src}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
