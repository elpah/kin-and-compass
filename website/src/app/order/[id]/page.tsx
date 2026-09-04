"use client";

import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";
import { use } from "react";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders } = useAuth();
  const order = orders.find((o) => o.id === id);

  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="script text-3xl text-crimson">Thank you</p>
      <h1 className="display mt-2 text-4xl text-burgundy">Order {id}</h1>
      {order ? (
        <>
          <p className="mt-4 text-muted">
            Status: {order.status} · {formatMoney(order.total)}
          </p>
          <ul className="mt-6 space-y-1 text-sm text-ink">
            {order.items.map((i) => (
              <li key={i.name}>
                {i.qty} × {i.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 text-muted">We have your confirmation. Track it anytime from your account.</p>
      )}
      <Link href="/account" className="mt-8 inline-flex h-12 items-center rounded bg-burgundy px-6 text-sm font-semibold text-white">
        Track in account
      </Link>
    </div>
  );
}
