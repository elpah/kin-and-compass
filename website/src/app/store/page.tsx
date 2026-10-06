import { StoreComingSoon } from "@/components/StoreComingSoon";
import { STORE_LIVE } from "@/lib/store";
import { listProducts } from "@/lib/api";
import { StoreBrowser } from "./StoreBrowser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: STORE_LIVE ? "Store" : "Store · Coming soon",
  description: STORE_LIVE
    ? "Fashion, beauty, art, food, and travel goods from Ghanaian makers, chosen and sold by Kin and Compass."
    : "The Kin and Compass store is coming soon.",
};

export default async function StorePage() {
  if (!STORE_LIVE) return <StoreComingSoon />;
  const products = await listProducts();
  return <StoreBrowser products={products} />;
}
