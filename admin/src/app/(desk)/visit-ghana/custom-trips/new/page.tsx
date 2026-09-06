import { ExperienceForm } from "@/components/ExperienceForm";
import Link from "next/link";

export default function NewExperiencePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-muted">
        <Link href="/visit-ghana/custom-trips" className="hover:text-burgundy">
          Custom trips
        </Link>{" "}
        / New
      </p>
      <h1 className="display mt-2 text-4xl text-burgundy">Add an experience</h1>
      <div className="mt-8 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
        <ExperienceForm />
      </div>
    </div>
  );
}
