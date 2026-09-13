import { covers } from "@/assets/covers";
import { CustomTripRequest } from "@/components/CustomTripRequest";
import { PageHero } from "@/components/PageHero";
import { listActiveExperiences, listSpecialTourCategories } from "@/lib/api";
import { mergeTripCatalog, pulseCategoryAsTour } from "@/lib/trip";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Request a custom trip",
  description: "Send dates and group size for the Ghana experiences you selected.",
};

export default async function CustomTripRequestPage() {
  const [experiences, categories] = await Promise.all([
    listActiveExperiences(),
    listSpecialTourCategories(),
  ]);
  const catalog = mergeTripCatalog(experiences, categories.map(pulseCategoryAsTour));

  return (
    <>
      <PageHero
        compact
        kicker="Booking request"
        title="Tell us when you travel."
        text="Your selected experiences and total come with this note. We reply within two business days."
        image={covers.travel}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <CustomTripRequest experiences={catalog} />
      </section>
    </>
  );
}
