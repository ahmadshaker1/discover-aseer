/** Localize filter facet labels on `/tour-guides` (English locale). */

import type { ApiTouristGuide } from "./types";

/** Canonical Arabic specialization tokens from the tourist_guides API. */
const SPEC_MAP: Record<string, string> = {
  "تجارب وأنشطة تراثية وثقافية": "Heritage & cultural experiences",
  "تجارب وأنشطة برية": "Land & outdoor experiences",
  "تجارب وأنشطة بحرية": "Marine experiences",
  "تجارب وأنشطة هوائية": "Aerial experiences",
  "سياحة الاستجمام": "Recreational tourism",
  // Legacy / dummy data
  "السياحة الثقافية": "Cultural tourism",
  "الجبال": "Mountains",
  "التراث": "Heritage",
  "السياحة العائلية": "Family tourism",
  "الطبيعة": "Nature",
  "المشي لمسافات طويلة": "Hiking",
  "التصوير": "Photography",
  "الجولات الجماعية": "Group tours",
  "المعالم السياحية": "Landmarks",
  "المطبخ المحلي": "Local cuisine",
};

const GENDER_MAP: Record<string, string> = {
  "ذكر": "Male",
  "أنثى": "Female",
};

export function parseSpecializationTokens(raw: string | null | undefined): string[] {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.replace(/\s+/g, " ").replace(/[.,;]+$/u, "").trim())
    .filter(Boolean);
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
export function buildSpecLabelMapFromApi(items: ApiTouristGuide[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const api of items) {
    const arSpecs = parseSpecializationTokens(api.specializations);
    const enSpecs = parseSpecializationTokens(api.specializations_en);

    arSpecs.forEach((arSpec, index) => {
      const enLabel = enSpecs[index];
      if (!enLabel || map.has(arSpec)) return;
      map.set(arSpec, canonicalEnglishSpecLabel(enLabel));
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
  if (locale !== "en") return raw;
  const t = raw.trim();
  return (
    specLabelMap?.get(t) ??
    SPEC_MAP[t] ??
    GENDER_MAP[t] ??
    GENDER_MAP[normalizeGuideGender(t)] ??
    raw
  );
}
