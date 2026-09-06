import Link from "next/link";

export function VisitGhanaTabs({ current }: { current: "tours" | "custom" }) {
  const tabs = [
    { href: "/visit-ghana", id: "tours" as const, label: "Tours" },
    { href: "/visit-ghana/custom-trips", id: "custom" as const, label: "Custom trips" },
  ];

  return (
    <div className="mt-6 flex gap-2 border-b border-sand">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${
            current === tab.id
              ? "border-crimson text-burgundy"
              : "border-transparent text-muted hover:text-burgundy"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
