"use client";

import { ConfirmModal } from "@/components/ConfirmModal";
import { VisitGhanaStatusTabs, VisitGhanaTabs } from "@/components/VisitGhanaTabs";
import { asset, deleteTour, listTours, restoreTour, updateTour } from "@/lib/api";
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
  const [toDelete, setToDelete] = useState<{ item: PackagedTour; permanent: boolean } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

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
          <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Packaged tour</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => {
                  const archived = status === "deleted" || Boolean(tour.deleted);
                  return (
                    <tr key={tour.packagedTourId} className="border-t border-sand">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={asset(tour.image)} alt="" className="h-12 w-16 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium text-burgundy">{tour.name}</p>
                            <p className="text-xs text-muted">{tour.tourIds.length} custom trips</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">${tour.price}</td>
                      <td className="px-4 py-3">
                        {archived ? (
                          <span className="rounded-lg bg-sand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                            Deleted
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleActive(tour)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                              tour.active ? "bg-burgundy text-white" : "bg-sand text-muted"
                            }`}
                          >
                            {tour.active ? "Published" : "Draft"}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {archived ? (
                          <div className="flex gap-4">
                            <button
                              type="button"
                              className="font-semibold text-burgundy"
                              disabled={restoringId === tour.packagedTourId}
                              onClick={async () => {
                                setError("");
                                setRestoringId(tour.packagedTourId);
                                try {
                                  const data = await restoreTour(tour.packagedTourId);
                                  setTours((prev) => {
                                    if (!prev) return prev;
                                    if (status === "deleted") {
                                      return prev.filter((row) => row.packagedTourId !== tour.packagedTourId);
                                    }
                                    return prev.map((row) =>
                                      row.packagedTourId === tour.packagedTourId ? data.tour : row,
                                    );
                                  });
                                } catch (err) {
                                  setError(err instanceof Error ? err.message : "Could not restore tour");
                                } finally {
                                  setRestoringId(null);
                                }
                              }}
                            >
                              {restoringId === tour.packagedTourId ? "Restoring..." : "Restore"}
                            </button>
                            <button
                              type="button"
                              className="font-semibold text-crimson"
                              onClick={() => setToDelete({ item: tour, permanent: true })}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <Link
                              href={`/visit-ghana/tours/${tour.packagedTourId}/edit`}
                              className="font-semibold text-burgundy"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="font-semibold text-crimson"
                              onClick={() => setToDelete({ item: tour, permanent: false })}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      </section>

      <ConfirmModal
        open={toDelete !== null}
        title={toDelete?.permanent ? "Delete permanently" : "Delete packaged tour"}
        confirmLabel={toDelete?.permanent ? "Delete permanently" : "Delete"}
        description={
          toDelete ? (
            toDelete.permanent ? (
              <>
                Permanently delete{" "}
                <span className="font-semibold text-ink">&ldquo;{toDelete.item.name}&rdquo;</span>? This cannot be
                undone.
              </>
            ) : (
              <>
                Delete <span className="font-semibold text-ink">&ldquo;{toDelete.item.name}&rdquo;</span>? It will
                move to deleted packaged tours.
              </>
            )
          ) : null
        }
        pending={deleting}
        onClose={() => {
          if (!deleting) setToDelete(null);
        }}
        onConfirm={async () => {
          if (!toDelete) return;
          setDeleting(true);
          setError("");
          try {
            await deleteTour(toDelete.item.packagedTourId, toDelete.permanent);
            setTours((prev) => {
              if (!prev) return prev;
              if (status === "all" && !toDelete.permanent) {
                return prev.map((row) =>
                  row.packagedTourId === toDelete.item.packagedTourId ? { ...row, deleted: true } : row,
                );
              }
              return prev.filter((row) => row.packagedTourId !== toDelete.item.packagedTourId);
            });
            setToDelete(null);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Delete failed");
          } finally {
            setDeleting(false);
          }
        }}
      />
    </div>
  );
}
