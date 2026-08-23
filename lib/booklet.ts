import { directusCollectionFetch, directusItemsUrl } from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";

/**
 * Resolves the current published booklet file URL from Directus.
 * Used by `/booklet` and `/api/booklet`.
 */
export async function getBookletAssetUrl(): Promise<string | null> {
  const baseUrl = getDirectusPublicUrl();

  const response = await fetch(
    directusItemsUrl(baseUrl, "booklet", {
      fields: ["booklet"],
      limit: 1,
    }),
    directusCollectionFetch,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch booklet from Directus (${response.status})`);
  }

  const result = await response.json();
  const row = Array.isArray(result?.data) ? result.data[0] : result?.data;
  const fileId = row?.booklet;

  if (!fileId || typeof fileId !== "string") {
    return null;
  }

  // Omit ?download so the browser opens the PDF viewer inline.
  return `${baseUrl}/assets/${fileId}`;
}
