import { covers } from "@/assets/covers";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { charityFocus } from "@/data/charity";
import { charityFaqs } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export function CharityBrowser() {
  return (
    <>
      <PageHero
        kicker="Give back to Ghana"
        title="Impact My Life"
        text="We are building a Give Back desk so people can support community work in Ghana. The first projects are not live yet. We need partners, gifts, and people who will walk with us as the work is named."
        image={covers.impact}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/charity/donate"
            className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white"
          >
            Call for support
          </Link>
          <Link
            href="/charity/get-involved"
            className="inline-flex h-12 items-center rounded bg-white/10 px-6 text-sm font-semibold text-white ring-1 ring-white/30"
          >
            Get involved
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-sand bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <p className="script text-2xl text-rose">Purpose</p>
            <h2 className="display mt-1 text-3xl text-burgundy sm:text-4xl">
              Why this desk exists
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
              Impact My Life will connect individuals, organisations, businesses, and
              supporters with community work in Ghana - education, health, water,
              skills, and care for families. The aim is a transparent, trusted space
              where you can learn what is needed, give, and later see what your gift
              helped start.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              Kin and Compass already welcomes people to visit, learn, shop, and
              look at opportunity. This room is for giving back. We will not invent
              completed projects. When the first programmes are named, they will
              appear here with a place, a purpose, and a way to help.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Call for support",
                text: "Gifts to the Ghana fund help us stand up the first work - with partners on the ground, not a brochure of results we do not have.",
              },
              {
                title: "Walk with us",
                text: "Volunteer time, professional skills, or a company partnership. We screen and schedule. We do not send unvetted visitors to children.",
              },
              {
                title: "Stay honest",
                text: "How gifts will be used is on the Trust page. Registration details will be published when filings are complete. We will not invent a number.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-cream p-6 ring-1 ring-sand">
                <h3 className="display text-2xl text-burgundy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
          Where we intend to work
        </p>
        <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">Focus areas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          These are the kinds of need we want to meet in Ghana. They are not live
          campaigns yet.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {charityFocus.map((area) => (
            <li
              key={area}
              className="rounded bg-white px-4 py-2 text-sm font-semibold text-burgundy ring-1 ring-sand"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="display text-4xl text-burgundy">Four ways in</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Money, time, a company, or a campaign of your own - as the first work
            is built.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/charity/donate",
                title: "Donate",
                text: "Give once or monthly to the Ghana fund while the first programmes are formed.",
              },
              {
                href: "/charity/get-involved#volunteer",
                title: "Volunteer",
                text: "Offer time and skills. We will only place people when there is real work to do.",
              },
              {
                href: "/charity/get-involved#partner",
                title: "Partner",
                text: "Collaborate as an organisation or business to help stand up the desk.",
              },
              {
                href: "/charity/get-involved#fundraise",
                title: "Fundraise",
                text: "Raise with us for the fund, and later for named programmes.",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg bg-cream p-6 ring-1 ring-sand hover:ring-crimson"
              >
                <p className="script text-2xl text-rose">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20">
        <Image
          src={covers.impact}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-burgundy-deep/80" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <p className="script text-3xl text-rose">The house</p>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Help us begin well.</h2>
          <p className="mt-4 text-white/80">
            Visit, learn, shop, invest - and, when you can, give back. Read how
            gifts will be used, then support the fund or write to the desk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/charity/donate"
              className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold"
            >
              Support the Ghana fund
            </Link>
            <Link
              href="/charity/trust"
              className="inline-flex h-12 items-center rounded bg-white/10 px-6 text-sm font-semibold ring-1 ring-white/30"
            >
              Trust and reports
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="display text-3xl text-burgundy">Questions</h2>
        <div className="mt-6">
          <FAQ items={charityFaqs} />
        </div>
      </section>
    </>
  );
}
