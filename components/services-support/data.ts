import type {
  ApiSupportService,
  SupportService,
  SupportServicesApiResponse,
} from "./types";
import {
  normalizeMapsUrl,
  normalizeSupportNumber,
  normalizeText,
  pickArabicTitle,
} from "./utils";

const SUPPORT_SERVICES_API_BASE =
  process.env.NEXT_PUBLIC_SERVICES_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

const SUPPORT_SERVICES_ITEMS_PATH = "/items/support_service" as const;

function isPublished(item: ApiSupportService): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

function transformApiSupportService(item: ApiSupportService): SupportService {
  const title = pickArabicTitle(item);

  return {
    id: String(item.id),
    title,
    category: normalizeText(item.tags, "غير مصنف"),
    city: normalizeText(item.city, "غير محدد"),
    type: normalizeText(item.type, "الخدمات المساندة"),
    supportNumber: normalizeSupportNumber(item.support_services_number),
    mapsUrl: normalizeMapsUrl(item.location, title),
  };
}

export async function fetchSupportServices(): Promise<SupportService[]> {
  try {
    const response = await fetch(
      `${SUPPORT_SERVICES_API_BASE}${SUPPORT_SERVICES_ITEMS_PATH}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch support services: ${response.status} ${response.statusText}`,
      );
    }

    const apiData: SupportServicesApiResponse = await response.json();
    const rows = Array.isArray(apiData?.data) ? apiData.data : [];
    return rows.filter(isPublished).map(transformApiSupportService);
  } catch (error) {
    console.error("Error fetching support services:", error);
    return [];
  }
}
