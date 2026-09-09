import { covers } from "@/assets/covers";
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
    cta: "Go to donate",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    text: "Contribute time and skills. Placements are scheduled and screened.",
    href: "/contact?reason=Volunteer",
    cta: "Contact us",
  },
  {
    id: "partner",
    title: "Partner",
    text: "Collaborate as an organisation or business to help stand up the first work.",
    href: "/contact?reason=Partner",
    cta: "Contact us",
  },
  {
    id: "fundraise",
    title: "Fundraise",
    text: "Raise with us for the Ghana fund, and later for named programmes.",
    href: "/contact?reason=Fundraise",
    cta: "Contact us",
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
        image={covers.impact}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="rounded-lg bg-white p-6 ring-1 ring-sand hover:ring-crimson"
            >
              <p className="script text-2xl text-rose">{p.title}</p>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
              <p className="mt-4 text-sm font-semibold text-crimson">{p.cta}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
