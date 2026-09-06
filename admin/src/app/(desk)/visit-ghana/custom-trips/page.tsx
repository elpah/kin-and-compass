"use client";

import { VisitGhanaTabs } from "@/components/VisitGhanaTabs";
import { asset, deleteExperience, listExperiences, updateExperience } from "@/lib/api";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomTripsAdminPage() {
  const [items, setItems] = useState<CustomExperience[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listExperiences()
      .then((data) => setItems(data.experiences))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load trips"));
  }, []);

  async function toggleActive(item: CustomExperience) {
    const form = new FormData();
    form.set("name", item.name);
    form.set("price", String(item.price));
    form.set("duration", item.duration);
    form.set("description", item.description);
    if (!item.active) form.set("active", "on");
    try {
      const data = await updateExperience(item.slug, form);
      setItems((prev) => prev?.map((row) => (row.slug === item.slug ? data.experience : row)) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Builder pieces</p>
          <h1 className="display text-4xl text-burgundy">Custom trips</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            These experiences appear on the public Custom Trip page when they are active.
          </p>
        </div>
        <Link
          href="/visit-ghana/custom-trips/new"
          className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
        >
          Add experience
        </Link>
      </div>
      <VisitGhanaTabs current="custom" />

      {items && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Tile n={items.length} l="Experiences" />
          <Tile n={items.filter((item) => item.active).length} l="Active" />
          <Tile n={items.filter((item) => !item.active).length} l="Inactive" />
        </div>
      )}

      <section className="mt-10">
        {items === null && !error ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : items && items.length === 0 ? (
          <p className="text-sm text-muted">
            No experiences yet.{" "}
            <Link href="/visit-ghana/custom-trips/new" className="font-semibold text-crimson">
              Add the first
            </Link>
            .
          </p>
        ) : items ? (
          <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug} className="border-t border-sand">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(item.image)} alt="" className="h-12 w-16 rounded-lg object-cover" />
                        <p className="font-medium text-burgundy">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.duration}</td>
                    <td className="px-4 py-3">${item.price}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleActive(item)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          item.active ? "bg-burgundy text-white" : "bg-sand text-muted"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4">
                        <Link
                          href={`/visit-ghana/custom-trips/${item.slug}/edit`}
                          className="font-semibold text-burgundy"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="font-semibold text-crimson"
                          onClick={async () => {
                            if (!confirm(`Delete "${item.name}"?`)) return;
                            try {
                              await deleteExperience(item.slug);
                              setItems((prev) => prev?.filter((row) => row.slug !== item.slug) ?? []);
                            } catch (err) {
                              setError(err instanceof Error ? err.message : "Delete failed");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      </section>
    </div>
  );
}

function Tile({ n, l }: { n: number; l: string }) {
  return (
    <div className="rounded-lg bg-burgundy-deep p-6 text-white">
      <p className="display text-4xl text-rose">{n}</p>
      <p className="mt-1 text-sm text-white/70">{l}</p>
    </div>
  );
}
