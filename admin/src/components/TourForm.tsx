"use client";

import { asset, createTour, listExperiences, updateTour } from "@/lib/api";
import type { CustomExperience, PackagedTour } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useUnsavedChanges } from "@/components/UnsavedChanges";

export function TourForm({ tour }: { tour?: PackagedTour }) {
  const router = useRouter();
  const fileId = useId();
  const clearDirty = useUnsavedChanges();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [experiences, setExperiences] = useState<CustomExperience[]>([]);
  const [picked, setPicked] = useState<string[]>(tour?.tourIds ?? []);
  const [preview, setPreview] = useState(tour?.image ? asset(tour.image) : "");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    listExperiences()
      .then((data) => setExperiences(data.experiences))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load custom trips"));
  }, []);

  const selected = useMemo(
    () =>
      picked
        .map((id) => experiences.find((item) => item.tourId === id))
        .filter(Boolean) as CustomExperience[],
    [picked, experiences],
  );
  const packagePrice = selected.reduce((sum, item) => sum + item.tourPrice, 0);

  function toggle(id: string) {
    setPicked((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!picked.length) {
      setError("Select at least one custom trip.");
      return;
    }
    setPending(true);
    const form = new FormData(event.currentTarget);
    form.set("tourIds", picked.join(","));
    if (file) form.set("image", file);
    try {
      if (tour) await updateTour(tour.packagedTourId, form);
      else await createTour(form);
      clearDirty();
      router.push("/visit-ghana");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Tour name</span>
        <input
          name="name"
          required
          defaultValue={tour?.name}
          placeholder="e.g. Cape Coast Heritage"
          className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Description</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={tour?.description}
          placeholder="What this packaged tour includes and who it is for."
          className="mt-1 w-full rounded-lg border border-sand px-3 py-2"
        />
      </label>

      <div>
        <p className="text-sm font-medium text-burgundy">Custom trips in this tour</p>
        <p className="mt-1 text-xs text-muted">
          Pick the custom trips in this package. Price is the sum of the selected trips. Timing is confirmed
          after checkout.
        </p>
        {experiences.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No custom trips yet. Add some on the Custom trips tab first.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {experiences.map((item) => {
              const on = picked.includes(item.tourId);
              return (
                <li
                  key={item.tourId}
                  className={`flex flex-wrap items-center gap-3 rounded-lg p-3 ring-1 ${
                    on ? "bg-blush ring-crimson/40" : "bg-white ring-sand"
                  }`}
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input type="checkbox" checked={on} onChange={() => toggle(item.tourId)} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(item.tourImage)} alt="" className="h-12 w-16 rounded object-cover" />
                    <span>
                      <span className="block font-semibold text-burgundy">{item.tourName}</span>
                      <span className="text-xs text-muted">
                        Duration: {item.tourDuration} · ${item.tourPrice}
                      </span>
                      {item.tourDescription ? (
                        <span className="mt-1 line-clamp-2 block text-xs text-muted">{item.tourDescription}</span>
                      ) : null}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
        {selected.length > 0 && (
          <p className="mt-3 text-sm font-semibold text-burgundy">Package price ${packagePrice}</p>
        )}
      </div>

      <label className="block text-sm">
        <span className="flex items-center gap-2 font-medium text-burgundy">
          <input name="active" type="checkbox" defaultChecked={tour?.active !== false} />
          Publish this tour
        </span>
        <span className="mt-1 block text-xs text-muted">
          When this is on, shoppers can see the tour on the public Visit Ghana page. Leave it off to keep a draft.
        </span>
      </label>

      <div>
        <p className="text-sm font-medium text-burgundy">Cover photo</p>
        <p className="mt-1 text-xs text-muted">
          Optional. Uploads to Cloudinary in kinandcompass/packaged-tours. If you skip it, we use the first selected trip photo.
        </p>
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
        <label htmlFor={fileId} className="mt-3 block cursor-pointer overflow-hidden rounded-lg ring-1 ring-sand">
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
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-lg bg-burgundy text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving..." : tour ? "Save tour" : "Create tour"}
      </button>
    </form>
  );
}
