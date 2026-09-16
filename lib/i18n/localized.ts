export type LocaleCode = "ar" | "en" | "zh";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/g;
const LATIN_SCRIPT = /[A-Za-z]/g;

export function parseLocaleCode(
  value: string | null | undefined,
): LocaleCode {
  if (value === "en" || value === "zh") return value;
  if (value === "cn") return "zh";
  return "ar";
}

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}

/** English and Chinese share Latin/CJK CMS fallbacks (not Arabic). */
export function prefersLatinContent(locale: string): boolean {
  return locale !== "ar";
}

/** True when Arabic letters dominate (used to avoid showing AR copy on EN/ZH pages). */
export function isMostlyArabicText(text: string): boolean {
  const arabic = (text.match(ARABIC_SCRIPT) ?? []).length;
  const latin = (text.match(LATIN_SCRIPT) ?? []).length;
  const total = arabic + latin;
  if (total === 0) return false;
  return arabic / total > 0.5;
}

export function pickLocalizedField<T extends Record<string, unknown>>(
  row: T,
  baseKey: string,
  locale: LocaleCode,
): string | undefined {
  const prioritizedKeys =
    locale === "zh"
      ? [
          `${baseKey}_zh`,
          `${baseKey}_cn`,
          `${baseKey}_en`,
          baseKey,
          `${baseKey}_ar`,
        ]
      : locale === "en"
        ? [`${baseKey}_en`, baseKey, `${baseKey}_ar`]
        : [`${baseKey}_ar`, baseKey, `${baseKey}_en`];

  for (const key of prioritizedKeys) {
    const value = row[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

export function pickBilingualLabel(
  labels: { ar: string; en: string; zh?: string },
  locale: string,
): string {
  if (locale === "zh") return labels.zh || labels.en;
  if (locale === "en") return labels.en;
  return labels.ar;
}
