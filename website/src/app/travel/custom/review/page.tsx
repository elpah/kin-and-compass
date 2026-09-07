import { covers } from "@/assets/covers";
import { CustomTripReview } from "@/components/CustomTripReview";
import { PageHero } from "@/components/PageHero";
import { listActiveExperiences } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Review your custom trip",
  description: "Check the experiences in your Ghana itinerary and the running total before you request a booking.",
};

export default async function CustomTripReviewPage() {
  const experiences = await listActiveExperiences();

  return (
    <>
      <PageHero
        compact
        kicker="Your custom trip"
        title="Review before you send."
        text="Remove a day, add another, then continue to the request form with this estimated price attached."
        image={covers.travel}
      />
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <CustomTripReview experiences={experiences} />
      </section>
    </>
  );
}
