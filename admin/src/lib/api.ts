import { mediaUrl, type AdminUser, type CustomExperience, type PackagedTour, type Product } from "@kincompass/shared";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function asset(src: string) {
  return mediaUrl(src, API_URL);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
  });
  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`);
  }
  return data;
}

export function listProducts() {
  return request<{ products: Product[] }>("/products");
}

export function getProduct(slug: string) {
  return request<{ product: Product }>(`/products/${slug}`);
}

export function createProduct(form: FormData) {
  return request<{ product: Product }>("/products", { method: "POST", body: form });
}

export function updateProduct(slug: string, form: FormData) {
  return request<{ product: Product }>(`/products/${slug}`, { method: "PUT", body: form });
}

export function deleteProduct(slug: string) {
  return request<{ ok: boolean }>(`/products/${slug}`, { method: "DELETE" });
}

export function login(email: string, password: string) {
  return request<{ user: AdminUser }>("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return request<{ ok: boolean }>("/admin/logout", { method: "POST" });
}

export function me() {
  return request<{ user: AdminUser }>("/admin/me");
}

export function listExperiences() {
  return request<{ experiences: CustomExperience[] }>("/experiences");
}

export function getExperience(slug: string) {
  return request<{ experience: CustomExperience }>(`/experiences/${slug}`);
}

export function createExperience(form: FormData) {
  return request<{ experience: CustomExperience }>("/experiences", { method: "POST", body: form });
}

export function updateExperience(slug: string, form: FormData) {
  return request<{ experience: CustomExperience }>(`/experiences/${slug}`, { method: "PUT", body: form });
}

export function deleteExperience(slug: string) {
  return request<{ ok: boolean }>(`/experiences/${slug}`, { method: "DELETE" });
}

export function listTours() {
  return request<{ tours: PackagedTour[] }>("/tours");
}

export function getTour(slug: string) {
  return request<{ tour: PackagedTour }>(`/tours/${slug}`);
}

export function createTour(form: FormData) {
  return request<{ tour: PackagedTour }>("/tours", { method: "POST", body: form });
}

export function updateTour(slug: string, form: FormData) {
  return request<{ tour: PackagedTour }>(`/tours/${slug}`, { method: "PUT", body: form });
}

export function deleteTour(slug: string) {
  return request<{ ok: boolean }>(`/tours/${slug}`, { method: "DELETE" });
}
