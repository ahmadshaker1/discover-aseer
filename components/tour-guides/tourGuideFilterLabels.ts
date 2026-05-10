/** Localize filter facet labels shown in `/tour-guides` sidebar (English locale). Arabic remains default from API/data. */

const SPEC_MAP: Record<string, string> = {
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

export function localizeTourGuideFilterLabel(raw: string, locale: string): string {
  if (locale !== "en") return raw;
  const t = raw.trim();
  return SPEC_MAP[t] ?? GENDER_MAP[t] ?? raw;
}
