import Link from "next/link";

export function VisitGhanaTabs({ current }: { current: "tours" | "custom" }) {
  const tabs = [
    { href: "/visit-ghana", id: "tours" as const, label: "Packaged tours" },
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

export function VisitGhanaStatusTabs({
  baseHref,
  current,
}: {
  baseHref: string;
  current: "active" | "deleted";
}) {
  const tabs = [
    { id: "active" as const, label: "Active" },
    { id: "deleted" as const, label: "Deleted" },
  ];

  return (
    <div className="mt-4 flex w-full justify-between">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.id === "active" ? baseHref : `${baseHref}?status=${tab.id}`}
          className={`inline-flex h-12 w-[49%] items-center justify-center rounded-lg text-sm font-semibold ${
            current === tab.id ? "bg-burgundy text-white" : "bg-white text-muted ring-1 ring-sand hover:text-burgundy"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
