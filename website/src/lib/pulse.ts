import { visitCategories } from "@/data/visitGallery";
import { imageSrc } from "@kincompass/shared";
import type { SpecialTourCategory } from "@kincompass/shared";

export type PulseTab = {
  slug: string;
  label: string;
  line: string;
  images: string[];
};

function fallbackLine(slug: string) {
  return visitCategories.find((item) => item.id === slug)?.line ?? "";
}

function uniqueUrls(urls: string[]) {
  const seen = new Set<string>();
  const next: string[] = [];
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    next.push(url);
  }
  return next;
}

export function buildPulseTabs(categories: SpecialTourCategory[]): PulseTab[] {
  return categories
    .map((category) => {
      const images = uniqueUrls(
        (category.images?.length ? category.images : category.cover ? [category.cover] : []).map((image) =>
          imageSrc(image),
        ),
      );
      return {
        slug: category.slug,
        label: category.label,
        line: category.line || fallbackLine(category.slug),
        images,
      };
    })
    .filter((tab) => tab.images.length > 0);
}
