"use client";

import { adminNav, adminSettings } from "@/data/nav";
import { cn } from "@/lib/cn";
import { logout, me } from "@/lib/api";
import type { AdminUser } from "@kincompass/shared";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser>({ name: "Preview", email: "admin@kinandcompass.com" });
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      me()
        .then((data) => {
          if (cancelled) return;
          setUser(data.user);
          setSignedIn(true);
        })
        .catch(() => {
          /* Desk is open without a session while the UI is still being designed. */
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-dvh bg-cream">
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col bg-burgundy-deep text-white transition-transform lg:w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-6">
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white">
            <Image src="/logo.png" alt="" fill className="object-cover object-top scale-110" sizes="44px" />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em]">Kin and Compass</p>
            <p className="script text-lg leading-none text-rose">Admin</p>
          </div>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {adminNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                  active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-3 py-4">
          <Link
            href={adminSettings.href}
            onClick={() => setOpen(false)}
            className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              pathname.startsWith(adminSettings.href)
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {adminSettings.label}
          </Link>
          <p className="mt-3 px-3 text-xs text-white/45">{user.name}</p>
          {signedIn && (
            <button
              type="button"
              className="mt-1 px-3 text-left text-sm font-semibold text-rose hover:text-white"
              onClick={async () => {
                await logout();
                setSignedIn(false);
                setUser({ name: "Preview", email: "admin@kinandcompass.com" });
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-sand bg-cream/95 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-burgundy"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">Admin</p>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
