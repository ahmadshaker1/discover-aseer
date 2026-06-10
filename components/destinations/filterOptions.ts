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

/** Landscape keys used on About Aseer / film pages (same card order). */
export const LANDSCAPE_TO_DESTINATION_FILTER = {
  mountains: "mountain-peaks",
  plains: "tihama-plains",
  beaches: "coastal-beaches",
  desert: "desert-nature",
} as const satisfies Record<string, DestinationFilterId>;

/** About Aseer highlight cards → `/destinations?filter=` values (h1–h4). */
export const ABOUT_ASEER_HIGHLIGHT_DESTINATION_FILTERS: DestinationFilterId[] = [
  LANDSCAPE_TO_DESTINATION_FILTER.mountains,
  LANDSCAPE_TO_DESTINATION_FILTER.plains,
  LANDSCAPE_TO_DESTINATION_FILTER.beaches,
  LANDSCAPE_TO_DESTINATION_FILTER.desert,
];

/** Landscape card images (mountains → desert), shared by About Aseer and film pages. */
export const LANDSCAPE_HIGHLIGHT_IMAGES = [
  "/assets/aboutAseer/mountains.JPEG",
  "/assets/aboutAseer/plains.jpeg",
  "/assets/aboutAseer/beaches.jpeg",
  "/assets/aboutAseer/desert.JPEG",
] as const;

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

/** Parse `?filter=` on `/destinations` (filter id, landscape key, or CMS Arabic label). */
/** Film / About Aseer landscape key → destination listing `?filter=` value. */
export function landscapeKeyToDestinationFilter(
  landscapeKey: string | null | undefined,
): DestinationFilterId | null {
  const clean = (landscapeKey || "").trim().toLowerCase();
  if (!clean || !(clean in LANDSCAPE_TO_DESTINATION_FILTER)) return null;
  return LANDSCAPE_TO_DESTINATION_FILTER[
    clean as keyof typeof LANDSCAPE_TO_DESTINATION_FILTER
  ];
}

export function parseDestinationsFilterParam(
  filter: string | null | undefined,
): DestinationFilterId | null {
  const clean = (filter || "").trim().toLowerCase();
  if (!clean) return null;

  if (DESTINATION_FILTER_DEFS.some((d) => d.id === clean)) {
    return clean as DestinationFilterId;
  }

  if (clean in LANDSCAPE_TO_DESTINATION_FILTER) {
    return LANDSCAPE_TO_DESTINATION_FILTER[
      clean as keyof typeof LANDSCAPE_TO_DESTINATION_FILTER
    ];
  }

  return resolveDestinationFilterId(filter) ?? null;
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
