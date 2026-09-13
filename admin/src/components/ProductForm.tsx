"use client";

import { FormActions } from "@/components/FormActions";
import { asset, createProduct, updateProduct } from "@/lib/api";
import { MAX_GALLERY_IMAGES, productCategories, type Product, type ProductCategory } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useUnsavedChanges } from "@/components/UnsavedChanges";

type ImageSlot =
  | { id: string; kind: "existing"; src: string }
  | { id: string; kind: "file"; file: File; preview: string };

function slotSrc(slot: ImageSlot) {
  return slot.kind === "existing" ? asset(slot.src) : slot.preview;
}

function money(value: string) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "$0";
  return `$${n.toFixed(2)}`;
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const fileInputId = useId();
  const clearDirty = useUnsavedChanges();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [compareAt, setCompareAt] = useState(product?.compareAt ? String(product.compareAt) : "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [vendor, setVendor] = useState(product?.vendor ?? "");
  const [country, setCountry] = useState(product?.country ?? "Ghana");
  const [description, setDescription] = useState(product?.description ?? "");
  const [featured, setFeatured] = useState(Boolean(product?.featured));
  const [details, setDetails] = useState<string[]>(
    product?.details?.length ? product.details : [""],
  );
  const [images, setImages] = useState<ImageSlot[]>(() => {
    const urls = product?.gallery?.length ? product.gallery : product?.image ? [product.image] : [];
    return urls.map((src, index) => ({ id: `keep-${index}-${src}`, kind: "existing" as const, src }));
  });

  useEffect(() => {
    return () => {
      images.forEach((slot) => {
        if (slot.kind === "file") URL.revokeObjectURL(slot.preview);
      });
    };
    // Only on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function onReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!images.length) {
      setError("Add at least one photo. The first one is the cover.");
      return;
    }
    if (images.length > MAX_GALLERY_IMAGES) {
      setError(`You can attach up to ${MAX_GALLERY_IMAGES} photos. Remove extras first.`);
      return;
    }
    setStep("preview");
  }

  async function publish() {
    setError("");
    setPending(true);
    const form = new FormData();
    form.set("name", name.trim());
    form.set("price", price);
    form.set("compareAt", compareAt);
    form.set("category", category);
    form.set("stock", stock);
    form.set("vendor", vendor.trim());
    form.set("country", country.trim());
    form.set("description", description.trim());
    if (featured) form.set("featured", "on");
    form.set(
      "details",
      details
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n"),
    );
    const keep = images.filter((slot) => slot.kind === "existing").map((slot) => slot.src);
    form.set("keepGallery", keep.join(","));
    const files = images.filter((slot) => slot.kind === "file");
    const cover = images[0];
    if (cover?.kind === "file") {
      form.append("image", cover.file);
      files.slice(1).forEach((slot) => form.append("gallery", slot.file));
    } else {
      files.forEach((slot) => form.append("gallery", slot.file));
    }
    try {
      if (product) await updateProduct(product.slug, form);
      else await createProduct(form);
      clearDirty();
      router.push("/store");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("edit");
    } finally {
      setPending(false);
    }
  }

  const cleanDetails = details.map((line) => line.trim()).filter(Boolean);

  if (step === "preview") {
    return (
      <div>
        <p className="script text-2xl text-crimson">Check it</p>
        <h2 className="display text-3xl text-burgundy">Preview</h2>
        <p className="mt-1 text-sm text-muted">This is how it will look on the store. Nothing is saved yet.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-2">
            {images.map((slot, index) => (
              <div
                key={slot.id}
                className={`relative overflow-hidden rounded-lg bg-sand ${index === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[4/5]"}`}
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
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">
              {[vendor, country].filter(Boolean).join(" · ")}
            </p>
            <h3 className="display mt-2 text-4xl text-burgundy">{name}</h3>
            <p className="mt-3 text-xl font-semibold">
              {money(price)}
              {compareAt && Number(compareAt) > 0 && (
                <span className="ml-2 text-base font-normal text-muted line-through">{money(compareAt)}</span>
              )}
            </p>
            <p className="mt-2 text-sm text-muted">
              {category} · {stock} in stock{featured ? " · Featured" : ""}
            </p>
            <p className="mt-6 leading-relaxed text-ink/80">{description}</p>
            {cleanDetails.length > 0 && (
              <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted">
                {cleanDetails.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-crimson">{error}</p>}
        <div className="mt-8">
          <FormActions
            cancelHref="/store"
            secondaryLabel="Back to edit"
            onSecondary={() => setStep("edit")}
            primaryLabel={pending ? "Saving..." : product ? "Publish changes" : "Publish to store"}
            primaryType="button"
            pending={pending}
            onPrimary={publish}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onReview} className="grid gap-4">
      <Field label="Name" value={name} onChange={setName} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price (USD)" type="number" step="0.01" value={price} onChange={setPrice} required />
        <Field label="Compare-at price" type="number" step="0.01" value={compareAt} onChange={setCompareAt} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Category</span>
          <select
            required
            value={category}
            onChange={(event) => setCategory(event.target.value as ProductCategory | "")}
            className="mt-1 h-12 w-full rounded-lg border border-sand bg-white px-3"
          >
            <option value="">Select</option>
            {productCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <Field label="Stock" type="number" value={stock} onChange={setStock} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vendor" value={vendor} onChange={setVendor} />
        <Field label="Country" value={country} onChange={setCountry} required />
      </div>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Description</span>
        <textarea
          required
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-1 w-full rounded-lg border border-sand px-3 py-2"
        />
      </label>
      <div>
        <p className="text-sm font-medium text-burgundy">Details</p>
        <p className="mt-1 text-xs text-muted">
          One fact per row. Type it, then press Enter or Add detail for the next bullet.
        </p>
        <div className="mt-2 grid gap-2">
          {details.map((line, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={line}
                onChange={(event) => {
                  const next = [...details];
                  next[index] = event.target.value;
                  setDetails(next);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  event.preventDefault();
                  if (!line.trim()) return;
                  if (index < details.length - 1) {
                    const form = event.currentTarget.form;
                    const inputs = form?.querySelectorAll<HTMLInputElement>("[data-detail-row]");
                    inputs?.[index + 1]?.focus();
                    return;
                  }
                  const form = event.currentTarget.form;
                  setDetails([...details, ""]);
                  window.setTimeout(() => {
                    form?.querySelectorAll<HTMLInputElement>("[data-detail-row]")?.[details.length]?.focus();
                  }, 0);
                }}
                data-detail-row
                placeholder={index === 0 ? "e.g. Handwoven cotton-silk blend" : "Add another fact"}
                className="h-12 flex-1 rounded-lg border border-sand px-3 text-sm outline-none focus:ring-2 focus:ring-crimson/30"
              />
              <button
                type="button"
                className="h-12 shrink-0 px-3 text-sm font-semibold text-crimson"
                onClick={() => {
                  if (details.length === 1) {
                    setDetails([""]);
                    return;
                  }
                  setDetails(details.filter((_, i) => i !== index));
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-2 text-sm font-semibold text-burgundy" onClick={() => setDetails([...details, ""])}>
          Add detail
        </button>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-burgundy">
        <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
        Featured on the homepage
      </label>

      <div>
        <p className="text-sm font-medium text-burgundy">Photos</p>
        <p className="mt-1 text-xs text-muted">
          Up to {MAX_GALLERY_IMAGES} photos. The first is the cover. You will see them on the next screen before they go
          live.
        </p>
        <input
          id={fileInputId}
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="sr-only"
          onChange={(event) => addFiles(event.target.files)}
        />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((slot, index) => (
            <div
              key={slot.id}
              className={`relative overflow-hidden rounded-lg bg-sand ring-1 ring-sand ${index === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[4/5]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slotSrc(slot)} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded bg-burgundy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Cover
                </span>
              )}
              <button
                type="button"
                className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-crimson"
                onClick={() => removeImage(slot.id)}
              >
                Remove
              </button>
            </div>
          ))}
          {images.length < MAX_GALLERY_IMAGES && (
            <label
              htmlFor={fileInputId}
              className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-sand bg-cream text-center text-sm font-semibold text-burgundy hover:border-crimson hover:bg-white"
            >
              <span className="text-2xl leading-none">+</span>
              Add photos
            </label>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-crimson">{error}</p>}
      <FormActions cancelHref="/store" primaryLabel="Preview" />
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
  step,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  step?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-burgundy">{label}</span>
      <input
        type={type}
        step={step}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-12 w-full rounded-lg border border-sand px-3"
      />
    </label>
  );
}
