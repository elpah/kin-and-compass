"use client";

import { SpecialTourForm } from "@/components/SpecialTourForm";
import { getSpecialTour, listSpecialTourCategories } from "@/lib/api";
import type { SpecialTour, SpecialTourCategory } from "@kincompass/shared";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSpecialTourPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [tour, setTour] = useState<SpecialTour | null>(null);
  const [categories, setCategories] = useState<SpecialTourCategory[]>([]);

  useEffect(() => {
    Promise.all([getSpecialTour(params.slug), listSpecialTourCategories()])
      .then(([tourData, categoryData]) => {
        setTour(tourData.tour);
        setCategories(categoryData.categories);
      })
      .catch(() => router.replace("/special-tours"));
  }, [params.slug, router]);

  if (!tour) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/special-tours" className="hover:text-burgundy">
          Special Tours
        </Link>{" "}
        / Edit
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">{tour.tourName}</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <SpecialTourForm tour={tour} categories={categories} />
      </div>
    </div>
  );
}
