"use client";

import { VisitGhanaStatusTabs, VisitGhanaTabs } from "@/components/VisitGhanaTabs";
import { asset, deleteTour, listTours, updateTour } from "@/lib/api";
import type { PackagedTour } from "@kincompass/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function listView(status: string | null): "active" | "deleted" | "all" {
  if (status === "deleted" || status === "all") return status;
  return "active";
}

export default function VisitGhanaAdminPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
      <VisitGhanaAdmin />
    </Suspense>
  );
}

function VisitGhanaAdmin() {
  const params = useSearchParams();
  const status = listView(params.get("status"));
  const [tours, setTours] = useState<PackagedTour[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setTours(null);
    listTours(status)
      .then((data) => setTours(data.tours))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load tours"));
  }, [status]);

  async function toggleActive(tour: PackagedTour) {
    if (tour.deleted) return;
    const form = new FormData();
    form.set("name", tour.name);
    form.set("description", tour.description);
    form.set("duration", tour.duration);
    form.set("tourIds", tour.tourIds.join(","));
    if (!tour.active) form.set("active", "on");
    try {
      const data = await updateTour(tour.packagedTourId, form);
      setTours((prev) => prev?.map((row) => (row.packagedTourId === tour.packagedTourId ? data.tour : row)) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Itineraries</p>
          <h1 className="display text-4xl text-burgundy">Visit Ghana</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Build a packaged tour by choosing custom trips, then add a name and description.
          </p>
        </div>
        {status !== "deleted" && (
          <Link
            href="/visit-ghana/tours/new"
            className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
          >
            Add packaged tour
          </Link>
        )}
      </div>
      <VisitGhanaTabs current="tours" />
      <VisitGhanaStatusTabs baseHref="/visit-ghana" current={status} />

      <section className="mt-10">
        {tours === null && !error ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : tours && tours.length === 0 ? (
          <p className="text-sm text-muted">
            {status === "deleted" ? (
              "No deleted packaged tours."
            ) : (
              <>
                No packaged tours yet.{" "}
                <Link href="/visit-ghana/tours/new" className="font-semibold text-crimson">
                  Add the first
                </Link>
                .
              </>
            )}
          </p>
        ) : tours ? (
          <div className="overflow-hidden rounded-lg bg-white ring-1 ring-sand">
            <ul className="divide-y divide-sand">
              {tours.map((tour) => (
                <li key={tour.packagedTourId} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(tour.image)} alt="" className="h-12 w-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-burgundy">{tour.name}</p>
                      <p className="text-sm text-muted">
                        {tour.duration} · ${tour.price} · {tour.tourIds.length} custom trips
                        {tour.deleted ? " · Deleted" : ""}
                      </p>
                    </div>
                  </div>
                  {!tour.deleted && (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleActive(tour)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          tour.active ? "bg-burgundy text-white" : "bg-sand text-muted"
                        }`}
                      >
                        {tour.active ? "Published" : "Draft"}
                      </button>
                      <Link
                        href={`/visit-ghana/tours/${tour.packagedTourId}/edit`}
                        className="text-sm font-semibold text-burgundy"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="text-sm font-semibold text-crimson"
                        onClick={async () => {
                          if (!confirm(`Delete "${tour.name}"? It will move to deleted packaged tours.`)) return;
                          try {
                            await deleteTour(tour.packagedTourId);
                            setTours((prev) => prev?.filter((row) => row.packagedTourId !== tour.packagedTourId) ?? []);
                          } catch (err) {
                            setError(err instanceof Error ? err.message : "Delete failed");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      </section>
    </div>
  );
}
