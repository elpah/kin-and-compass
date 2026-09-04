"use client";

import { asset, deleteProduct, listProducts, logout, me } from "@/lib/api";
import type { AdminUser, Product } from "@kincompass/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminHomePage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    me()
      .then((data) => {
        setUser(data.user);
        return listProducts();
      })
      .then((data) => setProducts(data.products))
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!user) {
    return <p className="px-6 py-20 text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Admin</p>
          <h1 className="display text-4xl text-burgundy">Store</h1>
          <p className="text-sm text-muted">Signed in as {user.name}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/store/new"
            className="inline-flex h-11 items-center rounded bg-burgundy px-5 text-sm font-semibold text-white"
          >
            Add product
          </Link>
          <button
            type="button"
            className="text-sm font-semibold text-burgundy"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Tile n={products.length} l="Products" />
        <Tile n={products.reduce((sum, product) => sum + product.stock, 0)} l="Units in stock" />
        <Tile n={products.filter((product) => product.featured).length} l="Featured" />
      </div>

      <section className="mt-12">
        <h2 className="display text-3xl text-burgundy">Catalogue</h2>
        {products.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No products yet. <Link href="/store/new" className="font-semibold text-crimson">Add the first item</Link>.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-sand">
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
                          onClick={async () => {
                            if (!confirm(`Delete "${product.name}"?`)) return;
                            try {
                              await deleteProduct(product.slug);
                              setProducts((prev) => prev.filter((item) => item.slug !== product.slug));
                            } catch (err) {
                              setError(err instanceof Error ? err.message : "Delete failed");
                            }
                          }}
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
      </section>
    </div>
  );
}

function Tile({ n, l }: { n: number; l: string }) {
  return (
    <div className="rounded-2xl bg-burgundy-deep p-6 text-white">
      <p className="display text-4xl text-rose">{n}</p>
      <p className="mt-1 text-sm text-white/70">{l}</p>
    </div>
  );
}
