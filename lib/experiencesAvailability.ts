/** Experiences listing, detail, and submit are unavailable in Chinese. */
export function isExperiencesHiddenForLocale(locale: string): boolean {
  return locale === "zh" || locale === "cn";
}
