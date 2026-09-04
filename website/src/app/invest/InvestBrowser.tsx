import { OpportunityCard } from "@/components/Cards";
import { FAQ } from "@/components/FAQ";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { industries, opportunities } from "@/data/opportunities";
import { investFaqs, whyGhana } from "@/data/site";

export function InvestBrowser() {
  return (
    <>
      <PageHero
        kicker="Opportunity"
        title="Invest in Ghana."
        text="Agriculture, factories, mineral resources, tourism, real estate, and football. Briefings to start a careful conversation - not listings."
        image="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="border-b border-sand bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <p className="script text-2xl text-rose">A briefing</p>
            <h2 className="display mt-1 text-3xl text-burgundy sm:text-4xl">
              Why look at Ghana
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
              Ghana is where Kin and Compass begins because it is home - and because
              it is a practical place to study opportunity. English is the language
              of business. The Ghana Investment Promotion Centre sets the frame for
              foreigners. Accra, Tema, Kumasi, and Takoradi are not a slide. They
              are ports, markets, and land registries you can visit.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              This desk does not list mines, plants, or flats for sale. It teaches
              the shape of six sectors so you can ask better questions - then, if it
              fits, we introduce you to people on the ground. Nothing here is advice
              or an offer. It is orientation, with care.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyGhana.map((item, i) => (
              <div key={item.title} className="rounded-lg bg-cream p-6 ring-1 ring-sand">
                <p className="text-[11px] font-bold uppercase tracking-wider text-crimson">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-2 text-2xl text-burgundy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
            Six sectors
          </p>
          <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">
            Where to begin
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Choose an area. Each page is a general briefing - risks, requirements,
            and how to start a conversation.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {opportunities.map((o, i) => (
            <OpportunityCard key={o.slug} item={o} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-sand bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="script text-2xl text-rose">The desk</p>
            <h2 className="display mt-1 text-3xl text-burgundy sm:text-4xl">
              Request a conversation
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Tell us which area you are exploring. We reply with questions and, if it
              fits, an introduction.
            </p>
            <div className="mt-8 max-w-lg">
              <InquiryForm
                kind="invest"
                submitLabel="Request briefing"
                fields={[
                  { name: "name", label: "Name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "industry", label: "Area of interest", options: [...industries] },
                  { name: "note", label: "What are you exploring?", textarea: true },
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="display text-3xl text-burgundy">Questions</h2>
            <div className="mt-6">
              <FAQ items={investFaqs} />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Kin and Compass Travel and Tour provides introductions and educational
              material only. We are not a broker-dealer or licensed investment adviser.
              Seek independent legal, tax, and financial advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
