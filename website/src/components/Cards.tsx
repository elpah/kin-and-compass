import { formatMoney } from "@/lib/utils";
import type { Opportunity, Tour } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/travel/${tour.slug}`} className="group block overflow-hidden rounded-lg bg-white ring-1 ring-sand">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded bg-burgundy/90 px-3 py-1 text-[11px] font-semibold text-white">
          {tour.duration} · from {formatMoney(tour.priceFrom)}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-crimson">
          {tour.region} · {tour.type}
        </p>
        <h3 className="display mt-1 text-2xl text-burgundy">{tour.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{tour.summary}</p>
      </div>
    </Link>
  );
}

export function OpportunityCard({
  item,
  index,
}: {
  item: Opportunity;
  index?: number;
}) {
  return (
    <Link
      href={`/invest/${item.slug}`}
      className="group relative block min-h-[320px] overflow-hidden rounded-lg"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        {index != null && (
          <p className="script text-2xl text-rose">{String(index + 1).padStart(2, "0")}</p>
        )}
        <h3 className="display mt-1 text-3xl text-white sm:text-4xl">{item.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/80">{item.hook}</p>
      </div>
    </Link>
  );
}
