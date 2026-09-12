"use client";

import { AddToCartIcon } from "@/components/AddToCart";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { MediaImage } from "@/components/CloudinaryImage";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-lg bg-white ring-1 ring-sand transition hover:ring-crimson/40">
      <Link href={`/store/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-sand">
          <MediaImage
            src={asset(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            quality={65}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex items-end justify-between gap-2 p-3">
        <Link href={`/store/${product.slug}`} className="min-w-0">
          <h3 className="display truncate text-lg leading-tight text-burgundy">{product.name}</h3>
          {product.vendor ? (
            <p className="mt-0.5 truncate text-xs text-muted">{product.vendor}</p>
          ) : null}
          <p className="mt-1.5 text-sm font-semibold text-ink">
            {formatMoney(product.price)}
            {product.compareAt && (
              <span className="ml-1.5 font-normal text-muted line-through">
                {formatMoney(product.compareAt)}
              </span>
            )}
          </p>
        </Link>
        <AddToCartIcon product={product} />
      </div>
    </article>
  );
}
