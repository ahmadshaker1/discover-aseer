/** Normalize Arabic/Latin search text for forgiving map queries. */
export function normalizeMapSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/ـ/g, "")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinAtMost(a: string, b: string, max: number): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return false;
  if (la === 0 || lb === 0) return Math.max(la, lb) <= max;

  let prev = Array.from({ length: lb + 1 }, (_, i) => i);
  for (let i = 1; i <= la; i++) {
    const cur = new Array<number>(lb + 1);
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return false;
    prev = cur;
  }
  return prev[lb] <= max;
}

/** Token matches if contained in haystack, or ≈1 edit from a haystack word. */
function tokenMatches(haystack: string, token: string): boolean {
  if (!token) return true;
  if (haystack.includes(token)) return true;

  // Prefix / partial word: "abha" matches "abhabuilding", "cafe" matches "cafes"
  const words = haystack.split(" ").filter(Boolean);
  for (const word of words) {
    if (word.includes(token) || token.includes(word)) return true;
    const maxEdits = token.length >= 5 ? 2 : token.length >= 3 ? 1 : 0;
    if (maxEdits > 0 && levenshteinAtMost(word, token, maxEdits)) return true;
  }
  return false;
}

export interface MapSearchablePlace {
  title: string;
  description: string;
  city: string;
  category?: string;
  categoryAr?: string;
  categoryEn?: string;
  tag?: string;
}

/**
 * Soft search: every query token must match somewhere via contains / light fuzzy.
 * Empty query matches all.
 */
export function placeMatchesMapSearch(
  place: MapSearchablePlace,
  rawQuery: string,
): boolean {
  const query = normalizeMapSearchText(rawQuery);
  if (!query) return true;

  const haystack = normalizeMapSearchText(
    [
      place.title,
      place.description,
      place.city,
      place.category,
      place.categoryAr,
      place.categoryEn,
      place.tag,
    ]
      .filter(Boolean)
      .join(" "),
  );

  if (haystack.includes(query)) return true;

  const tokens = query.split(" ").filter(Boolean);
  return tokens.every((token) => tokenMatches(haystack, token));
}
