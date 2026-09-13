"use client";

import { SpecialTourForm } from "@/components/SpecialTourForm";
import { listSpecialTourCategories } from "@/lib/api";
import type { SpecialTourCategory } from "@kincompass/shared";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewSpecialTourPage() {
  const [categories, setCategories] = useState<SpecialTourCategory[] | null>(null);

  useEffect(() => {
    listSpecialTourCategories()
      .then((data) => setCategories(data.categories))
      .catch(() => setCategories([]));
  }, []);

  if (!categories) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/special-tours" className="hover:text-burgundy">
          Special Tours
        </Link>{" "}
        / New
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">Add a special tour</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <SpecialTourForm categories={categories} />
      </div>
    </div>
  );
}
