import type { CustomExperience, PackagedTour, Product, SpecialTour, SpecialTourCategory } from "@kincompass/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`API ${path} failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function listProducts() {
  try {
    const data = await getJson<{ products: Product[] }>("/products");
    return data.products ?? [];
  } catch {
    return [];
  }
}

export async function listFeaturedProducts(limit = 4) {
  try {
    const data = await getJson<{ products: Product[] }>(`/products/featured?limit=${limit}`);
    return data.products ?? [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const data = await getJson<{ product: Product; related: Product[] }>(`/products/${slug}`);
    if (data.product) return data;
  } catch {
    /* missing product */
  }
  return null;
}

export function apiUrl() {
  return API_URL;
}

export async function listActiveExperiences() {
  try {
    const data = await getJson<{ experiences: CustomExperience[] }>("/experiences?active=true");
    return (data.experiences ?? []).filter((item) => item.active !== false);
  } catch {
    return [];
  }
}

export async function listActivePackagedTours() {
  try {
    const data = await getJson<{ tours: PackagedTour[] }>("/tours?active=true");
    return (data.tours ?? []).filter((item) => item.active !== false);
  } catch {
    return [];
  }
}

export async function getPackagedTour(id: string) {
  try {
    return await getJson<{ tour: PackagedTour; experiences: CustomExperience[] }>(`/tours/${id}`);
  } catch {
    return null;
  }
}

export async function listSpecialTourCategories() {
  try {
    const data = await getJson<{ categories: SpecialTourCategory[] }>("/special-tour-categories");
    return data.categories ?? [];
  } catch {
    return [];
  }
}

export async function listActiveSpecialTours() {
  try {
    const data = await getJson<{ tours: SpecialTour[] }>("/special-tours?active=true");
    return (data.tours ?? []).filter((item) => item.active !== false);
  } catch {
    return [];
  }
}
