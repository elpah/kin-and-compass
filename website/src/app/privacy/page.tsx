import { brand } from "@/data/site";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "How Kin and Compass collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
      <p className="script text-2xl text-crimson">Legal</p>
      <h1 className="display text-4xl text-burgundy sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated 31 August 2026</p>

      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink/85">
        <section>
          <h2 className="display text-2xl text-burgundy">Who we are</h2>
          <p className="mt-2">
            {brand.legal} (“Kin and Compass”, “we”) operates this website from {brand.address}.
            Questions:{" "}
            <a href={`mailto:${brand.email}`} className="text-crimson">
              {brand.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">What we collect</h2>
          <p className="mt-2">
            When you write to us, create an account, place an order, or send an
            inquiry, we collect the details you submit - typically your name, email,
            phone, travel or gift preferences, and message. The site also uses
            ordinary technical data such as browser type and pages visited to keep
            the service working and to understand what is useful.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">How we use it</h2>
          <p className="mt-2">
            We use your information to reply, fulfil store orders, plan travel,
            record gifts, improve the site, and send updates only if you asked for
            them. We do not sell your personal information.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Sharing</h2>
          <p className="mt-2">
            We may share what is necessary with payment processors, shipping
            partners, universities, or local operators so we can deliver what you
            requested. Investment inquiries may be shared with a relevant local
            partner under the same educational, non-advisory terms described on
            the Invest pages.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Retention and rights</h2>
          <p className="mt-2">
            We keep records only as long as needed for the request, the law, or
            legitimate operations. You may ask to access, correct, or delete your
            information by writing to us. Some demo features on this site store
            data in your browser only.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-burgundy">Children</h2>
          <p className="mt-2">
            This site is not directed at children under 16. If you believe we have
            collected information from a child, contact us and we will delete it.
          </p>
        </section>
        <p>
          See also our{" "}
          <Link href="/terms" className="font-semibold text-crimson">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
