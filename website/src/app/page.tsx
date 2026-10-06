import { covers } from "@/assets/covers";
import { HomeView } from "@/components/HomeView";
import { listFeaturedProducts, listSpecialTourCategories } from "@/lib/api";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { buildPulseTabs } from "@/lib/pulse";
import { STORE_LIVE } from "@/lib/store";
import { preload } from "react-dom";

export const dynamic = "force-dynamic";

export default async function Home() {
  preload(cloudinaryUrl(covers.homepage, 960), { as: "image", fetchPriority: "high" });
  const [products, categories] = await Promise.all([
    STORE_LIVE ? listFeaturedProducts(4).catch(() => []) : Promise.resolve([]),
    listSpecialTourCategories(),
  ]);
  return <HomeView products={products} pulse={buildPulseTabs(categories)} />;
}
