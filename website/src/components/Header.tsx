"use client";

import { brand, nav } from "@/data/site";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overHero || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-cream/95 shadow-[0_1px_0_#ede4df] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 shrink-0">
          <span
            className={cn(
              "relative overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-burgundy/10",
              solid ? "h-12 w-12" : "h-12 w-12",
            )}
          >
            <Image
              src="/logo.jpeg"
              alt={brand.name}
              fill
              className="object-cover object-top scale-110"
              sizes="48px"
              priority
            />
          </span>
          <span className="leading-none">
            <span
              className={cn(
                "block text-[11px] font-extrabold tracking-[0.18em] uppercase",
                solid ? "text-burgundy" : "text-white",
              )}
            >
              Kin and Compass
            </span>
            <span
              className={cn(
                "script text-[15px] leading-none",
                solid ? "text-crimson" : "text-rose-200",
              )}
            >
              {brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors",
                  solid
                    ? active
                      ? "text-crimson"
                      : "text-ink/80 hover:text-burgundy"
                    : active
                      ? "text-white"
                      : "text-white/80 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/account"
            className={cn(
              "hidden sm:inline text-[13px] font-semibold",
              solid ? "text-ink/80 hover:text-burgundy" : "text-white/85 hover:text-white",
            )}
          >
            {user ? user.name.split(" ")[0] : "Account"}
          </Link>
          <Link
            href="/cart"
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded",
              solid ? "bg-burgundy text-white" : "bg-white/15 text-white ring-1 ring-white/30",
            )}
            aria-label="Shopping cart"
          >
            <CartIcon />
            {mounted && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-crimson px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded lg:hidden",
              solid ? "text-burgundy" : "text-white",
            )}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sand bg-cream px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-3 text-sm font-semibold text-burgundy hover:bg-sand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-3 text-sm font-semibold text-burgundy hover:bg-sand"
            >
              Account
            </Link>
            <Link
              href="/travel/custom"
              onClick={() => setOpen(false)}
              className="mt-2 rounded bg-burgundy px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Design Custom Trip
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1.5 9h-12L5 4H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
