export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function mediaUrl(src, apiUrl) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = apiUrl.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

export function imageSrc(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.linkUrl ?? "";
}
