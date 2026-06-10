import {
  getCityLabelById,
  inferCityIdFromLocation,
} from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";
import type { Restaurant } from "./types";

/** CMS `cuisine_type` slug → display label per locale. */
const CUISINE_SLUG_LABELS: Record<string, { ar: string; en: string }> = {
  aseeri_cuisine: { ar: "المطبخ العسيري", en: "Aseeri cuisine" },
  khaleeji: { ar: "خليجي", en: "Khaleeji" },
  lebanese: { ar: "لبناني", en: "Lebanese" },
  italian: { ar: "إيطالي", en: "Italian" },
  indian: { ar: "هندي", en: "Indian" },
  international_cuisine: { ar: "مأكولات عالمية", en: "International cuisine" },
  american: { ar: "أمريكي", en: "American" },
  cafe: { ar: "مقهى", en: "Café" },
};

export function translateCuisineSlug(
  slug: string,
  locale: LocaleCode,
): string {
  const key = slug.trim().toLowerCase();
  const labels = CUISINE_SLUG_LABELS[key];
  if (labels) return labels[locale];
  return slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatCuisineTypes(
  cuisineTypes: string[] | undefined,
  locale: LocaleCode,
): string {
  if (!cuisineTypes?.length) return "";
  return cuisineTypes
    .map((slug) => translateCuisineSlug(slug, locale))
    .join(locale === "ar" ? "، " : ", ");
}

/** Known CMS Arabic labels → English for restaurant cards (locale `en`). */
const LABEL_EN: Record<string, string> = {
  مطاعم: "Restaurants",
  المطاعم: "Restaurants",
  "مطاعم وكافيهات": "Restaurants & cafés",
  "مطاعم و كافيهات": "Restaurants & cafés",
  كافيهات: "Cafés",
  كافيه: "Café",
  "المطبخ العسيري": "Aseeri cuisine",
  "مأكولات تقليدية": "Traditional cuisine",
  مشويات: "Grills",
  "شرق أوسطي": "Middle Eastern",
  شرق: "Middle Eastern",
  أمريكي: "American",
  آسيوي: "Asian",
  سعودي: "Saudi",
  عسيري: "Aseeri",
  عسير: "Aseer",
  تركي: "Turkish",
  لبناني: "Lebanese",
  هندي: "Indian",
  إيطالي: "Italian",
  مأكولات: "Cuisine",
  "مطعم شعبي": "Local restaurant",
  "عسير / بلقرن": "Asir / Balqarn",
  "خميس مشيط": "Khamis Mushait",
  "محايل عسير": "Mahayil Asir",
  "رجال ألمع": "Rijal Almaa",
  "الحريضة": "Al Haridhah",
  "قحم": "Qahm",
};

function normalizeLabelKey(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function translateRestaurantLabel(
  value: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(value);
  if (!trimmed || locale !== "en") return trimmed;

  if (LABEL_EN[trimmed]) return LABEL_EN[trimmed];

  const parts = trimmed.split(/[,،]/).map((part) => normalizeLabelKey(part));
  if (parts.length > 1) {
    const translated = parts.map((part) => LABEL_EN[part] ?? part);
    if (translated.some((part, index) => part !== parts[index])) {
      return translated.join(", ");
    }
  }

  return trimmed;
}

export function translateRestaurantCity(
  city: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(city);
  if (!trimmed || locale !== "en") return trimmed;

  const cityId = inferCityIdFromLocation(trimmed);
  if (cityId) return getCityLabelById(cityId, "en");

  return trimmed;
}

export function localizeRestaurant(
  restaurant: Restaurant,
  locale: LocaleCode,
): Restaurant {
  if (locale !== "en") return restaurant;

  const cityPart = restaurant.location
    .replace(/،\s*عسير\s*$/u, "")
    .replace(/,\s*Aseer\s*$/i, "")
    .trim();
  const translatedCity = translateRestaurantCity(cityPart, locale);
  const location = `${translatedCity}, Aseer`;

  return {
    ...restaurant,
    location,
    category: translateRestaurantLabel(restaurant.category, locale),
    nationality: translateRestaurantLabel(restaurant.nationality, locale),
  };
}
