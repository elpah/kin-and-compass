"use client";

import { ProductForm } from "@/components/ProductForm";
import { getProduct, me } from "@/lib/api";
import type { Product } from "@kincompass/shared";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    me()
      .then(() => getProduct(params.slug))
      .then((data) => setProduct(data.product))
      .catch(() => router.replace("/login"));
  }, [params.slug, router]);

  if (!product) {
    return <p className="px-6 py-20 text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-burgundy">
          Admin
        </Link>{" "}
        / Edit
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">{product.name}</h1>
      <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-sand sm:p-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
