import { covers } from "@/assets/covers";
import { PageHero } from "@/components/PageHero";
import { brand, pillars } from "@/data/site";
import Image from "next/image";
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

      <section className="border-y border-sand bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson">
            One country
          </p>
          <h2 className="display mt-2 text-3xl text-burgundy sm:text-4xl">
            Four ways to connect
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-cream ring-1 ring-sand hover:ring-crimson"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="script text-lg text-rose">{p.kicker}</p>
                  <h3 className="display text-2xl text-burgundy">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-lg">
          <Image src={covers.extra} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="script text-2xl text-crimson">Where we sit</p>
          <h2 className="display mt-2 text-3xl text-burgundy">Osu, Accra</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/85">
            The desk is in {brand.address}. Write, call, or WhatsApp. We reply
            within two business days. Urgent travel dates move faster on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/travel"
              className="rounded bg-burgundy px-5 py-3 text-sm font-semibold text-white"
            >
              Visit Ghana
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
