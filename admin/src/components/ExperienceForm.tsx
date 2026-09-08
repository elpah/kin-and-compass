"use client";

import { FormActions } from "@/components/FormActions";
import { useUnsavedChanges } from "@/components/UnsavedChanges";
import { asset, createExperience, updateExperience } from "@/lib/api";
import type { CustomExperience } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

const cancelHref = "/visit-ghana/custom-trips";

export function ExperienceForm({ experience }: { experience?: CustomExperience }) {
  const router = useRouter();
  const fileId = useId();
  const clearDirty = useUnsavedChanges();
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [tourName, setTourName] = useState(experience?.tourName ?? "");
  const [tourDescription, setTourDescription] = useState(experience?.tourDescription ?? "");
  const [tourPrice, setTourPrice] = useState(experience ? String(experience.tourPrice) : "");
  const [tourDuration, setTourDuration] = useState(experience?.tourDuration ?? "1 Day");
  const [active, setActive] = useState(experience?.active !== false);
  const [preview, setPreview] = useState(experience ? asset(experience.tourImage) : "");
  const [file, setFile] = useState<File | null>(null);

  function onReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!experience && !file) {
      setError("Add a photo.");
      return;
    }
    setStep("preview");
  }

  async function save() {
    setError("");
    if (!experience && !file) {
      setError("Add a photo.");
      setStep("edit");
      return;
    }
    setPending(true);
    const form = new FormData();
    form.set("tourName", tourName.trim());
    form.set("tourDescription", tourDescription.trim());
    form.set("tourPrice", tourPrice);
    form.set("tourDuration", tourDuration.trim());
    if (active) form.set("active", "on");
    if (file) form.set("image", file);
    try {
      if (experience) await updateExperience(experience.tourId, form);
      else await createExperience(form);
      clearDirty();
      router.push(cancelHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("edit");
    } finally {
      setPending(false);
    }
  }

  if (step === "preview") {
    return (
      <div>
        <p className="script text-2xl text-crimson">Check it</p>
        <h2 className="display text-3xl text-burgundy">Preview</h2>
        <p className="mt-1 text-sm text-muted">This is how the custom trip will look. Nothing is saved yet.</p>
        <div className="mt-8 overflow-hidden rounded-lg ring-1 ring-sand">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="aspect-[16/10] w-full object-cover" />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-cream text-sm text-muted">No photo</div>
          )}
        </div>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">
          {active ? "Published" : "Draft"} · {tourDuration} · ${tourPrice || "0"}
        </p>
        <h3 className="display mt-2 text-4xl text-burgundy">{tourName}</h3>
        <p className="mt-3 leading-relaxed text-ink/80">{tourDescription}</p>
        {error && <p className="mt-6 text-sm text-crimson">{error}</p>}
        <div className="mt-8">
          <FormActions
            cancelHref={cancelHref}
            secondaryLabel="Back to edit"
            onSecondary={() => setStep("edit")}
            primaryLabel={pending ? "Saving..." : experience ? "Save custom tour" : "Add custom tour"}
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
        <span className="font-medium text-burgundy">Tour name</span>
        <input
          required
          value={tourName}
          onChange={(event) => setTourName(event.target.value)}
          placeholder="e.g. Kakum National Park"
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
          placeholder="What this custom trip includes."
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
          Publish this custom tour
        </span>
        <span className="mt-1 block text-xs text-muted">
          When this is on, it appears on the public Custom Trip page. Leave it off to keep a draft.
        </span>
      </label>
      <div>
        <p className="text-sm font-medium text-burgundy">Tour image</p>
        <p className="mt-1 text-xs text-muted">Uploads to Cloudinary in the kinandcompass folder.</p>
        <input
          id={fileId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => {
            const next = event.target.files?.[0];
            if (!next) return;
            setFile(next);
            setPreview(URL.createObjectURL(next));
          }}
        />
        <label
          htmlFor={fileId}
          className="mt-3 block cursor-pointer overflow-hidden rounded-lg ring-1 ring-sand"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="aspect-[16/10] w-full object-cover" />
          ) : (
            <span className="flex aspect-[16/10] items-center justify-center border-2 border-dashed border-sand bg-cream text-sm font-semibold text-burgundy">
              Add photo
            </span>
          )}
        </label>
      </div>
      {error && <p className="text-sm text-crimson">{error}</p>}
      <FormActions cancelHref={cancelHref} primaryLabel="Preview" />
    </form>
  );
}
