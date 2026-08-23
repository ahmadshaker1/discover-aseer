import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";

export interface SiteAsset {
  id: number;
  key: string;
  page: string;
  file: string;
  [key: string]: any;
}

/**
 * Fetches site assets from Directus for a specific page.
 * @param pageName The page key in Directus (e.g., 'aboutAseer', 'experiences')
 * @returns Array of site assets
 */
export async function fetchSiteAssets(pageName: string): Promise<SiteAsset[]> {
  try {
    const res = await fetch(
      directusItemsUrl(getDirectusPublicUrl(), "site_assets", {
        fields: ["id", "key", "page", "file"],
        limit: DIRECTUS_COLLECTION_LIMIT,
        extra: { "filter[page][_eq]": pageName },
      }),
      directusCollectionFetch,
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`Failed to fetch site assets for page: ${pageName}`, error);
    return [];
  }
}

/**
 * Helper to find an asset by key and return its URL, or a fallback if not found.
 */
export function getAssetUrl(
  assets: SiteAsset[],
  key: string | undefined,
  fallbackUrl: string,
): string {
  if (!key) return fallbackUrl;
  const needle = key.toLowerCase().trim();
  const asset = assets.find(
    (a) => a.key && a.key.toLowerCase().trim() === needle,
  );
  return asset
    ? `https://tool-portal.discoveraseer.com/assets/${asset.file}`
    : fallbackUrl;
}
