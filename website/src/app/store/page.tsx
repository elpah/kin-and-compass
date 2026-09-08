import { StoreBrowser } from "./StoreBrowser";
import { listProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Store",
  description:
    "Fashion, beauty, art, food, and travel goods from Ghanaian makers, chosen and sold by Kin and Compass.",
};

export default async function StorePage() {
  const products = await listProducts();
  return <StoreBrowser products={products} />;
}
