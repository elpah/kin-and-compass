"use client";

import { ProductForm } from "@/components/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/store" className="hover:text-burgundy">
          Store
        </Link>{" "}
        / New product
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">Add to the store</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <ProductForm />
      </div>
    </div>
  );
}
