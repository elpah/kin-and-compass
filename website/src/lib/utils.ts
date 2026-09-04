export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(amount: number, currency: "USD" | "GHS" = "USD") {
  const symbol = currency === "GHS" ? "GH₵" : "$";
  const whole = Math.abs(amount - Math.round(amount)) < 0.005;
  const raw = whole ? String(Math.round(amount)) : amount.toFixed(2);
  const [intPart, dec] = raw.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${symbol}${grouped}.${dec}` : `${symbol}${grouped}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
