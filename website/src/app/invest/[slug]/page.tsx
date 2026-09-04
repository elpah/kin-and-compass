import { InquiryForm } from "@/components/InquiryForm";
import { getOpportunity, opportunities } from "@/data/opportunities";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getOpportunity(slug)?.title ?? "Opportunity" };
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getOpportunity(slug);
  if (!item) notFound();
  const others = opportunities.filter((o) => o.slug !== item.slug);

  return (
    <article>
      <div className="relative isolate min-h-[58vh]">
        <Image src={item.image} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/45 to-ink/20" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 sm:pb-16">
          <p className="text-sm text-white/70">
            <Link href="/invest" className="hover:text-white">
              Invest in Ghana
            </Link>
            <span className="mx-2">/</span>
            {item.title}
          </p>
          <p className="script mt-4 text-2xl text-rose sm:text-3xl">A briefing</p>
          <h1 className="display mt-1 max-w-3xl text-5xl text-white sm:text-7xl">{item.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{item.hook}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink/80">{item.overview}</p>
          <p className="mt-5 text-sm font-semibold text-burgundy">{item.investmentLevel}</p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <NoteList title="Hold in mind" items={item.risks} />
            <NoteList title="What we ask" items={item.requirements} />
          </div>

          <p className="mt-12 text-xs leading-relaxed text-muted">
            This page is a general briefing. It is not a listing, a solicitation, or an
            offer to invest.
          </p>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-lg bg-white p-6 ring-1 ring-sand lg:sticky lg:top-28">
            <p className="script text-2xl text-rose">The desk</p>
            <p className="mt-1 font-semibold text-burgundy">{item.contact.name}</p>
            <p className="mt-1 text-sm text-muted">{item.contact.email}</p>
            <p className="text-sm text-muted">{item.contact.phone}</p>
            <div className="mt-6">
              <InquiryForm
                kind={`invest:${item.slug}`}
                submitLabel="Inquire about this area"
                fields={[
                  { name: "name", label: "Name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "note", label: "What are you exploring?", textarea: true },
                ]}
              />
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-sand">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="display text-3xl text-burgundy">Other sectors</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/invest/${o.slug}`}
                className="group relative min-h-[180px] overflow-hidden rounded-lg"
              >
                <Image
                  src={o.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/30" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="display text-2xl text-white">{o.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function NoteList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="display text-2xl text-burgundy">{title}</h2>
      <ol className="mt-4 space-y-3">
        {items.map((item, i) => (
          <li key={item} className="rounded-lg bg-white p-4 ring-1 ring-sand">
            <p className="text-[11px] font-bold uppercase tracking-wider text-crimson">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
