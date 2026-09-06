import { slugify } from "@kincompass/shared";

export function parsePackagedTourFields(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const duration = String(body.duration ?? "").trim();
  const price = Number(body.price);
  const active = body.active === "on" || body.active === "true" || body.active === true;
  const slugInput = String(body.slug ?? "").trim();
  const experienceSlugs = String(body.experienceSlugs ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!name) throw new Error("Name is required");
  if (!description) throw new Error("Description is required");
  if (!duration) throw new Error("Duration is required");
  if (!Number.isFinite(price) || price < 0) throw new Error("Price is required");
  if (!experienceSlugs.length) throw new Error("Select at least one custom trip");

  return {
    name,
    slug: slugify(slugInput || name),
    description,
    duration,
    price,
    experienceSlugs,
    active,
  };
}
