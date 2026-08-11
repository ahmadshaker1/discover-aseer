/** Official Aseer film — homepage hero “Watch the film” modal. */
export const ASEER_FILM_YOUTUBE_URL =
  "https://www.youtube.com/watch?v=W044k3XpY8I";

/**
 * Default YouTube links for the two “Stories from Aseer” cards on the home page.
 * Paste `watch`, `youtu.be`, `embed`, or `shorts` URLs — leave `null` to show the poster only.
 */
export const LANDING_STORY_YOUTUBE_URLS: readonly [string | null, string | null] = [
  "https://youtu.be/8W60SA2wvFE?si=44WoypWJGLwhikrC",
  "https://youtu.be/_y5ByPD3d9U?feature=shared",
];

const VIDEO_ID_RE = /^[\w-]{11}$/;

/** Returns the 11-character video id, or null if the URL is not a recognized YouTube link. */
export function getYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0] ?? "";
      return VIDEO_ID_RE.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.slice("/embed/".length).split("/")[0] ?? "";
        return VIDEO_ID_RE.test(id) ? id : null;
      }
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v") ?? "";
        return VIDEO_ID_RE.test(id) ? id : null;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/").filter(Boolean)[1] ?? "";
        return VIDEO_ID_RE.test(id) ? id : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

/** `https://www.youtube.com/embed/{id}` for use in an iframe `src`, or null. */
export function getYouTubeEmbedSrc(
  url: string | null | undefined,
): string | null {
  if (!url) return null;
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

/** YouTube poster image for a watch/embed URL, or null. */
export function getYouTubeThumbnailSrc(
  url: string | null | undefined,
): string | null {
  if (!url) return null;
  const id = getYouTubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null;
}
