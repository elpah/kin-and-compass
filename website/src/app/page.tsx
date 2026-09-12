import { covers } from "@/assets/covers";
import { HomeView } from "@/components/HomeView";
import { listFeaturedProducts } from "@/lib/api";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { preload } from "react-dom";

export const dynamic = "force-dynamic";

export default async function Home() {
  preload(cloudinaryUrl(covers.homepage, 960), { as: "image", fetchPriority: "high" });
  const products = await listFeaturedProducts(4).catch(() => []);
  return <HomeView products={products} />;
}
