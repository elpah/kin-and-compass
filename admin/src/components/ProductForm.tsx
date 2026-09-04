"use client";

import { createProduct, updateProduct } from "@/lib/api";
import { asset } from "@/lib/api";
import { productCategories, type Product } from "@kincompass/shared";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [galleryKeep, setGalleryKeep] = useState(product?.gallery ?? []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    form.set("keepGallery", galleryKeep.join(","));
    try {
      if (product) await updateProduct(product.slug, form);
      else await createProduct(form);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Name" name="name" defaultValue={product?.name} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price (USD)" name="price" type="number" step="0.01" defaultValue={product?.price} required />
        <Field label="Compare-at price" name="compareAt" type="number" step="0.01" defaultValue={product?.compareAt} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-burgundy">Category</span>
          <select
            name="category"
            required
            defaultValue={product?.category}
            className="mt-1 h-12 w-full rounded-xl border border-sand bg-white px-3"
          >
            <option value="">Select</option>
            {productCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <Field label="Stock" name="stock" type="number" defaultValue={product?.stock ?? 0} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vendor" name="vendor" defaultValue={product?.vendor} required />
        <Field label="Country" name="country" defaultValue={product?.country ?? "Ghana"} required />
      </div>
      <Field label="Collection (optional)" name="collection" defaultValue={product?.collection} />
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Description</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={product?.description}
          className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Details (one per line)</span>
        <textarea
          name="details"
          rows={4}
          defaultValue={product?.details.join("\n")}
          className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-burgundy">
        <input type="checkbox" name="featured" defaultChecked={product?.featured} />
        Featured on the homepage
      </label>
      <label className="block text-sm">
        <span className="font-medium text-burgundy">
          {product ? "Replace main image" : "Main image"}
        </span>
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={!product}
          className="mt-1 block w-full text-sm"
        />
      </label>
      {product && (
        <div>
          <p className="text-sm font-medium text-burgundy">Current gallery</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {galleryKeep.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setGalleryKeep((prev) => prev.filter((item) => item !== src))}
                className="relative overflow-hidden rounded-xl ring-1 ring-sand"
                title="Remove from gallery"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(src)} alt="" className="h-20 w-16 object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-muted">Click a thumbnail to remove it.</p>
        </div>
      )}
      <label className="block text-sm">
        <span className="font-medium text-burgundy">Add gallery images</span>
        <input
          name="gallery"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="mt-1 block w-full text-sm"
        />
      </label>
      {error && <p className="text-sm text-crimson">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded bg-burgundy text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving..." : product ? "Save changes" : "Add to store"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  step?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-burgundy">{label}</span>
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 h-12 w-full rounded-xl border border-sand px-3"
      />
    </label>
  );
}
