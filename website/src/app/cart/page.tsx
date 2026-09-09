"use client";

import { useCart } from "@/context/CartContext";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, setQty, remove, total } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6">
      <p className="script text-2xl text-crimson">Store</p>
      <h1 className="display text-4xl text-burgundy">Your bag</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-muted">
          Empty for now.{" "}
          <Link href="/store" className="font-semibold text-crimson">
            Visit the store
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <ul className="space-y-4 lg:col-span-3">
            {items.map((item) => (
              <li
                key={item.slug}
                className="flex gap-4 rounded-lg bg-white p-4 ring-1 ring-sand"
              >
                <div className="relative h-24 w-20 overflow-hidden rounded-lg bg-sand">
                  <Image src={asset(item.image)} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/store/${item.slug}`} className="font-semibold text-burgundy">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted">{formatMoney(item.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded ring-1 ring-sand"
                      onClick={() => setQty(item.slug, item.qty - 1)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded ring-1 ring-sand"
                      onClick={() => setQty(item.slug, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-3 text-xs text-crimson"
                      onClick={() => remove(item.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="rounded-lg bg-white p-6 ring-1 ring-sand lg:col-span-2 h-fit">
            <p className="text-sm text-muted">Subtotal</p>
            <p className="display text-3xl text-burgundy">{formatMoney(total)}</p>
            <p className="mt-2 text-xs text-muted">
              Shipping calculated at checkout. Demo checkout - no live card charge.
            </p>
            <Link
              href="/checkout"
              className="mt-6 flex h-12 items-center justify-center rounded bg-burgundy text-sm font-semibold text-white"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
