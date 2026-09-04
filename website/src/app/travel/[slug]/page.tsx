import { InquiryForm } from "@/components/InquiryForm";
import { formatMoney } from "@/lib/utils";
import { getTour, tours } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getTour(slug)?.name ?? "Tour" };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <article>
      <div className="relative isolate min-h-[55vh]">
        <Image src={tour.image} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6">
          <p className="text-sm text-white/70">
            <Link href="/travel" className="hover:text-white">
              Visit Ghana
            </Link>{" "}
            / {tour.region}
          </p>
          <h1 className="display mt-3 text-5xl text-white sm:text-6xl">{tour.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{tour.summary}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {tour.gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <section>
            <h2 className="display text-3xl text-burgundy">Itinerary</h2>
            <ol className="mt-5 space-y-4">
              {tour.itinerary.map((d) => (
                <li key={d.day} className="rounded-lg bg-white p-5 ring-1 ring-sand">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-crimson">
                    {d.day}
                  </p>
                  <h3 className="mt-1 font-semibold text-burgundy">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted">{d.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="grid gap-6 sm:grid-cols-2">
            <Fact label="Accommodation" value={tour.accommodation} />
            <Fact label="Transport" value={tour.transport} />
            <Fact label="Availability" value={tour.availability} />
            <Fact label="Activities" value={tour.activities.join(" · ")} />
          </section>
          <section>
            <h2 className="display text-3xl text-burgundy">Traveler notes</h2>
            <div className="mt-4 space-y-3">
              {tour.reviews.map((r) => (
                <blockquote key={r.author} className="rounded-lg bg-blush p-5">
                  <p className="text-sm font-semibold text-burgundy">
                    {r.author} · {r.date} · ★ {r.rating}
                  </p>
                  <p className="mt-2 text-sm text-muted">{r.text}</p>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-lg bg-white p-6 ring-1 ring-sand lg:sticky lg:top-24">
          <p className="text-sm text-muted">{tour.duration}</p>
          <p className="display text-4xl text-burgundy">from {formatMoney(tour.priceFrom)}</p>
          <p className="mt-1 text-xs text-muted">Per person · deposits coming soon</p>
          <div className="mt-6">
            <InquiryForm
              kind={`tour:${tour.slug}`}
              submitLabel="Request this tour"
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-5 ring-1 ring-sand">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-sm text-ink">{value}</p>
    </div>
  );
}
