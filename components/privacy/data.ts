import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import {
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const DEFAULT_DIRECTUS_BASE = "https://tool-portal.discoveraseer.com";

export interface ApiPrivacyPolicy {
  privacy_policy?: string | null;
  privacy_policy_ar?: string | null;
  status?: string | null;
  [key: string]: unknown;
}

function getDirectusBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim().replace(/\/$/, "") ||
    DEFAULT_DIRECTUS_BASE
  );
}

/**
 * CMS body HTML for the privacy page (`privacy_policy` / `privacy_policy_ar`).
 * Returns null when the collection is missing, empty, or fields are blank — caller should render static fallback.
 */
export async function fetchPrivacyPolicyHtml(
  locale: LocaleCode,
): Promise<string | null> {
  const directusUrl = getDirectusBaseUrl();

  try {
    const response = await fetch(
      directusItemsUrl(directusUrl, "privacy_policy", {
        fields: ["privacy_policy", "privacy_policy_ar", "status"],
        limit: 1,
      }),
      directusCollectionFetch,
    );
    if (!response.ok) return null;

    const json: { data?: ApiPrivacyPolicy | ApiPrivacyPolicy[] | null } =
      await response.json();
    const row = Array.isArray(json.data) ? json.data[0] : json.data;
    if (!row || typeof row !== "object") return null;

    const html = pickLocalizedField(row, "privacy_policy", locale) || "";
    return html || null;
  } catch {
    return null;
  }
}
