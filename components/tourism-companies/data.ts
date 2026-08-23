import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";

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
  logo_url: string;
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
  "logo_url",
  "email",
  "phone",
  "website",
] as const;

export async function getTourismProviders(): Promise<TourismProvider[]> {
  try {
    const res = await fetch(
      directusItemsUrl(getDirectusPublicUrl(), "tourism_providers", {
        fields: TOURISM_PROVIDER_FIELDS,
        limit: DIRECTUS_COLLECTION_LIMIT,
      }),
      directusCollectionFetch,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tourism providers");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tourism providers:", error);
    return [];
  }
}
