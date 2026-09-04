"use client";

import { LessonCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { lessonTopics, lessons } from "@/data/lessons";
import { useState } from "react";

export function LearningBrowser() {
  const [topic, setTopic] = useState("All");
  const [country, setCountry] = useState("All");
  const countries = ["All", ...new Set(lessons.map((l) => l.country))];
  const filtered = lessons.filter((l) => {
    if (topic !== "All" && l.topic !== topic) return false;
    if (country !== "All" && l.country !== country) return false;
    return true;
  });

  return (
    <>
      <PageHero
        kicker="Learning"
        title="A classroom without the fluorescent lights."
        text="Articles, videos, guides, and a quiz - browse by topic or country. Sign in to save progress."
        image="https://images.unsplash.com/photo-1456513080880-7d93d20cc2ed?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {["All", ...lessonTopics].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded px-4 py-2 text-sm font-semibold ${
                topic === t ? "bg-burgundy text-white" : "bg-white text-burgundy ring-1 ring-sand"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11 rounded-lg border border-sand bg-white px-4 text-sm"
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <LessonCard key={l.slug} lesson={l} />
          ))}
        </div>
      </section>
    </>
  );
}
