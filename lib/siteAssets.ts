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
      `https://tool-portal.discoveraseer.com/items/site_assets?filter[page][_eq]=${pageName}`,
      { cache: "no-store" },
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
  key: string,
  fallbackUrl: string,
): string {
  const asset = assets.find(
    (a) => a.key && a.key.toLowerCase().trim() === key.toLowerCase().trim(),
  );
  return asset
    ? `https://tool-portal.discoveraseer.com/assets/${asset.file}`
    : fallbackUrl;
}
