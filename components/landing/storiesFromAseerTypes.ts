/**
 * CMS / API shape for the “قصص من عسير” landing block.
 * Wire `videoUrl` when the asset is available; `posterSrc` is shown until then.
 */
export interface LandingStoryFromAseer {
  id: string;
  year: string;
  posterSrc: string;
  videoUrl?: string | null;
  description: string;
}
