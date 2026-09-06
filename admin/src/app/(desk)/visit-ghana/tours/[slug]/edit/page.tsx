"use client";

import { TourForm } from "@/components/TourForm";
import { getTour } from "@/lib/api";
import type { PackagedTour } from "@kincompass/shared";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTourPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [tour, setTour] = useState<PackagedTour | null>(null);

  useEffect(() => {
    getTour(params.slug)
      .then((data) => setTour(data.tour))
      .catch(() => router.replace("/visit-ghana"));
  }, [params.slug, router]);

  if (!tour) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted">
        <Link href="/visit-ghana" className="hover:text-burgundy">
          Tours
        </Link>{" "}
        / Edit
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">{tour.name}</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <TourForm tour={tour} />
      </div>
    </div>
  );
}
