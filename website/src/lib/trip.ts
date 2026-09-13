import type { CustomExperience, SpecialTour, SpecialTourCategory } from "@kincompass/shared";

export function specialTourAsExperience(tour: SpecialTour): CustomExperience {
  return {
    tourId: tour.tourId,
    tourName: tour.tourName,
    tourDescription: tour.tourDescription,
    tourDuration: tour.tourDuration,
    tourPrice: tour.tourPrice,
    tourImage: tour.tourImage,
    active: tour.active,
    deleted: tour.deleted,
    createdAt: tour.createdAt,
  };
}

export function pulseCategoryAsTour(category: SpecialTourCategory): SpecialTour {
  const images = category.images?.length ? category.images : category.cover ? [category.cover] : [];
  return {
    tourId: category.slug,
    tourName: category.label,
    tourDescription: category.line,
    tourDuration: category.tourDuration || "1 Day",
    tourPrice: Number(category.tourPrice ?? 0),
    categorySlug: category.slug,
    images,
    tourImage: images[0] ?? { linkUrl: "", publicId: "" },
    active: true,
    createdAt: category.createdAt,
  };
}

export function mergeTripCatalog(experiences: CustomExperience[], specialTours: SpecialTour[]) {
  const specials = specialTours.map(specialTourAsExperience);
  const seen = new Set(specials.map((item) => item.tourId));
  const catalog = [...specials, ...experiences.filter((item) => !seen.has(item.tourId))];
  return catalog.sort((a, b) => {
    const left = a.createdAt ? Date.parse(a.createdAt) : 0;
    const right = b.createdAt ? Date.parse(b.createdAt) : 0;
    return right - left;
  });
}
