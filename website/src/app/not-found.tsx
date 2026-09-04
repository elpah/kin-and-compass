import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <p className="script text-3xl text-crimson">Off the map</p>
      <h1 className="display mt-2 text-4xl text-burgundy">This page has not been drawn yet.</h1>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded bg-burgundy px-6 text-sm font-semibold text-white">
        Return home
      </Link>
    </div>
  );
}
