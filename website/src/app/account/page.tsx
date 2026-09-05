"use client";

import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout, orders, inquiries, donations } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <h1 className="display text-4xl text-burgundy">Your account</h1>
        <p className="mt-3 text-muted">
          Track orders, gifts, and inquiries in one place.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-12 items-center rounded bg-burgundy px-6 text-sm font-semibold text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Welcome</p>
          <h1 className="display text-4xl text-burgundy">{user.name}</h1>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001"}
            className="text-sm font-semibold text-crimson"
          >
            Admin
          </a>
          <button type="button" onClick={logout} className="text-sm font-semibold text-burgundy">
            Sign out
          </button>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="display text-3xl text-burgundy">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No orders yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {orders.map((o) => (
              <li key={o.id} className="rounded-lg bg-white p-5 ring-1 ring-sand">
                <Link href={`/order/${o.id}`} className="font-semibold text-burgundy">
                  {o.id}
                </Link>
                <p className="text-sm text-muted">
                  {o.status} · {formatMoney(o.total)} · {new Date(o.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="display text-3xl text-burgundy">Gifts</h2>
        {donations.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            No gifts yet.{" "}
            <Link href="/charity" className="font-semibold text-crimson">
              Give back to Ghana
            </Link>
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {donations.map((d) => (
              <li key={d.id} className="rounded-lg bg-white p-5 ring-1 ring-sand">
                <p className="font-semibold text-burgundy">{d.id}</p>
                <p className="text-sm text-muted">
                  {formatMoney(d.amount)} · {d.frequency === "monthly" ? "Monthly" : "One-time"} ·{" "}
                  {d.projectName} · {new Date(d.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="display text-3xl text-burgundy">Your inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Tour, invest, and charity requests will appear here.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {inquiries.map((i) => (
              <li key={i.id} className="rounded-lg bg-white p-5 text-sm ring-1 ring-sand">
                <p className="font-semibold text-burgundy">{i.kind}</p>
                <p className="text-muted">{new Date(i.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
