"use client";

import { FormActions } from "@/components/FormActions";
import { useUnsavedChanges } from "@/components/UnsavedChanges";
import { asset, createSpecialTour, updateSpecialTour } from "@/lib/api";
import type { SpecialTour, SpecialTourCategory } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

const cancelHref = "/special-tours";

type ImageSlot =
  | { id: string; kind: "existing"; src: string; publicId: string }
  | { id: string; kind: "file"; file: File; preview: string };

function slotSrc(slot: ImageSlot) {
  return slot.kind === "existing" ? asset(slot.src) : slot.preview;
}

export function SpecialTourForm({
  tour,
  categories,
}: {
  tour?: SpecialTour;
  categories: SpecialTourCategory[];
}) {
  const router = useRouter();
  const fileId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const clearDirty = useUnsavedChanges();
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [tourName, setTourName] = useState(tour?.tourName ?? "");
  const [tourDescription, setTourDescription] = useState(tour?.tourDescription ?? "");
  const [tourPrice, setTourPrice] = useState(tour ? String(tour.tourPrice) : "");
  const [tourDuration, setTourDuration] = useState(tour?.tourDuration ?? "1 Day");
  const [categorySlug, setCategorySlug] = useState(tour?.categorySlug ?? categories[0]?.slug ?? "");
  const [active, setActive] = useState(tour?.active !== false);
  const [images, setImages] = useState<ImageSlot[]>(() =>
    (tour?.images?.length ? tour.images : tour?.tourImage ? [tour.tourImage] : []).map((image, index) => ({
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

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const next: ImageSlot[] = [];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/")) continue;
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        kind: "file",
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setImages((prev) => [...prev, ...next].slice(0, 12));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const slot = prev.find((item) => item.id === id);
      if (slot?.kind === "file") URL.revokeObjectURL(slot.preview);
      return prev.filter((item) => item.id !== id);
    });
  }

  function onReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!categorySlug) {
      setError("Choose a category.");
      return;
    }
    if (!images.length) {
      setError("Add at least one photo. They save to Cloudinary in pulse_tours.");
      return;
    }
    setStep("preview");
  }

  async function save() {
    setError("");
    if (!images.length) {
      setError("Add at least one photo.");
      setStep("edit");
      return;
    }
    setPending(true);
    const form = new FormData();
    form.set("tourName", tourName.trim());
    form.set("tourDescription", tourDescription.trim());
    form.set("tourPrice", tourPrice);
    form.set("tourDuration", tourDuration.trim());
    form.set("categorySlug", categorySlug);
    if (active) form.set("active", "on");
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
      if (tour) await updateSpecialTour(tour.tourId, form);
      else await createSpecialTour(form);
      clearDirty();
      router.push(cancelHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("edit");
    } finally {
      setPending(false);
    }
  }

  const categoryLabel = categories.find((item) => item.slug === categorySlug)?.label ?? categorySlug;

  if (step === "preview") {
    return (
      <div>
        <p className="script text-2xl text-crimson">Check it</p>
        <h2 className="display text-3xl text-burgundy">Preview</h2>
        <p className="mt-1 text-sm text-muted">This is how the special tour will look. Nothing is saved yet.</p>
        <div className="mt-8 grid grid-cols-2 gap-2">
          {images.map((slot, index) => (
            <div
              key={slot.id}
              className={`relative overflow-hidden rounded-lg bg-sand ${index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[16/10]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slotSrc(slot)} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded bg-burgundy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">
          {categoryLabel} · {active ? "Published" : "Draft"} · {tourDuration} · ${tourPrice || "0"}
        </p>
        <h3 className="display mt-2 text-4xl text-burgundy">{tourName}</h3>
        <p className="mt-3 leading-relaxed text-ink/80">{tourDescription}</p>
        {error && <p className="mt-6 text-sm text-crimson">{error}</p>}
        <div className="mt-8">
          <FormActions
            cancelHref={cancelHref}
            secondaryLabel="Back to edit"
            onSecondary={() => setStep("edit")}
            primaryLabel={pending ? "Saving..." : tour ? "Save special tour" : "Add special tour"}
            primaryType="button"
            pending={pending}
            onPrimary={save}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onReview} className="grid gap-4">
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Category</span>
        <select
          required
          value={categorySlug}
          onChange={(event) => setCategorySlug(event.target.value)}
          className="mt-1 h-12 w-full rounded-lg border border-sand bg-white px-3"
        >
          {categories.length === 0 ? <option value="">Add a category first</option> : null}
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Tour name</span>
        <input
          required
          value={tourName}
          onChange={(event) => setTourName(event.target.value)}
          placeholder="e.g. Accra night markets"
          className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Tour description</span>
        <textarea
          required
          rows={4}
          value={tourDescription}
          onChange={(event) => setTourDescription(event.target.value)}
          placeholder="What this special tour includes."
          className="mt-1 w-full rounded-lg border border-sand px-3 py-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Tour price (USD)</span>
          <input
            type="number"
            step="0.01"
            required
            value={tourPrice}
            onChange={(event) => setTourPrice(event.target.value)}
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Tour duration</span>
          <input
            required
            value={tourDuration}
            onChange={(event) => setTourDuration(event.target.value)}
            placeholder="e.g. 1 Day"
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="flex items-center gap-2 font-medium text-burgundy">
          <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
          Publish this special tour
        </span>
        <span className="mt-1 block text-xs text-muted">
          When this is on, it appears on the homepage pulse and the public Custom Trip page.
        </span>
      </label>
      <div>
        <p className="text-sm font-medium text-burgundy">Photos</p>
        <p className="mt-1 text-xs text-muted">
          Upload several photos. They save to Cloudinary in the pulse_tours folder. The first photo is the cover.
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
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
          <label
            htmlFor={fileId}
            className="flex aspect-[16/10] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-sand bg-cream text-sm font-semibold text-burgundy"
          >
            Add photos
          </label>
        </div>
      </div>
      {error && <p className="text-sm text-crimson">{error}</p>}
      <FormActions cancelHref={cancelHref} primaryLabel="Preview" />
    </form>
  );
}
