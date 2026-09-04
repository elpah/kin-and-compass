import { DonationForm } from "@/components/DonationForm";
import { PageHero } from "@/components/PageHero";
import { charityFocus } from "@/data/charity";
import Link from "next/link";

export const metadata = {
  title: "Donate",
  description:
    "Give once or monthly to the Kin and Compass Ghana fund as the Give Back desk is built.",
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        compact
        kicker="Give back to Ghana"
        title="A call for support."
        text="One-time or monthly. The Ghana fund helps us stand up the first work. Named campaigns will follow when they exist."
        image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="display text-3xl text-burgundy">Ghana fund</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We have not published live projects yet. Your gift is an intention the
            Accra desk will confirm, and it will go toward the first programmes we
            can name with a place and a partner.
          </p>
          <div className="mt-8 max-w-md rounded-lg bg-white p-6 ring-1 ring-sand">
            <DonationForm />
          </div>
          <p className="mt-6 text-xs text-muted">
            Read{" "}
            <Link href="/charity/trust" className="font-semibold text-crimson">
              how gifts will be used
            </Link>
            . Tax treatment depends on your country and our registration status.
          </p>
        </div>
        <aside className="lg:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Where support can go
          </p>
          <p className="mt-2 text-sm text-muted">
            These are the kinds of work we want to fund in Ghana - not campaigns
            already underway.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {charityFocus.map((area) => (
              <li
                key={area}
                className="rounded bg-white px-3 py-1.5 text-xs font-semibold text-burgundy ring-1 ring-sand"
              >
                {area}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
