/** Public Directus base URL (no trailing slash). Safe for client and server. */
export function getDirectusPublicUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.trim() ||
    "https://tool-portal.discoveraseer.com";
  return raw.replace(/\/+$/, "");
}

export const TOUR_GUIDES_COLLECTION = "tourist_guides";

/**
 * Guide application statuses on `tourist_guides.status`.
 * Portal submit → under_review; admins set published / rejected in Directus.
 */
export const TOUR_GUIDE_DRAFT_STATUS = "draft";
export const TOUR_GUIDE_UNDER_REVIEW_STATUS = "under_review";
export const TOUR_GUIDE_PUBLISHED_STATUS = "published";
export const TOUR_GUIDE_REJECTED_STATUS = "rejected";

export type TourGuideStatus =
  | typeof TOUR_GUIDE_DRAFT_STATUS
  | typeof TOUR_GUIDE_UNDER_REVIEW_STATUS
  | typeof TOUR_GUIDE_PUBLISHED_STATUS
  | typeof TOUR_GUIDE_REJECTED_STATUS;

/** M2O on `tourist_guides` → `directus_users`. */
export const TOUR_GUIDE_ACCOUNT_FIELD = "account";

/** Text field on `tourist_guides`; matched to the signed-in user's login email. */
export const TOUR_GUIDE_EMAIL_FIELD = "email";

/** Directus file fields on `tourist_guides`. */
export const TOUR_GUIDE_IMAGE_FIELD = "image";
export const TOUR_GUIDE_LICENSE_FIELD = "license_attachment";

/** Directus query: public `/tour-guides` listing — published rows only. */
export function publishedTourGuidesSearchParams(): URLSearchParams {
  return new URLSearchParams({
    [`filter[status][_eq]`]: TOUR_GUIDE_PUBLISHED_STATUS,
  });
}

export function isPublishedTourGuide(
  row: { status?: string | null },
): boolean {
  return row.status === TOUR_GUIDE_PUBLISHED_STATUS;
}
