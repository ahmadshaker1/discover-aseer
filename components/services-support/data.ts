import type { LocaleCode } from "@/lib/i18n/localized";
import type {
  ApiSupportService,
  SupportService,
  SupportServicesApiResponse,
} from "./types";
import { pickLocalizedField } from "@/lib/i18n/localized";
import {
  normalizeSupportNumber,
  pickLocalizedTitle,
  translateSupportCity,
  translateSupportLabel,
} from "./supportServiceLocale";
import { normalizeMapsUrl, normalizeText } from "./utils";
import {
  CATALOG_PAGE_SIZE,
  DIRECTUS_COLLECTION_LIMIT,
  catalogTotalPages,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const SUPPORT_SERVICE_FIELDS = [
  "id",
  "title_ar",
  "title_en",
  "city",
  "city_en",
  "type",
  "location",
  "support_services_number",
  "latitude",
  "longitude",
] as const;

const SUPPORT_SERVICES_API_BASE =
  process.env.NEXT_PUBLIC_SERVICES_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";


function isPublished(item: ApiSupportService): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

const normalizeCity = (city: string, locale: LocaleCode): string => {
  const c = city.trim();
  if (locale === "en") {
    const map: Record<string, string> = {
      أبها: "Abha",
      "خميس مشيط": "Khamis Mushait",
      السودة: "Al Soudah",
      بيشة: "Bisha",
      تنومة: "Tanomah",
      النماص: "Al Namas",
      "محايل عسير": "Mahayil Aseer",
      "رجال ألمع": "Rijal Almaa",
    };
    return map[c] || c;
  }
  if (locale === "ar") {
    const map: Record<string, string> = {
      Abha: "أبها",
      "Khamis Mushait": "خميس مشيط",
      "Al Soudah": "السودة",
      Bisha: "بيشة",
      Tanomah: "تنومة",
      "Al Namas": "النماص",
      "Mahayil Aseer": "محايل عسير",
      "Rijal Almaa": "رجال ألمع",
    };
    return map[c] || c;
  }
  return c;
};

function transformApiSupportService(
  item: ApiSupportService,
  locale: LocaleCode,
): SupportService {
  const rawCity = String(
    pickLocalizedField(item, "city", locale) || item.city || "غير محدد",
  );
  let filterCity = normalizeCity(rawCity, locale);
  let filterType = normalizeText(item.type, "الخدمات المساندة");

  if (filterType === "الخدمات مستشفيات") filterType = "مستشفيات";
  const title = pickLocalizedTitle(item, locale);

  return {
    id: String(item.id),
    title,
    category: translateSupportLabel(filterType, locale),
    city: translateSupportCity(filterCity, locale),
    type: translateSupportLabel(filterType, locale),
    supportNumber: normalizeSupportNumber(item.support_services_number, locale),
    mapsUrl: normalizeMapsUrl(item.location, title),
    filterCity,
    filterType,
  };
}

export async function fetchSupportServices(
  locale: LocaleCode = "ar",
  options?: { page?: number },
): Promise<{
  items: SupportService[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const empty = { items: [] as SupportService[], total: 0, page: 1, totalPages: 1 };
  const page = options?.page;
  try {
    const response = await fetch(
      directusItemsUrl(SUPPORT_SERVICES_API_BASE, "support_service", {
        fields: SUPPORT_SERVICE_FIELDS,
        limit: page ? CATALOG_PAGE_SIZE : DIRECTUS_COLLECTION_LIMIT,
        page,
        pageSize: page ? CATALOG_PAGE_SIZE : undefined,
        meta: Boolean(page),
      }),
      directusCollectionFetch,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch support services: ${response.status} ${response.statusText}`,
      );
    }

    const apiData: SupportServicesApiResponse & {
      meta?: { filter_count?: number };
    } = await response.json();
    const rows = Array.isArray(apiData?.data) ? apiData.data : [];
    const items = rows
      .filter(isPublished)
      .map((item) => transformApiSupportService(item, locale));
    const total =
      typeof apiData.meta?.filter_count === "number"
        ? apiData.meta.filter_count
        : items.length;
    return {
      items,
      total,
      page: page ?? 1,
      totalPages: catalogTotalPages(total, page ? CATALOG_PAGE_SIZE : total || 1),
    };
  } catch (error) {
    console.error("Error fetching support services:", error);
    return empty;
  }
}
