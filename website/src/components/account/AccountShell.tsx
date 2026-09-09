"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/settings", label: "Settings" },
];

export function AccountShell({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <p className="px-4 py-32 text-center text-sm text-muted">Loading your account...</p>;
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-sand pb-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-lg font-semibold tracking-wide text-white">
            {initials || "K"}
          </span>
          <div>
            <p className="script text-xl text-crimson">Your house</p>
            <h1 className="display text-3xl text-burgundy sm:text-4xl">{user.name}</h1>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="h-11 rounded-lg px-4 text-sm font-semibold text-burgundy ring-1 ring-sand hover:bg-white"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
          {links.map((item) => {
            const active =
              item.href === "/account" ? pathname === "/account" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold",
                  active ? "bg-burgundy text-white" : "text-burgundy hover:bg-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
