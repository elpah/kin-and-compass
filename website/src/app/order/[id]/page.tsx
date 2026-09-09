"use client";

import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";
import { use } from "react";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, ready } = useAuth();
  const order = orders.find((item) => item.id === id);

  if (!ready) {
    return <p className="px-4 py-32 text-center text-sm text-muted">Loading order...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-28 sm:px-6">
      <p className="text-sm text-muted">
        <Link href="/account/orders" className="font-semibold text-burgundy hover:text-crimson">
          Orders
        </Link>
        <span className="mx-2">/</span>
        {id}
      </p>
      <p className="script mt-6 text-2xl text-crimson">Thank you</p>
      <h1 className="display mt-1 text-4xl text-burgundy">Order {id}</h1>
      {order ? (
        <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-burgundy">
              {order.status}
            </span>
            <p className="text-sm text-muted">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <ul className="mt-6 divide-y divide-sand text-sm">
            {order.items.map((item) => (
              <li key={item.name} className="flex justify-between gap-4 py-3">
                <span className="text-burgundy">
                  {item.qty} × {item.name}
                </span>
                <span className="font-semibold">{formatMoney(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-lg font-semibold text-burgundy">
            Total {formatMoney(order.total)}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          We have your confirmation. If this was placed on another device, it will not show here yet.
        </p>
      )}
      <Link
        href="/account/orders"
        className="mt-8 inline-flex h-12 items-center rounded-lg bg-burgundy px-6 text-sm font-semibold text-white"
      >
        Back to orders
      </Link>
    </div>
  );
}
