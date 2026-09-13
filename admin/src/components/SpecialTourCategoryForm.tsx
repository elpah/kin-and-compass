"use client";

import { asset, createSpecialTourCategory, updateSpecialTourCategory } from "@/lib/api";
import { MAX_GALLERY_IMAGES, type SpecialTourCategory } from "@kincompass/shared";
import { useEffect, useId, useRef, useState } from "react";

type ImageSlot =
  | { id: string; kind: "existing"; src: string; publicId: string }
  | { id: string; kind: "file"; file: File; preview: string };

function slotSrc(slot: ImageSlot) {
  return slot.kind === "existing" ? asset(slot.src) : slot.preview;
}

export function SpecialTourCategoryForm({
  category,
  onCancel,
  onSaved,
}: {
  category?: SpecialTourCategory;
  onCancel: () => void;
  onSaved: (category: SpecialTourCategory) => void;
}) {
  const fileId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [label, setLabel] = useState(category?.label ?? "");
  const [line, setLine] = useState(category?.line ?? "");
  const [tourPrice, setTourPrice] = useState(category ? String(category.tourPrice ?? 0) : "");
  const [tourDuration, setTourDuration] = useState(category?.tourDuration ?? "1 Day");
  const [images, setImages] = useState<ImageSlot[]>(() =>
    (category?.images?.length ? category.images : category?.cover ? [category.cover] : []).map((image, index) => ({
      id: `keep-${index}-${image.linkUrl}`,
      kind: "existing" as const,
      src: image.linkUrl,
      publicId: image.publicId,
    })),
  );

  useEffect(() => {
    return () => {
      images.forEach((slot) => {
        if (slot.kind === "file") URL.revokeObjectURL(slot.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) onCancel();
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [pending, onCancel]);

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const next: Extract<ImageSlot, { kind: "file" }>[] = [];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/")) continue;
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        kind: "file",
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setImages((prev) => {
      const room = Math.max(0, MAX_GALLERY_IMAGES - prev.length);
      const take = next.slice(0, room);
      next.slice(room).forEach((slot) => URL.revokeObjectURL(slot.preview));
      return [...prev, ...take];
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const slot = prev.find((item) => item.id === id);
      if (slot?.kind === "file") URL.revokeObjectURL(slot.preview);
      return prev.filter((item) => item.id !== id);
    });
  }

  async function save() {
    setError("");
    if (!label.trim()) {
      setError("Tour name is required");
      return;
    }
    if (tourPrice === "" || Number(tourPrice) < 0 || !Number.isFinite(Number(tourPrice))) {
      setError("Tour price is required");
      return;
    }
    if (!tourDuration.trim()) {
      setError("Tour duration is required");
      return;
    }
    if (images.length > MAX_GALLERY_IMAGES) {
      setError(`You can attach up to ${MAX_GALLERY_IMAGES} photos. Remove extras first.`);
      return;
    }
    setPending(true);
    const form = new FormData();
    form.set("label", label.trim());
    form.set("line", line.trim());
    form.set("tourPrice", tourPrice);
    form.set("tourDuration", tourDuration.trim());
    form.set(
      "keepImages",
      JSON.stringify(
        images
          .filter((slot): slot is Extract<ImageSlot, { kind: "existing" }> => slot.kind === "existing")
          .map((slot) => ({ linkUrl: slot.src, publicId: slot.publicId })),
      ),
    );
    images.forEach((slot) => {
      if (slot.kind === "file") form.append("images", slot.file);
    });
    try {
      const data = category
        ? await updateSpecialTourCategory(category.slug, form)
        : await createSpecialTourCategory(form);
      onSaved(data.category);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save tour");
    } finally {
      setPending(false);
    }
  }

  const title = category ? "Edit tour" : "New tour";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label="Close"
        disabled={pending}
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="special-tour-form-title"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-sand"
      >
        <div className="overflow-y-auto p-6">
          <h2 id="special-tour-form-title" className="display text-3xl text-burgundy">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted">
            The homepage shows the name, the one-liner, and the photos sliding. Price and duration appear on the custom
            trip page after Book tour.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-burgundy">Name</span>
              <input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="e.g. Naming ceremony"
                className="mt-1 h-11 w-full rounded-lg border border-sand px-3"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-burgundy">One-liner / description</span>
              <input
                value={line}
                onChange={(event) => setLine(event.target.value)}
                placeholder="Short line under the name on the homepage"
                className="mt-1 h-11 w-full rounded-lg border border-sand px-3"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-burgundy">Price (USD)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={tourPrice}
                onChange={(event) => setTourPrice(event.target.value)}
                className="mt-1 h-11 w-full rounded-lg border border-sand px-3"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-burgundy">Duration</span>
              <input
                value={tourDuration}
                onChange={(event) => setTourDuration(event.target.value)}
                placeholder="e.g. 1 Day"
                className="mt-1 h-11 w-full rounded-lg border border-sand px-3"
              />
            </label>
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-burgundy">Photos</p>
              <p className="mt-1 text-xs text-muted">
                Up to {MAX_GALLERY_IMAGES} photos. The first is the cover. The rest slide on the homepage.
              </p>
              <input
                ref={fileRef}
                id={fileId}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                className="sr-only"
                onChange={(event) => addFiles(event.target.files)}
              />
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {images.map((slot, index) => (
                  <div key={slot.id} className="relative overflow-hidden rounded-lg ring-1 ring-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slotSrc(slot)} alt="" className="aspect-[16/10] w-full object-cover" />
                    {index === 0 && (
                      <span className="absolute left-2 top-2 rounded bg-burgundy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(slot.id)}
                      className="absolute right-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-crimson"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {images.length < MAX_GALLERY_IMAGES && (
                  <label
                    htmlFor={fileId}
                    className="flex aspect-[16/10] cursor-pointer items-center justify-center rounded-lg border border-dashed border-sand text-sm font-semibold text-burgundy"
                  >
                    Add photos
                  </label>
                )}
              </div>
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-crimson">{error}</p>}
        </div>
        <div className="flex shrink-0 justify-end gap-3 border-t border-sand px-6 py-4">
          <button
            type="button"
            disabled={pending}
            onClick={onCancel}
            className="inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold text-burgundy ring-1 ring-sand disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={save}
            className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save tour"}
          </button>
        </div>
      </div>
    </div>
  );
}
