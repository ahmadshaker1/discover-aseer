import type { Landmark } from "@/components/landmarks/data";

export type AboutHighlightId = "h-1" | "h-2" | "h-3" | "h-4";

const PREFERRED_SLUG: Record<AboutHighlightId, string> = {
  "h-1": "al-soudah",
  "h-2": "rijal-almaa",
  "h-3": "al-qahma",
  "h-4": "tanomah",
};

const MATCH_PATTERN: Record<AboutHighlightId, RegExp> = {
  "h-1": /سودة|soudah|al-soudah/i,
  "h-2": /رجال|rijal|almaa/i,
  "h-3": /قحمة|qahma|coast|ساحل/i,
  "h-4": /تنومة|tanomah|forest|غابات/i,
};

function haystack(landmark: Landmark): string {
  return `${landmark.slug} ${landmark.title} ${landmark.location} ${landmark.area} ${landmark.city}`;
}

export function resolveAboutHighlightLandmark(
  cardId: AboutHighlightId,
  landmarks: Landmark[],
): Landmark | null {
  const preferred = PREFERRED_SLUG[cardId];
  const exact = landmarks.find((row) => row.slug === preferred);
  if (exact) return exact;

  const partial = landmarks.find(
    (row) => row.slug.includes(preferred) || preferred.includes(row.slug),
  );
  if (partial) return partial;

  const pattern = MATCH_PATTERN[cardId];
  return landmarks.find((row) => pattern.test(haystack(row))) ?? null;
}
