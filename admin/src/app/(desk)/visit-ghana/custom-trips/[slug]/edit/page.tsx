"use client";

import { ExperienceForm } from "@/components/ExperienceForm";
import { getExperience } from "@/lib/api";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [experience, setExperience] = useState<CustomExperience | null>(null);

  useEffect(() => {
    getExperience(params.slug)
      .then((data) => setExperience(data.experience))
      .catch(() => router.replace("/visit-ghana/custom-trips"));
  }, [params.slug, router]);

  if (!experience) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/visit-ghana/custom-trips" className="hover:text-burgundy">
          Custom trips
        </Link>{" "}
        / Edit
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">{experience.tourName}</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <ExperienceForm experience={experience} />
      </div>
    </div>
  );
}
