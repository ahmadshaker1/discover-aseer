export const MAP_PLACE_DEFAULT_IMAGE = "/assets/default_background.jpg";

export function resolveMapPlaceImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return MAP_PLACE_DEFAULT_IMAGE;
  const trimmed = imageUrl.trim();
  if (!trimmed) return MAP_PLACE_DEFAULT_IMAGE;

  if (trimmed.startsWith("http") || trimmed.startsWith("/")) {
    return trimmed;
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com"
  ).replace(/\/$/, "");

  return `${baseUrl}/assets/${trimmed}`;
}
