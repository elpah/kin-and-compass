import { covers } from "@/assets/covers";
import { CustomTripBuilder } from "@/components/CustomTripBuilder";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/data/site";
import { listActiveExperiences } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Design a custom trip",
  description: "Choose Ghana experiences and build one private itinerary with a running total.",
};

export default async function CustomTripPage() {
  const experiences = await listActiveExperiences();

  return (
    <>
      <PageHero
        compact
        backHref="/travel"
        backLabel="Back to tours"
        kicker="Private tours"
        title="Build your Ghana."
        text="Pick the days you want - parks, castles, city walks - and we stitch them into one trip. Add as many as you like."
        image={covers.travel}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-sm text-muted">
          Bookings:{" "}
          <a href={`mailto:${brand.bookingEmail}`} className="font-semibold text-burgundy hover:text-crimson">
            {brand.bookingEmail}
          </a>
        </p>
        <CustomTripBuilder experiences={experiences} />
      </section>
    </>
  );
}
