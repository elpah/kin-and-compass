"use client";

import { inquiryLabel } from "@/components/account/labels";
import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

export default function AccountOverviewPage() {
  const { user, orders, donations, inquiries } = useAuth();
  if (!user) return null;

  const cards = [
    { label: "Orders", value: String(orders.length), href: "/account/orders" },
    { label: "Gifts", value: String(donations.length), href: "/charity/donate" },
    { label: "Requests", value: String(inquiries.length), href: "/contact" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">Overview</p>
        <h2 className="display mt-1 text-3xl text-burgundy">Welcome back.</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Manage your profile, follow store orders, and keep your sign-in details current.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg bg-white p-5 ring-1 ring-sand hover:ring-crimson/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{card.label}</p>
            <p className="display mt-2 text-4xl text-burgundy">{card.value}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-lg bg-white p-6 ring-1 ring-sand">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-burgundy">Recent orders</h3>
          <Link href="/account/orders" className="text-sm font-semibold text-crimson">
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No store orders yet.{" "}
            <Link href="/store" className="font-semibold text-crimson">
              Shop the store
            </Link>
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-sand">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <Link href={`/order/${order.id}`} className="font-semibold text-burgundy">
                    {order.id}
                  </Link>
                  <p className="text-sm text-muted">
                    {order.status} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-ink">{formatMoney(order.total)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {inquiries.length > 0 && (
        <section className="rounded-lg bg-white p-6 ring-1 ring-sand">
          <h3 className="font-semibold text-burgundy">Latest requests</h3>
          <ul className="mt-4 space-y-3">
            {inquiries.slice(0, 3).map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-burgundy">{inquiryLabel(item.kind)}</p>
                <p className="text-muted">{new Date(item.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/account/profile"
          className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
        >
          Edit profile
        </Link>
        <Link
          href="/account/settings"
          className="inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold text-burgundy ring-1 ring-sand"
        >
          Account settings
        </Link>
      </div>
    </div>
  );
}
