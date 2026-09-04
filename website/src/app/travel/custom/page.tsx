import { covers } from "@/assets/covers";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { tourRegions, tourTypes } from "@/data/tours";

export const metadata = {
  title: "Custom trip",
  description: "Request a private Ghana itinerary by dates, budget, group size, and interests.",
};

export default function CustomTripPage() {
  return (
    <>
      <PageHero
        compact
        kicker="Private tours"
        title="Tell us how you travel."
        text="Dates, budget, group size, and the Ghana you want - heritage, nightlife, family, or quiet beaches."
        image={covers.travel}
      />
      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
        <InquiryForm
          kind="custom-trip"
          submitLabel="Request my itinerary"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "start", label: "Start date", type: "date", required: true },
            { name: "end", label: "End date", type: "date", required: true },
            { name: "guests", label: "Group size", type: "number", required: true },
            {
              name: "budget",
              label: "Budget per person (USD)",
              options: ["Under 800", "800-1,500", "1,500-3,000", "3,000+"],
              required: true,
            },
            { name: "regions", label: "Regions of interest", options: [...tourRegions] },
            { name: "interests", label: "Primary interest", options: [...tourTypes] },
            { name: "note", label: "Anything else", textarea: true },
          ]}
        />
      </section>
    </>
  );
}
