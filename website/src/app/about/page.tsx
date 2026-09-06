import { covers } from "@/assets/covers";
import { AboutLocationSlides } from "@/components/AboutLocationSlides";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/data/site";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "We are a travel and tour company passionate about showcasing the beauty, culture, heritage, and opportunities of Ghana to the world.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="The house"
        title="More than travel. A deeper connection"
        text="We are a travel and tour company passionate about showcasing the beauty, culture, heritage, and opportunities of Ghana to the world. Our mission is to create meaningful experiences that connect travelers to our people, our history, and the places that make Ghana unforgettable."
        image={covers.about}
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-[17px] leading-relaxed text-ink/85 sm:px-6">
        <p className="script text-2xl text-crimson">Our story</p>
        <h2 className="display mt-2 text-4xl text-burgundy">Kin and Compass</h2>
        <p className="mt-5">
          Founded with a passion for sharing the authentic Ghanaian experience, our
          company was created to connect people from around the world with the
          culture, history, landscapes, businesses, communities, and opportunities
          that make Ghana unique.
        </p>
        <p className="mt-5">We believe travel should be more than sightseeing. It should create connections.</p>
        <p className="mt-5">
          Whether you&apos;re visiting Ghana for leisure, heritage, education, business,
          investment, or simply to experience something new, we help make your
          journey easier, safer, richer, and more memorable.
        </p>
        <blockquote className="script mt-8 text-3xl text-crimson">
          Ghana is not just a destination. It&apos;s a feeling.
        </blockquote>
      </section>

      <section className="border-y border-sand bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="script text-2xl text-crimson sm:text-3xl">With us</p>
            <h2 className="display mt-2 text-4xl text-burgundy sm:text-5xl">
              Why travel with us?
            </h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="text-[17px] leading-relaxed text-ink/85">
              At Kin and Compass, we believe travel is more than visiting places.
              It is about discovering cultures, connecting with people, and creating
              unforgettable memories. As a Ghanaian travel and tour company, we
              combine deep local knowledge with personalized service and
              international standards to create memorable journeys across Ghana,
              Africa, and beyond. Whether it is a cultural adventure, family
              vacation, honeymoon, business trip, or group tour, we tailor every
              experience to your interests, schedule, and budget.
            </p>
            <p className="text-[17px] leading-relaxed text-ink/85">
              We are committed to making every journey smooth, safe, comfortable,
              and valuable. From carefully selected accommodations and
              transportation to authentic local experiences, our team takes care of
              the details so you can focus on enjoying your trip. With genuine
              Ghanaian hospitality at the heart of our service, we treat every
              traveler like family and strive to create experiences and stories
              you&apos;ll remember for years to come.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-lg">
          <AboutLocationSlides />
        </div>
        <div>
          <p className="script text-2xl text-crimson">Location</p>
          <h2 className="display mt-2 text-3xl text-burgundy">{brand.address}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/85">
            The desk is in {brand.address}. Write, call, or WhatsApp. We reply
            within two business days. Urgent travel dates move faster on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/travel"
              className="rounded bg-burgundy px-5 py-3 text-sm font-semibold text-white"
            >
              Book now
            </Link>
            <Link
              href="/contact"
              className="rounded ring-1 ring-burgundy px-5 py-3 text-sm font-semibold text-burgundy"
            >
              Write to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
