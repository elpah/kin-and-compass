import { imageSrc, mediaUrl, type AdminUser, type CustomExperience, type PackagedTour, type Product } from "@kincompass/shared";
import { getSession } from "next-auth/react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function asset(src: string | { linkUrl?: string } | undefined) {
  return mediaUrl(imageSrc(src), API_URL);
}

async function authHeaders() {
  const session = await getSession();
  if (!session?.accessToken) return {};
  return { Authorization: `Bearer ${session.accessToken}` };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const auth = await authHeaders();
  if (auth.Authorization) headers.set("Authorization", auth.Authorization);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
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

export function me() {
  return request<{ user: AdminUser }>("/admin/me");
}

export function changePassword(currentPassword: string, newPassword: string) {
  return request<{ ok: boolean }>("/auth/password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export function listExperiences(view: "active" | "deleted" | "all" = "active") {
  return request<{ experiences: CustomExperience[] }>(`/experiences?view=${view}`);
}

export function getExperience(tourId: string) {
  return request<{ experience: CustomExperience }>(`/experiences/${tourId}`);
}

export function createExperience(form: FormData) {
  return request<{ experience: CustomExperience }>("/experiences", { method: "POST", body: form });
}

export function updateExperience(tourId: string, form: FormData) {
  return request<{ experience: CustomExperience }>(`/experiences/${tourId}`, { method: "PUT", body: form });
}

export function restoreExperience(tourId: string) {
  return request<{ experience: CustomExperience }>(`/experiences/${tourId}/restore`, { method: "POST" });
}

export function deleteExperience(tourId: string, permanent = false) {
  const query = permanent ? "?permanent=true" : "";
  return request<{ ok: boolean }>(`/experiences/${tourId}${query}`, { method: "DELETE" });
}

export function listTours(view: "active" | "deleted" | "all" = "active") {
  return request<{ tours: PackagedTour[] }>(`/tours?view=${view}`);
}

export function getTour(packagedTourId: string) {
  return request<{ tour: PackagedTour }>(`/tours/${packagedTourId}`);
}

export function createTour(form: FormData) {
  return request<{ tour: PackagedTour }>("/tours", { method: "POST", body: form });
}

export function updateTour(packagedTourId: string, form: FormData) {
  return request<{ tour: PackagedTour }>(`/tours/${packagedTourId}`, { method: "PUT", body: form });
}

export function restoreTour(packagedTourId: string) {
  return request<{ tour: PackagedTour }>(`/tours/${packagedTourId}/restore`, { method: "POST" });
}

export function deleteTour(packagedTourId: string, permanent = false) {
  const query = permanent ? "?permanent=true" : "";
  return request<{ ok: boolean }>(`/tours/${packagedTourId}${query}`, { method: "DELETE" });
}
