/** Localize filter facet labels on `/tour-guides` (English locale). */

import type { ApiTouristGuide } from "./types";

/**
 * Fixed specialization facets shown on the tour guides filter.
 * Order matches the product checklist (heritage → land → recreational → marine → aerial).
 */
export const FIXED_SPECIALIZATION_FILTERS = [
  {
    id: "تجارب وأنشطة تراثية وثقافية",
    en: "Heritage & cultural experiences",
  },
  {
    id: "تجارب وأنشطة برية",
    en: "Land & outdoor experiences",
  },
  {
    id: "سياحة الاستجمام",
    en: "Recreational tourism",
  },
  {
    id: "تجارب وأنشطة بحرية",
    en: "Marine experiences",
  },
  {
    id: "تجارب وأنشطة هوائية",
    en: "Aerial experiences",
  },
] as const;

export type FixedSpecializationFilterId =
  (typeof FIXED_SPECIALIZATION_FILTERS)[number]["id"];

/** Canonical Arabic specialization tokens → English labels. */
const SPEC_MAP: Record<string, string> = Object.fromEntries(
  FIXED_SPECIALIZATION_FILTERS.map((item) => [item.id, item.en]),
);

/** Legacy / portal-stored labels that should map onto the fixed filter ids. */
const SPEC_ALIASES: Record<string, FixedSpecializationFilterId> = {
  "تجارب وأنشطة تراثية وثقافية": "تجارب وأنشطة تراثية وثقافية",
  "متخصص في التجارب والأنشطة التراثية والثقافية":
    "تجارب وأنشطة تراثية وثقافية",
  "تجارب وأنشطة برية": "تجارب وأنشطة برية",
  "متخصص في التجارب والأنشطة البرية": "تجارب وأنشطة برية",
  "تجارب وأنشطة بحرية": "تجارب وأنشطة بحرية",
  "متخصص في التجارب والأنشطة البحرية": "تجارب وأنشطة بحرية",
  "تجارب وأنشطة هوائية": "تجارب وأنشطة هوائية",
  "متخصص في التجارب والأنشطة الهوائية": "تجارب وأنشطة هوائية",
  "سياحة الاستجمام": "سياحة الاستجمام",
  "متخصص في سياحة الاستجمام": "سياحة الاستجمام",
};

const GENDER_MAP: Record<string, string> = {
  ذكر: "Male",
  أنثى: "Female",
};

export function parseSpecializationTokens(
  raw: string | null | undefined,
): string[] {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.replace(/\s+/g, " ").replace(/[.,;]+$/u, "").trim())
    .filter(Boolean);
}

/**
 * Map a stored specialization token onto one of the fixed filter ids.
 * Unknown / "other" free-text values return null and are excluded from the filter.
 */
export function canonicalizeSpecializationToken(
  token: string,
): FixedSpecializationFilterId | null {
  const cleaned = token.replace(/\s+/g, " ").replace(/[.,;]+$/u, "").trim();
  if (!cleaned || cleaned === "أخرى" || cleaned.toLowerCase() === "other") {
    return null;
  }

  const direct = SPEC_ALIASES[cleaned];
  if (direct) return direct;

  const stripped = cleaned.replace(/^متخصص\s+في\s+/u, "").trim();
  if (SPEC_ALIASES[stripped]) return SPEC_ALIASES[stripped];

  const lower = stripped.toLowerCase();
  if (/تراث|ثقاف|heritage|cultural/.test(lower)) {
    return "تجارب وأنشطة تراثية وثقافية";
  }
  if (/بر(?:ي|ية)|land|outdoor|field|wilderness/.test(lower)) {
    return "تجارب وأنشطة برية";
  }
  if (/بحر|marine|sea/.test(lower)) {
    return "تجارب وأنشطة بحرية";
  }
  if (/هوائ|aerial/.test(lower)) {
    return "تجارب وأنشطة هوائية";
  }
  if (/استجمام|recreational|leisure/.test(lower)) {
    return "سياحة الاستجمام";
  }

  return null;
}

/** Canonical filter ids for a guide's raw specializations string. */
export function canonicalizeSpecializationTokens(
  raw: string | null | undefined,
): FixedSpecializationFilterId[] {
  const ids = new Set<FixedSpecializationFilterId>();
  for (const token of parseSpecializationTokens(raw)) {
    const id = canonicalizeSpecializationToken(token);
    if (id) ids.add(id);
  }
  return Array.from(ids);
}

/** Normalize gender values from API (`انثى` vs `أنثى`) to a single Arabic filter id. */
export function normalizeGuideGender(raw: string | null | undefined): string {
  const t = (raw || "").trim();
  if (!t) return "—";
  if (t === "ذكر") return "ذكر";
  if (t === "انثى" || t === "أنثى" || t === "انثي") return "أنثى";
  return t;
}

/** Pair Arabic specialization tokens with English labels from the same API row. */
export function buildSpecLabelMapFromApi(
  items: ApiTouristGuide[],
): Map<string, string> {
  const map = new Map<string, string>(Object.entries(SPEC_MAP));

  for (const api of items) {
    const arSpecs = parseSpecializationTokens(api.specializations);
    const enSpecs = parseSpecializationTokens(api.specializations_en);

    arSpecs.forEach((arSpec, index) => {
      const canonical = canonicalizeSpecializationToken(arSpec);
      const enLabel = enSpecs[index];
      if (!canonical || !enLabel || map.has(canonical)) return;
      map.set(canonical, canonicalEnglishSpecLabel(enLabel));
    });
  }

  return map;
}

/** Prefer concise English labels in filters/cards (API copy varies). */
export function canonicalEnglishSpecLabel(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes("heritage") && lower.includes("cultural")) {
    return "Heritage & cultural experiences";
  }
  if (
    lower.includes("land") ||
    lower.includes("outdoor") ||
    lower.includes("field") ||
    lower.includes("wilderness")
  ) {
    return "Land & outdoor experiences";
  }
  if (lower.includes("marine") || lower.includes("sea ")) {
    return "Marine experiences";
  }
  if (lower.includes("aerial")) {
    return "Aerial experiences";
  }
  if (lower.includes("recreational") || lower.includes("leisure")) {
    return "Recreational tourism";
  }
  return label.replace(/[.,;]+$/u, "").trim();
}

export function localizeTourGuideFilterLabel(
  raw: string,
  locale: string,
  specLabelMap?: Map<string, string>,
): string {
  if (locale !== "en") {
    return canonicalizeSpecializationToken(raw) ?? raw;
  }
  const canonical = canonicalizeSpecializationToken(raw) ?? raw.trim();
  return (
    specLabelMap?.get(canonical) ??
    SPEC_MAP[canonical] ??
    GENDER_MAP[canonical] ??
    GENDER_MAP[normalizeGuideGender(canonical)] ??
    raw
  );
}
