"use client";

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
        <input name="name" required placeholder="Full name" className="h-12 rounded-lg border border-sand px-4" />
        <input name="email" type="email" required placeholder="Email" className="h-12 rounded-lg border border-sand px-4" />
        <input name="phone" required placeholder="Phone" className="h-12 rounded-lg border border-sand px-4" />
        <input name="address" required placeholder="Shipping address" className="h-12 rounded-lg border border-sand px-4" />
        <input name="city" required placeholder="City" className="h-12 rounded-lg border border-sand px-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="card" required placeholder="Card number (demo)" className="h-12 rounded-lg border border-sand px-4" />
          <input name="exp" required placeholder="MM/YY" className="h-12 rounded-lg border border-sand px-4" />
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
