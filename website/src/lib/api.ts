import type { Product } from "@kincompass/shared";
import { products as localProducts } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const useApi = process.env.NEXT_PUBLIC_USE_API === "true";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`API ${path} failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

function featuredFromLocal(limit: number) {
  const featured = localProducts.filter((product) => product.featured);
  return (featured.length ? featured : localProducts).slice(0, limit);
}

export async function listProducts() {
  if (useApi) {
    try {
      const data = await getJson<{ products: Product[] }>("/products");
      if (data.products?.length) return data.products;
    } catch {
      /* API or MongoDB not running - use the local catalogue */
    }
  }
  return localProducts;
}

export async function listFeaturedProducts(limit = 4) {
  if (useApi) {
    try {
      const data = await getJson<{ products: Product[] }>(`/products/featured?limit=${limit}`);
      if (data.products?.length) return data.products;
    } catch {
      /* fall through */
    }
  }
  return featuredFromLocal(limit);
}

export async function getProductBySlug(slug: string) {
  if (useApi) {
    try {
      const data = await getJson<{ product: Product; related: Product[] }>(`/products/${slug}`);
      if (data.product) return data;
    } catch {
      /* fall through */
    }
  }
  const product = localProducts.find((item) => item.slug === slug);
  if (!product) return null;
  const related = localProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);
  return { product, related };
}

export function apiUrl() {
  return API_URL;
}
