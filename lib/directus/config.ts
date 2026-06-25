/** Public Directus base URL (no trailing slash). Safe for client and server. */
export function getDirectusPublicUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.trim() ||
    "https://tool-portal.discoveraseer.com";
  return raw.replace(/\/+$/, "");
}

export const TOUR_GUIDES_COLLECTION = "tourist_guides";

/** Draft status set on every guide self-service save; admins publish in Directus. */
export const TOUR_GUIDE_DRAFT_STATUS = "draft";
export const TOUR_GUIDE_PUBLISHED_STATUS = "published";
