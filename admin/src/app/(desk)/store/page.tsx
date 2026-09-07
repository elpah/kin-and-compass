"use client";

import { ConfirmModal } from "@/components/ConfirmModal";
import { asset, deleteProduct, listProducts } from "@/lib/api";
import type { Product } from "@kincompass/shared";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StorePage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    listProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load products"));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Catalogue</p>
          <h1 className="display text-4xl text-burgundy">Store</h1>
          <p className="mt-1 text-sm text-muted">Products on the public site.</p>
        </div>
        <Link
          href="/store/new"
          className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
        >
          Add product
        </Link>
      </div>

      {products && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Tile n={products.length} l="Products" />
          <Tile n={products.reduce((sum, product) => sum + product.stock, 0)} l="Units in stock" />
          <Tile n={products.filter((product) => product.featured).length} l="Featured" />
        </div>
      )}

      <section className="mt-10">
        {products === null && !error ? (
          <p className="text-sm text-muted">Loading catalogue...</p>
        ) : products && products.length === 0 ? (
          <p className="text-sm text-muted">
            No products yet.{" "}
            <Link href="/store/new" className="font-semibold text-crimson">
              Add the first item
            </Link>
            .
          </p>
        ) : products ? (
          <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-sand">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-sand/60 text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug} className="border-t border-sand">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(product.image)} alt="" className="h-12 w-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-burgundy">{product.name}</p>
                          <p className="text-xs text-muted">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{product.vendor}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4">
                        <Link href={`/store/${product.slug}/edit`} className="font-semibold text-burgundy">
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="font-semibold text-crimson"
                          onClick={() => setToDelete(product)}
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
        ) : null}
        {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      </section>

      <ConfirmModal
        open={toDelete !== null}
        title="Delete product"
        description={
          toDelete ? (
            <>
              Delete <span className="font-semibold text-ink">&ldquo;{toDelete.name}&rdquo;</span>? This cannot be
              undone from this list.
            </>
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
            await deleteProduct(toDelete.slug);
            setProducts((prev) => prev?.filter((item) => item.slug !== toDelete.slug) ?? []);
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

function Tile({ n, l }: { n: number; l: string }) {
  return (
    <div className="rounded-lg bg-burgundy-deep p-6 text-white">
      <p className="display text-4xl text-rose">{n}</p>
      <p className="mt-1 text-sm text-white/70">{l}</p>
    </div>
  );
}
