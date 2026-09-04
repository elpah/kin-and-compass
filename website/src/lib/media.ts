import { mediaUrl } from "@kincompass/shared";

export function asset(src: string) {
  return mediaUrl(src, process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000");
}
