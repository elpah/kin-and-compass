import { TravelBrowser } from "./TravelBrowser";
import { listActivePackagedTours } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Visit Ghana",
  description:
    "Discover Ghana: Accra, Cape Coast, Kumasi, Volta, beaches, food, nightlife, and custom private tours.",
};

export default async function TravelPage() {
  const tours = await listActivePackagedTours();
  return <TravelBrowser tours={tours} />;
}
