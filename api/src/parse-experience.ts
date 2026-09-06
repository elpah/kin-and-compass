import { slugify } from "@kincompass/shared";

export function parseCustomExperienceFields(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const price = Number(body.price);
  const duration = String(body.duration ?? "").trim();
  const description = String(body.description ?? "").trim();
  const active = body.active === "on" || body.active === "true" || body.active === true;
  const slugInput = String(body.slug ?? "").trim();

  if (!name) throw new Error("Name is required");
  if (!Number.isFinite(price) || price < 0) throw new Error("Price is required");
  if (!duration) throw new Error("Duration is required");
  if (!description) throw new Error("Description is required");

  return {
    name,
    slug: slugify(slugInput || name),
    price,
    duration,
    description,
    active,
  };
}
