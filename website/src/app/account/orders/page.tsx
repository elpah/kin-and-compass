"use client";

import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

export default function AccountOrdersPage() {
  const { orders } = useAuth();

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">Orders</p>
      <h2 className="display mt-1 text-3xl text-burgundy">Store orders</h2>
      <p className="mt-2 text-sm text-muted">
        Demo checkout confirmations from this browser. Card charges are not live yet.
      </p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg bg-white p-8 text-center ring-1 ring-sand">
          <p className="text-sm text-muted">You have not placed an order yet.</p>
          <Link
            href="/store"
            className="mt-5 inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
          >
            Shop the store
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg bg-white ring-1 ring-sand">
          <table className="hidden w-full text-left text-sm md:table">
            <thead className="bg-sand/50 text-[11px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-sand">
                  <td className="px-5 py-4">
                    <Link href={`/order/${order.id}`} className="font-semibold text-burgundy hover:text-crimson">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blush px-2.5 py-1 text-xs font-semibold text-burgundy">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {order.items.reduce((sum, item) => sum + item.qty, 0)}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold">{formatMoney(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="divide-y divide-sand md:hidden">
            {orders.map((order) => (
              <li key={order.id} className="p-5">
                <Link href={`/order/${order.id}`} className="font-semibold text-burgundy">
                  {order.id}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {order.status} · {new Date(order.createdAt).toLocaleDateString()} · {formatMoney(order.total)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
