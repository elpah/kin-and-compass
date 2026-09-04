import { brand } from "@/data/site";
import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "Terms for using the Kin and Compass website and services.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
      <p className="script text-2xl text-crimson">Legal</p>
      <h1 className="display text-4xl text-burgundy sm:text-5xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted">Last updated 31 August 2026</p>

      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink/85">
        <section>
          <h2 className="display text-2xl text-burgundy">The site</h2>
          <p className="mt-2">
            These terms govern your use of the {brand.legal} website. By using it,
            you agree to them. If you do not, please leave the site.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Services</h2>
          <p className="mt-2">
            We publish travel itineraries, a store, learning material, educational
            investment briefs, and charity projects in Ghana. Tour prices, product
            stock, and fundraising totals can change. Bookings, orders, and gifts
            are confirmed only when we say so in writing.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Investment content</h2>
          <p className="mt-2">
            Nothing on this site is investment advice, a solicitation, or an offer
            to sell securities. Briefs are educational. You must take independent
            legal, tax, and financial advice in your jurisdiction.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Accounts and store</h2>
          <p className="mt-2">
            You are responsible for the accuracy of information you submit and for
            keeping account details safe. Product images are representative; handmade
            goods vary. Demo checkout on this build does not charge a live card.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Charity and donations</h2>
          <p className="mt-2">
            Gifts recorded on this site are intentions until the Accra desk confirms
            them. Live card processing is being enabled. We do not promise a tax
            deduction. Registered NGO details appear on the Trust page when filings
            are complete. Beneficiary privacy comes first.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Acceptable use</h2>
          <p className="mt-2">
            Do not misuse the site, attempt unauthorised access, or submit unlawful
            or harmful content. We may refuse or end access if these terms are
            broken.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Liability</h2>
          <p className="mt-2">
            The site is provided as is. To the fullest extent allowed by law, we
            are not liable for indirect or consequential loss, or for decisions you
            make based on educational content. Travel involves ordinary risk; you
            are responsible for visas, vaccinations, and insurance.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Contact</h2>
          <p className="mt-2">
            {brand.address}.{" "}
            <a href={`mailto:${brand.email}`} className="text-crimson">
              {brand.email}
            </a>
            . See our{" "}
            <Link href="/privacy" className="font-semibold text-crimson">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/contact" className="font-semibold text-crimson">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </article>
  );
}
