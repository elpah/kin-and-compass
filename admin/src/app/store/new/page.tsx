"use client";

import { ProductForm } from "@/components/ProductForm";
import { me } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewProductPage() {
  const router = useRouter();
  useEffect(() => {
    me().catch(() => router.replace("/login"));
  }, [router]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-burgundy">
          Admin
        </Link>{" "}
        / New product
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">Add to the store</h1>
      <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-sand sm:p-8">
        <ProductForm />
      </div>
    </div>
  );
}
