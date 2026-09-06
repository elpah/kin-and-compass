import { StoreBrowser } from "./StoreBrowser";
import { listProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Store",
  description:
    "Fashion, beauty, art, food, and travel goods from Ghanaian makers, chosen and sold by Kin and Compass.",
};

export default async function StorePage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }
  return <StoreBrowser products={products} />;
}
