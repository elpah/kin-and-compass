import { adminNav, adminSettings } from "@/data/nav";
import Link from "next/link";

export default function AdminHomePage() {
  const rooms = [...adminNav, adminSettings];

  return (
    <div>
      <p className="script text-2xl text-crimson">House tools</p>
      <h1 className="display mt-1 text-4xl text-burgundy sm:text-5xl">The desk</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Manage the store and Visit Ghana from here. More rooms can join this sidebar later.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg bg-white p-6 ring-1 ring-sand transition hover:ring-crimson"
          >
            <p className="script text-xl text-rose">{item.label}</p>
            <p className="display mt-1 text-3xl text-burgundy">Open</p>
            <p className="mt-2 text-sm text-muted">
              {item.href === "/store"
                ? "Products, stock, and the public catalogue."
                : item.href === "/visit-ghana"
                  ? "Tours and itineraries for Ghana."
                  : "House details and how this desk signs in."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
