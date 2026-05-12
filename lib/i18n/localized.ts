export type LocaleCode = "ar" | "en";

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

