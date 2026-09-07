export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function mediaUrl(src: string, apiUrl: string) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = apiUrl.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

export function imageSrc(value: string | { linkUrl?: string } | undefined | null) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.linkUrl ?? "";
}
