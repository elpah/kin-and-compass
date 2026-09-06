"use client";

import { asset, createExperience, updateExperience } from "@/lib/api";
import type { CustomExperience } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

export function ExperienceForm({ experience }: { experience?: CustomExperience }) {
  const router = useRouter();
  const fileId = useId();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [preview, setPreview] = useState(experience ? asset(experience.image) : "");
  const [file, setFile] = useState<File | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!experience && !file) {
      setError("Add a photo.");
      return;
    }
    setPending(true);
    const form = new FormData(event.currentTarget);
    if (file) form.set("image", file);
    try {
      if (experience) await updateExperience(experience.slug, form);
      else await createExperience(form);
      router.push("/visit-ghana/custom-trips");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Trip name</span>
        <input
          name="name"
          required
          defaultValue={experience?.name}
          placeholder="e.g. Kakum National Park"
          className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Price (USD)</span>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={experience?.price}
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Duration</span>
          <input
            name="duration"
            required
            defaultValue={experience?.duration ?? "1 Day"}
            placeholder="e.g. 1 Day"
            className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Description</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={experience?.description}
          className="mt-1 w-full rounded-lg border border-sand px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-burgundy">
        <input name="active" type="checkbox" defaultChecked={experience?.active !== false} />
        Active on the public Custom Trip page
      </label>
      <div>
        <p className="text-sm font-medium text-burgundy">Photo</p>
        <p className="mt-1 text-xs text-muted">Shown on the public builder. Click the box to choose a file.</p>
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
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-lg bg-burgundy text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving..." : experience ? "Save trip" : "Add trip"}
      </button>
    </form>
  );
}
