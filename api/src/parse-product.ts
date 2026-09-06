import { productCategories, slugify, type ProductCategory } from "@kincompass/shared";

export function parseProductFields(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const price = Number(body.price);
  const compareRaw = String(body.compareAt ?? "").trim();
  const category = String(body.category ?? "") as ProductCategory;
  const vendor = String(body.vendor ?? "").trim();
  const country = String(body.country ?? "Ghana").trim();
  const description = String(body.description ?? "").trim();
  const details = String(body.details ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const stock = Number(body.stock ?? 0);
  const featured = body.featured === "on" || body.featured === "true" || body.featured === true;
  const slugInput = String(body.slug ?? "").trim();

  if (!name) throw new Error("Name is required");
  if (!Number.isFinite(price) || price < 0) throw new Error("Price is required");
  if (!productCategories.includes(category)) throw new Error("Choose a valid category");
  if (!vendor) throw new Error("Vendor is required");
  if (!description) throw new Error("Description is required");

  return {
    name,
    slug: slugify(slugInput || name),
    price,
    compareAt: compareRaw ? Number(compareRaw) : undefined,
    category,
    vendor,
    country: country || "Ghana",
    description,
    details,
    stock: Number.isFinite(stock) ? stock : 0,
    featured,
  };
}
