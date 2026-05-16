/** Maps film landscape cards → attractions listing filters (`?terrain=`). */

export const FILM_LANDSCAPE_FILTER_IDS = [
  "mountains",
  "plains",
  "beaches",
  "desert",
] as const;

export type FilmLandscapeFilterId = (typeof FILM_LANDSCAPE_FILTER_IDS)[number];

export const FILM_LANDSCAPE_LABEL_KEYS: Record<FilmLandscapeFilterId, string> = {
  mountains: "landscapes.mountains",
  plains: "landscapes.plains",
  beaches: "landscapes.beaches",
  desert: "landscapes.desert",
};

/** Interest tag ids pre-selected on `/attractions?terrain=…` */
export const TERRAIN_TO_INTERESTS: Record<FilmLandscapeFilterId, string[]> = {
  mountains: ["nature", "adventure"],
  plains: ["nature", "culture"],
  beaches: ["nature", "relaxation"],
  desert: ["adventure", "nature"],
};

const TERRAIN_KEYWORDS: Record<FilmLandscapeFilterId, RegExp> = {
  mountains: /جبل|جبال|mountain|سودة|قمم|عليل|ارتفاع/i,
  plains: /سهل|سهول|plain|وادي|مزارع/i,
  beaches: /شاطئ|شواطئ|بحر|برك|beach|ساحل/i,
  desert: /صحر|رمل|desert|كثيب/i,
};

const AR_TITLE_TO_FILTER: Record<string, FilmLandscapeFilterId> = {
  الجبال: "mountains",
  السهول: "plains",
  الشواطئ: "beaches",
  الصحراء: "desert",
};

export function resolveFilmLandscapeFilterId(
  value: string | null | undefined,
): FilmLandscapeFilterId | null {
  const clean = (value || "").trim().toLowerCase();
  if (!clean) return null;

  if ((FILM_LANDSCAPE_FILTER_IDS as readonly string[]).includes(clean)) {
    return clean as FilmLandscapeFilterId;
  }

  const fromAr = AR_TITLE_TO_FILTER[value?.trim() || ""];
  if (fromAr) return fromAr;

  if (/mountain|جبال|جبل/.test(clean)) return "mountains";
  if (/plain|سهل|سهول/.test(clean)) return "plains";
  if (/beach|شاطئ|شواطئ|بحر/.test(clean)) return "beaches";
  if (/desert|صحر/.test(clean)) return "desert";

  return null;
}

export function parseAttractionsTerrainParam(
  terrain: string | null | undefined,
): FilmLandscapeFilterId | null {
  return resolveFilmLandscapeFilterId(terrain);
}

export function attractionMatchesTerrain(
  attraction: {
    title: string;
    description: string;
    area: string;
    location: string;
    interestTags?: string[];
  },
  terrain: FilmLandscapeFilterId,
): boolean {
  const interests = TERRAIN_TO_INTERESTS[terrain] ?? [];
  const tags = attraction.interestTags ?? [];
  if (interests.some((id) => tags.includes(id))) return true;

  const haystack = `${attraction.title} ${attraction.description} ${attraction.area} ${attraction.location}`;
  return TERRAIN_KEYWORDS[terrain].test(haystack);
}
