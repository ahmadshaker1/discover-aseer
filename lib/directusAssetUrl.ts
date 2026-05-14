/**
 * Optional Directus file transform on `/assets/{id}` URLs.
 * @see https://docs.directus.io/reference/files.html
 *
 * Set `NEXT_PUBLIC_DIRECTUS_ASSET_TRANSFORMS=false` if your instance
 * does not allow dynamic transforms (images will still load without params).
 */
export function withDirectusCoverTransform(
  url: string,
  opts: { width: number; height: number; quality?: number },
): string {
  if (process.env.NEXT_PUBLIC_DIRECTUS_ASSET_TRANSFORMS === "false") {
    return url;
  }
  if (!url.startsWith("http")) return url;
  try {
    const u = new URL(url);
    if (!/\/assets\/[^/]+$/i.test(u.pathname)) return url;
    u.searchParams.set("width", String(opts.width));
    u.searchParams.set("height", String(opts.height));
    u.searchParams.set("fit", "cover");
    u.searchParams.set("quality", String(opts.quality ?? 92));
    return u.toString();
  } catch {
    return url;
  }
}
