export function parseSpecialTourFields(body: Record<string, unknown>) {
  const tourName = String(body.tourName ?? body.name ?? "").trim();
  const tourDescription = String(body.tourDescription ?? body.description ?? "").trim();
  const tourPrice = Number(body.tourPrice ?? body.price);
  const tourDuration = String(body.tourDuration ?? body.duration ?? "").trim();
  const categorySlug = String(body.categorySlug ?? body.category ?? "").trim();
  const active = body.active === "on" || body.active === "true" || body.active === true;

  if (!tourName) throw new Error("Tour name is required");
  if (!tourDescription) throw new Error("Tour description is required");
  if (!Number.isFinite(tourPrice) || tourPrice < 0) throw new Error("Tour price is required");
  if (!tourDuration) throw new Error("Tour duration is required");
  if (!categorySlug) throw new Error("Category is required");

  return {
    tourName,
    tourDescription,
    tourDuration,
    tourPrice,
    categorySlug,
    active,
  };
}

export function parseKeepImages(body: Record<string, unknown>) {
  const raw = body.keepImages;
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (typeof item === "string") return { linkUrl: item, publicId: "" };
        if (item && typeof item === "object") {
          const row = item as { linkUrl?: string; publicId?: string };
          return { linkUrl: String(row.linkUrl ?? ""), publicId: String(row.publicId ?? "") };
        }
        return { linkUrl: "", publicId: "" };
      })
      .filter((item) => item.linkUrl);
  } catch {
    return [];
  }
}
