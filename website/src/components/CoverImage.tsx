import { coverSrcSet, cloudinaryUrl } from "@/lib/cloudinary";

export function CoverImage({
  src,
  priority = false,
  className = "absolute inset-0 h-full w-full object-cover",
}: {
  src: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // Native img: one Cloudinary request instead of Next srcset up to 1920px.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cloudinaryUrl(src, 960)}
      srcSet={coverSrcSet(src)}
      sizes="100vw"
      alt=""
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
      className={className}
    />
  );
}
