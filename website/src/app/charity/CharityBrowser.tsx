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
        title="Travel With Purpose. Leave a Legacy."
        text="Your journey can be more than a memory, it can be a moment of change. We are building a Give Back initiative that connects travelers, partners, and compassionate individuals with meaningful community projects across Ghana. Together, we can support local communities, create opportunities, inspire hope, and make a lasting difference. Give back. Get involved. Make an impact."
        image={covers.impact}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/charity/donate"
            className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white"
          >
            Support the Cause
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded bg-white/10 px-6 text-sm font-semibold text-white ring-1 ring-white/30"
          >
            Contact us
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-sand bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <p className="script text-2xl text-rose sm:text-3xl">Purpose</p>
            <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">
              Giving Back. Creating Hope. Changing Lives.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">
              Impact My Life is the community focused non-governmental organization (NGO)
              dedicated to giving back and creating meaningful change in communities
              across Ghana. Our mission is simple: to put smiles on faces, restore hope,
              create opportunities, and leave a lasting mark in the lives of people who
              need a helping hand.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              We believe that every contribution counts. Through donations, fundraising
              campaigns, partnerships, sponsorships, community initiatives, and the
              generosity of people who care, we aim to raise the resources needed to
              support the less privileged in areas such as education, healthcare, food,
              clean water, skills development, children, families, and community
              empowerment. We want every gift to become something tangible: a child given
              an opportunity, a family given hope, a community given support, and a smile
              that says someone cared.
            </p>

            <h3 className="display mt-12 text-3xl text-burgundy">Our Promise</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              We are committed to building a transparent, trusted, and compassionate
              platform for giving. We will not create stories or claim projects that do
              not exist. As our initiatives grow, we will share the people, communities,
              needs, and projects we are supporting, giving our partners and donors the
              opportunity to see how their generosity creates impact.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/80">
              You may not be able to change the whole world, but together, we can change
              someone&apos;s world.
            </p>
            <p className="mt-4 text-[17px] font-semibold leading-relaxed text-burgundy">
              Give. Support. Empower. Leave a Mark. ❤️🇬🇭
            </p>
            <div className="mt-8">
              <Link
                href="/charity/donate"
                className="inline-flex h-12 items-center rounded bg-crimson px-6 text-sm font-semibold text-white"
              >
                Support Our Mission
              </Link>
            </div>
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
                href: "/contact?reason=Volunteer",
                title: "Volunteer",
                text: "Offer time and skills. We will only place people when there is real work to do.",
              },
              {
                href: "/contact?reason=Partner",
                title: "Partner",
                text: "Collaborate as an organisation or business to help stand up the desk.",
              },
              {
                href: "/contact?reason=Fundraise",
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
        <Image src={covers.impact} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-burgundy-deep/80" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <p className="script text-3xl text-rose">The house</p>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Help us begin well.</h2>
          <p className="mt-4 text-white/80">
            Visit, shop, invest - and, when you can, give back. Read how gifts will be
            used, then support the fund or write to the desk.
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
