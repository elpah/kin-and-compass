import { InquiryForm } from "@/components/InquiryForm";
import { brand } from "@/data/site";
import { getPackagedTour } from "@/lib/api";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPackagedTour(slug);
  return { title: data?.tour.name ?? "Tour" };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPackagedTour(slug);
  if (!data?.tour || data.tour.active === false) notFound();
  const { tour, experiences } = data;
  const cover = asset(tour.image) || asset(experiences[0]?.tourImage);

  return (
    <article>
      <div className="relative isolate min-h-[55vh] bg-sand">
        {cover ? (
          <Image src={cover} alt="" fill className="object-cover" priority />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6">
          <p className="text-sm text-white/70">
            <Link href="/travel" className="hover:text-white">
              Visit Ghana
            </Link>
            {tour.duration ? ` / ${tour.duration}` : ""}
          </p>
          <h1 className="display mt-3 text-5xl text-white sm:text-6xl">{tour.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{tour.description}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {experiences.length > 0 ? (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                {experiences.map((item) => {
                  const src = asset(item.tourImage);
                  return (
                    <div key={item.tourId} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
                      {src ? <Image src={src} alt="" fill className="object-cover" /> : null}
                    </div>
                  );
                })}
              </div>
              <section>
                <h2 className="display text-3xl text-burgundy">What you will do</h2>
                <ol className="mt-5 space-y-4">
                  {experiences.map((item) => (
                    <li key={item.tourId} className="rounded-lg bg-white p-5 ring-1 ring-sand">
                      <h3 className="font-semibold text-burgundy">{item.tourName}</h3>
                      <p className="mt-1 text-sm text-muted">Duration: {item.tourDuration}</p>
                      <p className="mt-1 text-sm text-muted">{item.tourDescription}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          ) : (
            <p className="text-sm text-muted">{tour.description}</p>
          )}
        </div>
        <aside className="h-fit rounded-lg bg-white p-6 ring-1 ring-sand lg:sticky lg:top-24">
          <p className="display text-4xl text-burgundy">{formatMoney(tour.price)}</p>
          <p className="mt-1 text-xs text-muted">Per person · deposits coming soon</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            After you request, we will send you a proposed itinerary.
          </p>
          <p className="mt-3 text-sm">
            <a href={`mailto:${brand.bookingEmail}`} className="font-semibold text-burgundy hover:text-crimson">
              {brand.bookingEmail}
            </a>
          </p>
          <div className="mt-6">
            <InquiryForm
              kind={`tour:${tour.packagedTourId}`}
              submitLabel="Request this tour"
              extraPayload={{ tour: tour.name }}
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "dates", label: "Preferred dates", type: "text", required: true },
                { name: "guests", label: "Guests", type: "number", required: true },
                { name: "note", label: "Notes", textarea: true },
              ]}
            />
          </div>
          <Link
            href="/travel/custom"
            className="mt-4 block text-center text-sm font-semibold text-crimson"
          >
            Prefer a private itinerary?
          </Link>
        </aside>
      </div>
    </article>
  );
}
