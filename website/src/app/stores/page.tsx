import { StoresBrowser } from "./StoresBrowser";
import { listProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stores",
  description:
    "An Africa-connected marketplace - fashion, beauty, art, food, and travel goods from Ghanaian makers.",
};

export default async function StoresPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }
  return <StoresBrowser products={products} />;
}
