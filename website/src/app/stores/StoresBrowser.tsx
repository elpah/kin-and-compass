"use client";

import { covers } from "@/assets/covers";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/PageHero";
import { productCategories } from "@kincompass/shared";
import type { Product } from "@/lib/types";
import { useState } from "react";

export function StoresBrowser({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = products.filter((p) => {
    const hay = `${p.name} ${p.vendor} ${p.category} ${p.description}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (cat !== "All" && p.category !== cat) return false;
    return true;
  });

  return (
    <>
      <PageHero
        kicker="Stores"
        title="Objects with a place of origin."
        text="Fashion, shea, spice, cloth, and paper from ateliers we can name. Built so more African vendors can join."
        image={covers.shop}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 ring-1 ring-sand md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, makers, materials…"
            className="h-12 flex-1 rounded-lg border border-sand px-4 text-sm outline-none focus:ring-2 focus:ring-crimson/25"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-12 rounded-lg border border-sand px-3 text-sm"
          >
            <option>All</option>
            {productCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg bg-burgundy-deep text-white md:grid md:grid-cols-2">
          <div className="p-8 sm:p-10">
            <p className="script text-2xl text-rose">Heritage Edit</p>
            <h2 className="display text-4xl">Cloth that remembers</h2>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Kente, adinkra, and wax print - pieces made for ceremonies and ordinary Tuesdays.
            </p>
          </div>
          <div
            className="min-h-[200px] bg-cover bg-center"
            style={{ backgroundImage: `url(${covers.shop.src})` }}
          />
        </div>

        <p className="mt-10 text-sm text-muted">{filtered.length} pieces</p>
        {filtered.length === 0 ? (
          <p className="mt-6 text-muted">Nothing in the store yet. Check back soon.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
