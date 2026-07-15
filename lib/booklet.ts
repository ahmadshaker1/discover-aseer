/**
 * Resolves the current published booklet file URL from Directus.
 * Used by `/booklet` and `/api/booklet`.
 */
export async function getBookletAssetUrl(): Promise<string | null> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL ||
    "https://tool-portal.discoveraseer.com"
  ).replace(/\/$/, "");

  const response = await fetch(`${baseUrl}/items/booklet`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch booklet from Directus (${response.status})`);
  }

  const result = await response.json();
  const fileId = result?.data?.booklet;

  if (!fileId || typeof fileId !== "string") {
    return null;
  }

  // Omit ?download so the browser opens the PDF viewer inline.
  return `${baseUrl}/assets/${fileId}`;
}
