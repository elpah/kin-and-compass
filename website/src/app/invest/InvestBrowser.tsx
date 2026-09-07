import { covers } from "@/assets/covers";
import { OpportunityCard } from "@/components/Cards";
import { FAQ } from "@/components/FAQ";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { industries, opportunities } from "@/data/opportunities";
import { investFaqs } from "@/data/site";

export function InvestBrowser() {
  return (
    <>
      <PageHero
        kicker="Invest in Ghana"
        title="Discover What's Possible."
        text="Ghana is more than a destination - it is a place of opportunity, growth, and possibility. Explore carefully curated opportunities across agriculture, manufacturing, mineral resources, tourism, real estate, and football. We bring together insights, sector briefings, and emerging opportunities designed to help you understand the landscape before making a move. Start a conversation. Explore the possibilities. Build something that lasts."
        image={covers.invest}
      />

      <section className="border-b border-sand bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <p className="script text-2xl text-rose sm:text-3xl">
              A Gateway to Opportunity in Africa
            </p>
            <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">Why Ghana</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
              Ghana offers a unique combination of economic potential, cultural richness,
              strategic location, and growing industries. As the home of Kin and Compass,
              Ghana is where our knowledge, relationships, and on-the-ground experience
              begin.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              From agriculture and real estate to manufacturing, tourism, mineral
              resources, and sport, we help you understand the opportunities, the
              environment, and the considerations that matter before you make a decision.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <h2 className="display text-3xl text-burgundy sm:text-4xl">
            Explore. Understand. Decide. We Guide You All the Way.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {opportunities.map((o, i) => (
            <OpportunityCard key={o.slug} item={o} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-sand bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="display text-3xl text-burgundy sm:text-4xl">
            More Than a Connection. A Complete Journey.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
            From education and consultation to research, evaluation, introductions,
            purchasing, and delivery, Kin and Compass remains your trusted partner
            throughout the process.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
            You bring the vision. We help you navigate the journey.
          </p>
        </div>
      </section>

      <section className="border-t border-sand bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl text-burgundy sm:text-4xl">Start Exploring Ghana</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Discover the opportunity. Ask the right questions.
            </p>
            <p className="script mt-8 text-2xl text-rose">Request a conversation</p>
            <div className="mt-6 max-w-lg">
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
