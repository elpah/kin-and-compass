"use client";

import { VisitGhanaStatusTabs, VisitGhanaTabs } from "@/components/VisitGhanaTabs";
import { asset, deleteExperience, listExperiences, updateExperience } from "@/lib/api";
import type { CustomExperience } from "@kincompass/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function listView(status: string | null): "active" | "deleted" | "all" {
  if (status === "deleted" || status === "all") return status;
  return "active";
}

export default function CustomTripsAdminPage() {
  const params = useSearchParams();
  const status = listView(params.get("status"));
  const [items, setItems] = useState<CustomExperience[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(null);
    listExperiences(status)
      .then((data) => setItems(data.experiences))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load custom trips"));
  }, [status]);

  async function toggleActive(item: CustomExperience) {
    if (item.deleted) return;
    const form = new FormData();
    form.set("tourName", item.tourName);
    form.set("tourPrice", String(item.tourPrice));
    form.set("tourDuration", item.tourDuration);
    if (!item.active) form.set("active", "on");
    try {
      const data = await updateExperience(item.tourId, form);
      setItems((prev) => prev?.map((row) => (row.tourId === item.tourId ? data.experience : row)) ?? null);
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
            These custom trips appear on the public Custom Trip page when they are published.
          </p>
        </div>
        {status !== "deleted" && (
          <Link
            href="/visit-ghana/custom-trips/new"
            className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
          >
            Add custom trip
          </Link>
        )}
      </div>
      <VisitGhanaTabs current="custom" />
      <VisitGhanaStatusTabs baseHref="/visit-ghana/custom-trips" current={status} />

      <section className="mt-10">
        {items === null && !error ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : items && items.length === 0 ? (
          <p className="text-sm text-muted">
            {status === "deleted" ? (
              "No deleted custom trips."
            ) : (
              <>
                No custom trips yet.{" "}
                <Link href="/visit-ghana/custom-trips/new" className="font-semibold text-crimson">
                  Add the first
                </Link>
                .
              </>
            )}
          </p>
        ) : items ? (
          <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Custom trip</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.tourId} className="border-t border-sand">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(item.tourImage)} alt="" className="h-12 w-16 rounded-lg object-cover" />
                        <p className="font-medium text-burgundy">{item.tourName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.tourDuration}</td>
                    <td className="px-4 py-3">${item.tourPrice}</td>
                    <td className="px-4 py-3">
                      {item.deleted ? (
                        <span className="rounded-lg bg-sand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                          Deleted
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleActive(item)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                            item.active ? "bg-burgundy text-white" : "bg-sand text-muted"
                          }`}
                        >
                          {item.active ? "Published" : "Draft"}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {!item.deleted && (
                        <div className="flex gap-4">
                          <Link
                            href={`/visit-ghana/custom-trips/${item.tourId}/edit`}
                            className="font-semibold text-burgundy"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="font-semibold text-crimson"
                            onClick={async () => {
                              if (!confirm(`Delete "${item.tourName}"? It will move to deleted custom trips.`)) return;
                              try {
                                await deleteExperience(item.tourId);
                                setItems((prev) => prev?.filter((row) => row.tourId !== item.tourId) ?? []);
                              } catch (err) {
                                setError(err instanceof Error ? err.message : "Delete failed");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
