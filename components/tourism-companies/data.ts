import {
  CATALOG_PAGE_SIZE,
  DIRECTUS_COLLECTION_LIMIT,
  catalogTotalPages,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";

type DirectusFileValue = string | { id?: string | null } | null;

export interface TourismProvider {
  id: number;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title_en: string;
  title_ar: string;
  content_en: string | null;
  content_ar: string | null;
  logo?: DirectusFileValue;
  logo_url: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
}

const TOURISM_PROVIDER_FIELDS = [
  "id",
  "status",
  "sort",
  "title_en",
  "title_ar",
  "content_en",
  "content_ar",
  "logo",
  "logo_url",
  "email",
  "phone",
  "website",
] as const;

function rawLogoValue(value: DirectusFileValue | undefined): string {
  if (value == null) return "";
  if (typeof value === "object") {
    return typeof value.id === "string" ? value.id.trim() : "";
  }
  return value.trim();
}

/** Prefer Directus `logo` file; fall back to legacy `logo_url`. */
export function resolveTourismProviderLogoUrl(
  provider: Pick<TourismProvider, "logo" | "logo_url">,
): string | null {
  const candidates = [rawLogoValue(provider.logo), (provider.logo_url || "").trim()];
  const directusUrl = getDirectusPublicUrl();

  for (const raw of candidates) {
    if (!raw || raw === "null" || raw === "NA") continue;
    if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) return raw;
    if (raw.startsWith("/")) return raw;
    return `${directusUrl}/assets/${raw}`;
  }

  return null;
}

export async function getTourismProviders(
  options?: { page?: number },
): Promise<{
  items: TourismProvider[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const empty = { items: [] as TourismProvider[], total: 0, page: 1, totalPages: 1 };
  const page = options?.page;
  try {
    const res = await fetch(
      directusItemsUrl(getDirectusPublicUrl(), "tourism_providers", {
        fields: TOURISM_PROVIDER_FIELDS,
        limit: page ? CATALOG_PAGE_SIZE : DIRECTUS_COLLECTION_LIMIT,
        page,
        pageSize: page ? CATALOG_PAGE_SIZE : undefined,
        meta: Boolean(page),
      }),
      directusCollectionFetch,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tourism providers");
    }

    const data = await res.json();
    const items = Array.isArray(data.data) ? data.data : [];
    const total =
      typeof data.meta?.filter_count === "number"
        ? data.meta.filter_count
        : items.length;
    return {
      items,
      total,
      page: page ?? 1,
      totalPages: catalogTotalPages(total, page ? CATALOG_PAGE_SIZE : total || 1),
    };
  } catch (error) {
    console.error("Error fetching tourism providers:", error);
    return empty;
  }
}
