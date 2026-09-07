import { imageSrc, mediaUrl } from "@kincompass/shared";

export function asset(src: string | { linkUrl?: string } | undefined) {
  return mediaUrl(imageSrc(src), process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000");
}
