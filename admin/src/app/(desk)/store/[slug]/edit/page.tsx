"use client";

import { ProductForm } from "@/components/ProductForm";
import { getProduct } from "@/lib/api";
import type { Product } from "@kincompass/shared";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProduct(params.slug)
      .then((data) => setProduct(data.product))
      .catch(() => router.replace("/store"));
  }, [params.slug, router]);

  if (!product) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/store" className="hover:text-burgundy">
          Store
        </Link>{" "}
        / Edit
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">{product.name}</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
