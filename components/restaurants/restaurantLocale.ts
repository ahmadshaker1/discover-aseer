import {
  getCityLabelById,
  inferCityIdFromLocation,
} from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";
import { prefersLatinContent } from "@/lib/i18n/localized";
import type { Restaurant } from "./types";

export function hasAseeriCuisine(cuisineTypes?: string[]): boolean {
  return cuisineTypes?.includes("aseeri_cuisine") ?? false;
}

/** CMS `cuisine_type` slug → display label per locale. */
const CUISINE_SLUG_LABELS: Record<string, { ar: string; en: string; zh: string }> = {
  aseeri_cuisine: { ar: "المطبخ العسيري", en: "Aseeri cuisine", zh: "阿西尔菜" },
  khaleeji: { ar: "خليجي", en: "Khaleeji", zh: "海湾菜" },
  lebanese: { ar: "لبناني", en: "Lebanese", zh: "黎巴嫩菜" },
  italian: { ar: "إيطالي", en: "Italian", zh: "意大利菜" },
  indian: { ar: "هندي", en: "Indian", zh: "印度菜" },
  international_cuisine: {
    ar: "مأكولات عالمية",
    en: "International cuisine",
    zh: "国际美食",
  },
  american: { ar: "أمريكي", en: "American", zh: "美式料理" },
  cafe: { ar: "مقهى", en: "Café", zh: "咖啡馆" },
};

export function translateCuisineSlug(
  slug: string,
  locale: LocaleCode,
): string {
  const key = slug.trim().toLowerCase();
  const labels = CUISINE_SLUG_LABELS[key];
  if (labels) return labels[locale] ?? labels.en;
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
    .join(locale === "ar" ? "، " : locale === "zh" ? "、" : ", ");
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

const LABEL_ZH: Record<string, string> = {
  مطاعم: "餐厅",
  المطاعم: "餐厅",
  "مطاعم وكافيهات": "餐厅与咖啡馆",
  "مطاعم و كافيهات": "餐厅与咖啡馆",
  كافيهات: "咖啡馆",
  كافيه: "咖啡馆",
  "المطبخ العسيري": "阿西尔菜",
  "مأكولات تقليدية": "传统美食",
  مشويات: "烧烤",
  "شرق أوسطي": "中东菜",
  شرق: "中东菜",
  أمريكي: "美式料理",
  آسيوي: "亚洲菜",
  سعودي: "沙特菜",
  عسيري: "阿西尔",
  عسير: "阿西尔",
  تركي: "土耳其菜",
  لبناني: "黎巴嫩菜",
  هندي: "印度菜",
  إيطالي: "意大利菜",
  مأكولات: "美食",
  "مطعم شعبي": "当地餐厅",
  "عسير / بلقرن": "阿西尔 / 巴尔卡尔恩",
  "خميس مشيط": "海米斯穆谢特",
  "محايل عسير": "迈哈伊勒阿西尔",
  "رجال ألمع": "里贾勒阿尔马",
  الحريضة: "哈里达",
  قحم: "卡赫姆",
};

function restaurantLabelDict(locale: LocaleCode): Record<string, string> | null {
  if (locale === "zh") return LABEL_ZH;
  if (locale === "en") return LABEL_EN;
  return null;
}

function normalizeLabelKey(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function translateRestaurantLabel(
  value: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(value);
  const dict = restaurantLabelDict(locale);
  if (!trimmed || !dict) return trimmed;

  if (dict[trimmed]) return dict[trimmed];

  const parts = trimmed.split(/[,،]/).map((part) => normalizeLabelKey(part));
  if (parts.length > 1) {
    const translated = parts.map((part) => dict[part] ?? part);
    if (translated.some((part, index) => part !== parts[index])) {
      return translated.join(locale === "zh" ? "、" : ", ");
    }
  }

  return trimmed;
}

export function translateRestaurantCity(
  city: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(city);
  if (!trimmed || !prefersLatinContent(locale)) return trimmed;

  const cityId = inferCityIdFromLocation(trimmed);
  if (cityId) return getCityLabelById(cityId, locale);

  return trimmed;
}

export function localizeRestaurant(
  restaurant: Restaurant,
  locale: LocaleCode,
): Restaurant {
  if (!prefersLatinContent(locale)) return restaurant;

  const cityPart = restaurant.location
    .replace(/،\s*عسير\s*$/u, "")
    .replace(/,\s*Aseer\s*$/i, "")
    .replace(/，\s*阿西尔\s*$/u, "")
    .trim();
  const translatedCity = translateRestaurantCity(cityPart, locale);
  const location =
    locale === "zh" ? `${translatedCity}，阿西尔` : `${translatedCity}, Aseer`;

  return {
    ...restaurant,
    location,
    category: translateRestaurantLabel(restaurant.category, locale),
    nationality: translateRestaurantLabel(restaurant.nationality, locale),
  };
}
