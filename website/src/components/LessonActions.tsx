"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function LessonActions({ slug }: { slug: string }) {
  const { user, toggleSaved, markComplete } = useAuth();
  if (!user) {
    return (
      <p className="text-sm text-muted">
        <Link href="/login" className="font-semibold text-crimson underline">
          Sign in
        </Link>{" "}
        to save this lesson and track progress.
      </p>
    );
  }
  const saved = user.savedLessons.includes(slug);
  const done = user.completedLessons.includes(slug);
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => toggleSaved(slug)}
        className="h-11 rounded px-5 text-sm font-semibold ring-1 ring-burgundy text-burgundy"
      >
        {saved ? "Saved" : "Save lesson"}
      </button>
      <button
        type="button"
        onClick={() => markComplete(slug)}
        className="h-11 rounded bg-burgundy px-5 text-sm font-semibold text-white"
      >
        {done ? "Completed" : "Mark complete"}
      </button>
    </div>
  );
}
