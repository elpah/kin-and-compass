"use client";

import { RequiredMark } from "@/components/RequiredMark";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { addOrder, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <p className="text-muted">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
      <h1 className="display text-4xl text-burgundy">Checkout</h1>
      <p className="mt-2 text-sm text-muted">
        Secure demo checkout. Cards are not charged - you will receive an order
        number and can track it from your account.
      </p>
      <form
        className="mt-8 grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const email = String(data.get("email") ?? "");
          if (!email.includes("@")) {
            setError("Enter a valid email.");
            return;
          }
          const id = addOrder({
            total,
            items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
          });
          clear();
          router.push(`/order/${id}`);
        }}
      >
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            Full name
            <RequiredMark />
          </span>
          <input name="name" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            Email
            <RequiredMark />
          </span>
          <input name="email" type="email" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            Phone
            <RequiredMark />
          </span>
          <input name="phone" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            Shipping address
            <RequiredMark />
          </span>
          <input name="address" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-burgundy">
            City
            <RequiredMark />
          </span>
          <input name="city" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-burgundy">
              Card number (demo)
              <RequiredMark />
            </span>
            <input name="card" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-burgundy">
              MM/YY
              <RequiredMark />
            </span>
            <input name="exp" required className="mt-1 h-12 w-full rounded-lg border border-sand px-4" />
          </label>
        </div>
        {error && <p className="text-sm text-crimson">{error}</p>}
        <p className="text-lg font-semibold text-burgundy">Pay {formatMoney(total)}</p>
        <button type="submit" className="h-12 rounded bg-burgundy font-semibold text-white">
          Place order
        </button>
      </form>
    </div>
  );
}
