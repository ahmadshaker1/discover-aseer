import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

const PRIVACY_POLICY_PATH = "/items/privacy_policy" as const;

export interface ApiPrivacyPolicy {
  privacy_policy?: string | null;
  privacy_policy_ar?: string | null;
  status?: string | null;
  [key: string]: unknown;
}

function getDirectusBaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

/**
 * CMS body HTML for the privacy page (`privacy_policy` / `privacy_policy_ar`).
 * Returns null when the collection is missing, empty, or fields are blank — caller should render static fallback.
 */
export async function fetchPrivacyPolicyHtml(
  locale: LocaleCode,
): Promise<string | null> {
  const directusUrl = getDirectusBaseUrl();
  if (!directusUrl) return null;

  try {
    const response = await fetch(`${directusUrl}${PRIVACY_POLICY_PATH}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const json: { data?: ApiPrivacyPolicy | null } = await response.json();
    const row = json.data;
    if (!row || typeof row !== "object") return null;

    const html = pickLocalizedField(row, "privacy_policy", locale) || "";
    return html || null;
  } catch {
    return null;
  }
}
