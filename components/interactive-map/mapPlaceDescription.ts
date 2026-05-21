export const MAP_DESCRIPTION_PREVIEW_LENGTH = 160;

export function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncatePlainText(
  plain: string,
  maxLength = MAP_DESCRIPTION_PREVIEW_LENGTH,
): { preview: string; isTruncated: boolean } {
  if (plain.length <= maxLength) {
    return { preview: plain, isTruncated: false };
  }
  return {
    preview: `${plain.slice(0, maxLength).trimEnd()}…`,
    isTruncated: true,
  };
}
