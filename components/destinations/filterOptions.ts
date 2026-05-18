import type { LabeledFilterOption } from "@/components/landmarks/filterOptions";

/** CMS `destination_filter` values — four categories only. */
export const DESTINATION_FILTER_DEFS = [
  {
    id: "desert-nature",
    ar: "الطبيعة الصحراوية",
    en: "Desert nature",
    aliases: ["الطبيعة ألصحروية"],
  },
  {
    id: "mountain-peaks",
    ar: "القمم الجبلية",
    en: "Mountain peaks",
  },
  {
    id: "coastal-beaches",
    ar: "الشواطئ الساحلية",
    en: "Coastal beaches",
  },
  {
    id: "tihama-plains",
    ar: "السهول التهامية",
    en: "Tihama plains",
  },
] as const;

export type DestinationFilterId = (typeof DESTINATION_FILTER_DEFS)[number]["id"];

function pickLocale(locale: string): "ar" | "en" {
  return locale === "en" ? "en" : "ar";
}

export function getDestinationFilterOptions(locale: string): LabeledFilterOption[] {
  const lang = pickLocale(locale);
  return DESTINATION_FILTER_DEFS.map((d) => ({ id: d.id, label: d[lang] }));
}

export function getDestinationFilterLabel(
  filterId: string,
  locale: string,
): string {
  const row = DESTINATION_FILTER_DEFS.find((d) => d.id === filterId);
  if (!row) return filterId;
  return pickLocale(locale) === "en" ? row.en : row.ar;
}

/** Map CMS Arabic `destination_filter` (and known typos) to a stable filter id. */
export function resolveDestinationFilterId(
  raw: string | null | undefined,
): DestinationFilterId | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;

  for (const def of DESTINATION_FILTER_DEFS) {
    if (trimmed === def.ar) return def.id;
    if ("aliases" in def && def.aliases.includes(trimmed)) return def.id;
  }

  return undefined;
}

export function destinationMatchesFilterId(
  destinationFilterId: string | undefined,
  destinationFilter: string,
  filterId: string | null,
): boolean {
  if (!filterId) return true;
  if (destinationFilterId) return destinationFilterId === filterId;
  const resolved = resolveDestinationFilterId(destinationFilter);
  return resolved === filterId;
}
