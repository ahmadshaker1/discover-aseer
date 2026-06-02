export type LocaleCode = "ar" | "en";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/g;
const LATIN_SCRIPT = /[A-Za-z]/g;

/** True when Arabic letters dominate (used to avoid showing AR copy on EN pages). */
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
    locale === "en"
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

