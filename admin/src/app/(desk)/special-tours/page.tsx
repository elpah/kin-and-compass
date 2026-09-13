"use client";

import { ConfirmModal } from "@/components/ConfirmModal";
import { SpecialTourCategoryForm } from "@/components/SpecialTourCategoryForm";
import { asset, deleteSpecialTourCategory, listSpecialTourCategories } from "@/lib/api";
import type { SpecialTourCategory } from "@kincompass/shared";
import { useEffect, useState } from "react";

export default function SpecialToursAdminPage() {
  const [categories, setCategories] = useState<SpecialTourCategory[]>([]);
  const [error, setError] = useState("");
  const [toDeleteCategory, setToDeleteCategory] = useState<SpecialTourCategory | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [categoryForm, setCategoryForm] = useState<"new" | SpecialTourCategory | null>(null);

  useEffect(() => {
    listSpecialTourCategories()
      .then((data) => setCategories(data.categories))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load tours"));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Tours with a pulse</p>
          <h1 className="display text-4xl text-burgundy">Special Tours</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Each row is one tour. The homepage shows the name, the one-liner, and sliding photos. Book tour adds it to
            the custom trip with price and duration.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCategoryForm("new")}
          className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
        >
          Add tour
        </button>
      </div>

      {categoryForm && (
        <SpecialTourCategoryForm
          key={categoryForm === "new" ? "new" : categoryForm.slug}
          category={categoryForm === "new" ? undefined : categoryForm}
          onCancel={() => setCategoryForm(null)}
          onSaved={(saved) => {
            setCategories((prev) => {
              const exists = prev.some((row) => row.slug === saved.slug);
              return exists ? prev.map((row) => (row.slug === saved.slug ? saved : row)) : [...prev, saved];
            });
            setCategoryForm(null);
          }}
        />
      )}

      {categories.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3">One-liner</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.slug} className="border-t border-sand">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.cover?.linkUrl || item.images?.[0]?.linkUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={asset(item.cover ?? item.images[0])}
                          alt=""
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="inline-flex h-12 w-16 items-center justify-center rounded-lg bg-sand text-[10px] font-semibold uppercase tracking-wider text-muted">
                          No cover
                        </span>
                      )}
                      <p className="font-medium text-burgundy">{item.label}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{item.line || "—"}</td>
                  <td className="px-4 py-3 text-muted">{item.tourDuration || "—"}</td>
                  <td className="px-4 py-3">${item.tourPrice ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className="font-semibold text-burgundy"
                        onClick={() => setCategoryForm(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-semibold text-crimson"
                        onClick={() => setToDeleteCategory(item)}
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
      )}
      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}

      <ConfirmModal
        open={toDeleteCategory !== null}
        title="Delete tour"
        confirmLabel="Delete tour"
        description={
          toDeleteCategory ? (
            <>
              Delete <span className="font-semibold text-ink">&ldquo;{toDeleteCategory.label}&rdquo;</span>? It leaves
              the homepage and the custom trip list.
            </>
          ) : null
        }
        pending={deleting}
        onClose={() => {
          if (!deleting) setToDeleteCategory(null);
        }}
        onConfirm={async () => {
          if (!toDeleteCategory) return;
          setDeleting(true);
          setError("");
          try {
            await deleteSpecialTourCategory(toDeleteCategory.slug);
            setCategories((prev) => prev.filter((row) => row.slug !== toDeleteCategory.slug));
            if (categoryForm !== "new" && categoryForm?.slug === toDeleteCategory.slug) {
              setCategoryForm(null);
            }
            setToDeleteCategory(null);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not delete tour");
          } finally {
            setDeleting(false);
          }
        }}
      />
    </div>
  );
}
