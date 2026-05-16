/**
 * Attractions detail + listing helpers.
 * CMS collection: `attractions` (fetched via `fetchLandmarks` in landmarks/data.ts).
 */

export type { Landmark as Attraction } from "@/components/landmarks/data";

export {
  fetchLandmarks as fetchAttractions,
  getLandmarkBySlug as getAttractionBySlug,
  getRelatedLandmarks as getRelatedAttractions,
  normalizeLandmarkSlugParam as normalizeAttractionSlugParam,
  resolveLandmarkMapTarget as resolveAttractionMapTarget,
} from "@/components/landmarks/data";

import { fetchLandmarks } from "@/components/landmarks/data";

export async function fetchAttractionSlugs(): Promise<string[]> {
  const rows = await fetchLandmarks("ar");
  return rows.map((row) => row.slug).filter(Boolean);
}
