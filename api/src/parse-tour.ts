export function parsePackagedTourFields(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const duration = String(body.duration ?? "").trim();
  const active = body.active === "on" || body.active === "true" || body.active === true;
  const tourIds = String(body.tourIds ?? body.experienceSlugs ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!name) throw new Error("Name is required");
  if (!description) throw new Error("Description is required");
  if (!duration) throw new Error("Duration is required");
  if (!tourIds.length) throw new Error("Select at least one custom trip");

  return {
    name,
    description,
    duration,
    tourIds,
    active,
  };
}
