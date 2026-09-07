export function parseCustomExperienceFields(body: Record<string, unknown>) {
  const tourName = String(body.tourName ?? body.name ?? "").trim();
  const tourPrice = Number(body.tourPrice ?? body.price);
  const tourDuration = String(body.tourDuration ?? body.duration ?? "").trim();
  const active = body.active === "on" || body.active === "true" || body.active === true;

  if (!tourName) throw new Error("Tour name is required");
  if (!Number.isFinite(tourPrice) || tourPrice < 0) throw new Error("Tour price is required");
  if (!tourDuration) throw new Error("Tour duration is required");

  return {
    tourName,
    tourDuration,
    tourPrice,
    active,
  };
}
