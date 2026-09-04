import { brand, nav } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="bg-burgundy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full bg-white">
              <Image src="/logo.jpeg" alt="" fill className="object-cover object-top scale-110" />
            </span>
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] uppercase">
                {brand.name}
              </p>
              <p className="script text-rose text-lg leading-none">{brand.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Travel to Africa, learn about Africa, shop African makers, give back in
            Ghana, and explore legitimate opportunity - through one trusted house.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href="https://instagram.com" label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://tiktok.com" label="TikTok">
              <TikTokIcon />
            </SocialLink>
            <SocialLink
              href={`https://wa.me/${brand.whatsapp}`}
              label="WhatsApp"
            >
              <WhatsAppIcon />
            </SocialLink>
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            House
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/charity/trust" className="hover:text-white">
                How gifts are used
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            Visit
          </p>
          <p className="mt-4 text-sm text-white/80">{brand.address}</p>
          <p className="mt-2 text-sm">
            <a href={`mailto:${brand.email}`} className="hover:text-rose">
              {brand.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-rose">
              {brand.phone}
            </a>
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex h-11 items-center rounded bg-crimson px-5 text-sm font-semibold text-white hover:bg-rose"
          >
            Contact us
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center text-[11px] text-white/45 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} {brand.legal}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/45">
          Designed and Developed by{" "}
          <a
            href="https://paruah.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white/70 underline-offset-2 hover:text-white hover:underline"
          >
            Paruah Systems
          </a>
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20 hover:text-rose"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.2 3h2.3c.2 1.9 1.3 3.3 3.3 3.6v2.3c-1.2 0-2.3-.4-3.3-1v6.8c0 3.4-2.6 5.8-6.1 5.8S4.3 18.1 4.3 14.7c0-3.3 2.6-5.7 6-5.8v2.5c-1.8.1-3.2 1.5-3.2 3.3 0 1.9 1.5 3.4 3.4 3.4s3.3-1.5 3.3-3.4V3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.1 17.2L2 22l4.9-1.1A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.7.8-2.8-.2-.3A9 9 0 1 1 12 20.5zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4 15 15 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}
