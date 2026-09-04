import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Get involved",
  description:
    "Donate, volunteer, partner, or fundraise for community work in Ghana with Kin and Compass.",
};

const paths = [
  {
    id: "donate",
    title: "Donate",
    text: "Support the Ghana fund financially - once, monthly, or as a company.",
    href: "/charity/donate",
    cta: "Give now",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    text: "Contribute time and skills. Placements are scheduled and screened.",
  },
  {
    id: "partner",
    title: "Partner",
    text: "Collaborate as an organisation or business to help stand up the first work.",
  },
  {
    id: "fundraise",
    title: "Fundraise",
    text: "Raise with us for the Ghana fund, and later for named programmes.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        compact
        kicker="Give back to Ghana"
        title="Get involved."
        text="Four clear paths: give, show up, partner, or raise with us."
        image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-lg bg-white p-6 ring-1 ring-sand hover:ring-crimson"
            >
              <p className="script text-2xl text-rose">{p.title}</p>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </a>
          ))}
        </div>

        <div id="donate" className="mt-16 scroll-mt-28 rounded-lg bg-blush p-8">
          <h2 className="display text-3xl text-burgundy">Donate</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            One-time or monthly to the Ghana fund. Corporate gifts are welcome
            through the same form, with a company name in the note. Named campaigns
            will follow when the first work is live.
          </p>
          <Link
            href="/charity/donate"
            className="mt-6 inline-flex h-12 items-center rounded bg-burgundy px-6 text-sm font-semibold text-white"
          >
            Go to donate
          </Link>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div id="volunteer" className="scroll-mt-28">
            <h2 className="display text-3xl text-burgundy">Volunteer</h2>
            <p className="mt-2 text-sm text-muted">
              Time, a trade, or a term as a mentor in Ghana. We do not send unvetted
              visitors to children. Tell us what you can do and when you are here.
            </p>
            <div className="mt-6">
              <InquiryForm
                kind="charity-volunteer"
                submitLabel="Apply to volunteer"
                fields={[
                  { name: "name", label: "Name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "skills", label: "Skills you can offer", required: true },
                  { name: "when", label: "When you could be in Ghana" },
                  { name: "note", label: "Anything else", textarea: true },
                ]}
              />
            </div>
          </div>
          <div id="partner" className="scroll-mt-28">
            <h2 className="display text-3xl text-burgundy">Partner</h2>
            <p className="mt-2 text-sm text-muted">
              Organisations and businesses: sponsor a classroom, a borehole, a
              cohort, or donate product. We will talk about reporting before logos.
            </p>
            <div className="mt-6">
              <InquiryForm
                kind="charity-partner"
                submitLabel="Start a partnership talk"
                fields={[
                  { name: "name", label: "Your name", required: true },
                  { name: "org", label: "Organisation", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "note", label: "What you have in mind", textarea: true, required: true },
                ]}
              />
            </div>
          </div>
        </div>

        <div id="fundraise" className="mt-16 scroll-mt-28">
          <h2 className="display text-3xl text-burgundy">Fundraise</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Birthdays, churches, alumni groups, company matches. Raise for the Ghana
            fund now. Named programmes will follow.
          </p>
          <div className="mt-6 max-w-lg">
            <InquiryForm
              kind="charity-fundraise"
              submitLabel="Propose a campaign"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "campaign", label: "Working title" },
                { name: "note", label: "Who you would ask, and what you have in mind", textarea: true, required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
