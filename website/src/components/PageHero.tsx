import { CoverImage } from "@/components/CoverImage";
import { isCloudinarySrc } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  text,
  image,
  children,
  compact,
  backHref,
  backLabel,
}: {
  kicker?: string;
  title: string;
  text?: string;
  image: string | StaticImageData;
  children?: ReactNode;
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", compact ? "min-h-[42vh]" : "min-h-[58vh]")}>
      {isCloudinarySrc(image) ? (
        <CoverImage src={image} priority />
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          placeholder="empty"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-ink/55 to-ink/25" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 sm:pb-16">
        {backHref && (
          <p className="mb-3 text-sm text-white/75">
            <Link href={backHref} className="font-semibold hover:text-white">
              {backLabel ?? "Back"}
            </Link>
          </p>
        )}
        {kicker && (
          <p className="script text-2xl text-rose sm:text-3xl">{kicker}</p>
        )}
        <h1 className="display mt-1 max-w-3xl text-4xl leading-tight text-white sm:text-6xl">
          {title}
        </h1>
        {text && (
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{text}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
