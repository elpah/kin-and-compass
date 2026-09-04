import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import { fundUse } from "@/data/charity";
import { brand } from "@/data/site";
import Link from "next/link";

export const metadata = {
  title: "Trust",
  description:
    "How Kin and Compass will use gifts in Ghana - mission, reports, and registration notes.",
};

export default function TrustPage() {
  return (
    <>
      <PageHero
        compact
        kicker="Give back to Ghana"
        title="Trust, on the table."
        text="Who we are, how gifts will move, and what we will not pretend about registration until the papers are public."
        image={covers.impact}
      />
      <article className="mx-auto max-w-3xl px-4 py-14 text-[17px] leading-relaxed text-ink/85 sm:px-6">
        <h2 className="display text-3xl text-burgundy">The organisation</h2>
        <p className="mt-3">
          The Give Back desk sits inside {brand.legal}, based in {brand.address}. The
          same house that plans travel also wants a honest way for people to give
          back in Ghana.
        </p>
        <p className="mt-4">
          Mission: raise support for community work we can later name and report on
          plainly. Vision: visitors who came for a trip still have a way to leave
          something standing. We are at the beginning. There are no completed
          project pages to show yet.
        </p>

        <h2 className="display mt-12 text-3xl text-burgundy">Registration</h2>
        <p className="mt-3">
          Registered NGO and fundraising numbers will be published on this page when
          filings are complete. We will not invent a certificate. Until then, gifts
          are recorded, receipted in your account, and held by the Accra desk for
          the first named programmes. Tax deductions depend on your country and our
          status - we do not promise one.
        </p>

        <h2 className="display mt-12 text-3xl text-burgundy">How donations will be used</h2>
        <p className="mt-3">
          Until a programme is named, gifts sit in the Ghana fund. When work is
          live, project gifts will stay with that work unless you tell us otherwise.
          Across the desk we intend:
        </p>
        <ul className="mt-6 space-y-4">
          {fundUse.map((row) => (
            <li key={row.label}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-burgundy">{row.label}</span>
                <span>{row.pct}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-crimson"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </li>
          ))}
        </ul>

        <h2 className="display mt-12 text-3xl text-burgundy">Reports</h2>
        <p className="mt-3">
          Impact numbers and partner names will appear here when there is work to
          report. For now, your receipt number lives on{" "}
          <Link href="/account" className="font-semibold text-crimson">
            your account
          </Link>
          .
        </p>
        <p className="mt-4 text-sm text-muted">
          Privacy of beneficiaries comes first. We do not sell children&apos;s faces to
          raise funds. See our{" "}
          <Link href="/privacy" className="font-semibold text-crimson">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="font-semibold text-crimson">
            Terms
          </Link>
          .
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/charity/donate"
            className="rounded bg-burgundy px-5 py-3 text-sm font-semibold text-white"
          >
            Support the fund
          </Link>
          <Link
            href="/contact"
            className="rounded ring-1 ring-burgundy px-5 py-3 text-sm font-semibold text-burgundy"
          >
            Write to the desk
          </Link>
        </div>
      </article>
    </>
  );
}
