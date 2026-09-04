import { LessonCard } from "@/components/Cards";
import { LessonActions } from "@/components/LessonActions";
import { Quiz } from "@/components/Quiz";
import { getLesson, lessons } from "@/data/lessons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getLesson(slug)?.title ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const more = lessons.filter((l) => l.slug !== lesson.slug && l.topic === lesson.topic).slice(0, 3);

  return (
    <article>
      <div className="relative isolate min-h-[46vh]">
        <Image src={lesson.image} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/45" />
        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-32 sm:px-6">
          <p className="text-sm text-white/70">
            <Link href="/learning" className="hover:text-white">
              Learning
            </Link>{" "}
            / {lesson.topic}
          </p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-rose">
            {lesson.type} · {lesson.country} · {lesson.duration}
          </p>
          <h1 className="display mt-2 text-4xl text-white sm:text-5xl">{lesson.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-lg text-muted">{lesson.excerpt}</p>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/85">
          {lesson.content.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {lesson.type === "Video" && (
          <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-burgundy-deep">
            <iframe
              title={lesson.title}
              className="h-full w-full"
              src="https://www.youtube.com/embed/jNQXAC9IVRw"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {lesson.type === "Quiz" && <Quiz lessonSlug={lesson.slug} />}
        {lesson.download && (
          <a
            href="/learning-checklist.txt"
            download
            className="mt-8 inline-flex h-11 items-center rounded bg-sand px-5 text-sm font-semibold text-burgundy"
          >
            Download: {lesson.download}
          </a>
        )}
        <div className="mt-10">
          <LessonActions slug={lesson.slug} />
        </div>
        <p className="mt-8 text-sm text-muted">
          Planning a trip? See{" "}
          <Link href="/travel" className="font-semibold text-crimson">
            Visit Ghana
          </Link>{" "}
          or{" "}
          <Link href="/stores" className="font-semibold text-crimson">
            shop a field journal
          </Link>
          .
        </p>
      </div>
      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="display text-3xl text-burgundy">Continue in {lesson.topic}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {more.map((l) => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
