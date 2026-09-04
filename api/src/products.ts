import type { Product as ProductType } from "@kincompass/shared";
import { Product } from "./models/Product.js";

export function serializeProduct(doc: Record<string, unknown>): ProductType {
  const row = doc as unknown as ProductType;
  return {
    slug: row.slug,
    name: row.name,
    price: row.price,
    compareAt: row.compareAt || undefined,
    category: row.category,
    vendor: row.vendor,
    country: row.country,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : [row.image],
    description: row.description,
    details: row.details ?? [],
    stock: row.stock,
    featured: row.featured,
    collection: row.collection || undefined,
    rating: row.rating ?? 0,
    reviewCount: row.reviewCount ?? 0,
    reviews: row.reviews ?? [],
  };
}

export async function listProducts() {
  const rows = await Product.find().sort({ createdAt: -1 }).lean();
  return rows.map((row) => serializeProduct(row as Record<string, unknown>));
}

export async function getProductBySlug(slug: string) {
  const doc = await Product.findOne({ slug }).lean();
  return doc ? serializeProduct(doc as Record<string, unknown>) : null;
}

export async function listFeaturedProducts(limit = 4) {
  const rows = await Product.find({ featured: true }).sort({ createdAt: -1 }).limit(limit).lean();
  if (rows.length) return rows.map((row) => serializeProduct(row as Record<string, unknown>));
  const fallback = await Product.find().sort({ createdAt: -1 }).limit(limit).lean();
  return fallback.map((row) => serializeProduct(row as Record<string, unknown>));
}
