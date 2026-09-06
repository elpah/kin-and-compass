import Link from "next/link";

const tours = [
  { name: "Cape Coast Heritage", status: "Live", nights: "3 nights" },
  { name: "Accra City Culture", status: "Live", nights: "2 nights" },
  { name: "Volta Highlands", status: "Draft", nights: "4 nights" },
];

export default function VisitGhanaAdminPage() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script text-2xl text-crimson">Itineraries</p>
          <h1 className="display text-4xl text-burgundy">Visit Ghana</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Tours shown on the public site. Saving and publishing will be wired here later.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white"
        >
          Add tour
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Tile n="08" l="Public tours" />
        <Tile n="01" l="Custom requests" />
        <Tile n="03" l="Drafts" />
      </div>

      <div className="mt-10 overflow-hidden rounded-lg bg-white ring-1 ring-sand">
        <ul className="divide-y divide-sand">
          {tours.map((tour) => (
            <li key={tour.name} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold text-burgundy">{tour.name}</p>
                <p className="text-sm text-muted">{tour.nights}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    tour.status === "Live" ? "bg-burgundy text-white" : "bg-sand text-muted"
                  }`}
                >
                  {tour.status}
                </span>
                <Link href="/visit-ghana" className="text-sm font-semibold text-burgundy">
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Tile({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-lg bg-burgundy-deep p-6 text-white">
      <p className="display text-4xl text-rose">{n}</p>
      <p className="mt-1 text-sm text-white/70">{l}</p>
    </div>
  );
}
