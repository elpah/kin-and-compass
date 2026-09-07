import { TourForm } from "@/components/TourForm";
import Link from "next/link";

export default function NewTourPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted">
        <Link href="/visit-ghana" className="hover:text-burgundy">
          Tours
        </Link>{" "}
        / New
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">Add a tour</h1>
      <p className="mt-2 text-sm text-muted">Select custom trips. The package price is their total.</p>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <TourForm />
      </div>
    </div>
  );
}
