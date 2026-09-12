type LoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

const MAX_WIDTH = 1200;

function insertTransform(src: string, transform: string) {
  const marker = "/upload/";
  const at = src.indexOf(marker);
  if (at === -1) return src;
  const prefix = src.slice(0, at + marker.length);
  const rest = src.slice(at + marker.length);
  const first = rest.split("/")[0] ?? "";
  const versioned = /^v\d+$/.test(first);
  const alreadyTransformed = Boolean(first) && !versioned && !first.includes(".");
  if (alreadyTransformed) {
    if (/\bw_\d+/.test(first)) return src;
    return `${prefix}${first},${transform}${rest.slice(first.length)}`;
  }
  return `${prefix}${transform}/${rest}`;
}

export function cloudinaryLoader({ src, width, quality }: LoaderParams) {
  const w = Math.min(Math.max(1, Math.round(width)), MAX_WIDTH);
  const q = quality && quality < 45 ? String(quality) : "50";
  return insertTransform(src, `f_webp,q_${q},c_limit,w_${w}`);
}

export function cloudinaryUrl(src: string, width: number, quality?: number) {
  return cloudinaryLoader({ src, width, quality });
}

export function coverSrcSet(src: string) {
  return [640, 960, 1200].map((w) => `${cloudinaryUrl(src, w)} ${w}w`).join(", ");
}

export function isCloudinarySrc(src: unknown): src is string {
  return typeof src === "string" && src.includes("res.cloudinary.com");
}
