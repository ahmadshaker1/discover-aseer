export function normalizeMapsUrl(
  value: string | null | undefined,
  title: string,
): string {
  const clean = (value || "").trim();
  if (clean) return clean;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;
}

export function normalizeText(value: string | null | undefined, fallback: string): string {
  const clean = (value || "").trim();
  return clean || fallback;
}
