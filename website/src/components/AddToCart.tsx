"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { useState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={product.stock < 1}
      onClick={() => {
        add({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
      className="h-12 rounded bg-burgundy px-8 text-sm font-semibold text-white hover:bg-burgundy-deep disabled:opacity-40"
    >
      {product.stock < 1 ? "Sold out" : added ? "Added to bag" : "Add to bag"}
    </button>
  );
}

export function AddToCartIcon({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock < 1;

  return (
    <button
      type="button"
      disabled={soldOut}
      aria-label={soldOut ? "Sold out" : added ? "Added to bag" : `Add ${product.name} to bag`}
      onClick={() => {
        if (soldOut) return;
        add({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-burgundy text-white hover:bg-burgundy-deep disabled:opacity-40"
    >
      {added ? <CheckIcon /> : <BagIcon />}
    </button>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1.5 9h-12L5 4H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
