export function inquiryLabel(kind: string) {
  if (kind.startsWith("tour:")) return "Tour request";
  if (kind.startsWith("invest:")) return "Investment inquiry";
  const labels: Record<string, string> = {
    contact: "Contact message",
    "custom-trip": "Custom trip request",
    invest: "Investment inquiry",
    "charity-volunteer": "Volunteer inquiry",
    "charity-partner": "Partnership inquiry",
    "charity-fundraise": "Fundraising inquiry",
  };
  return labels[kind] ?? "Inquiry";
}
