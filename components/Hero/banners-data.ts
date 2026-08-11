import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import { ASEER_FILM_YOUTUBE_URL } from "@/components/landing/youtubeStoryEmbed";
import type { HeroSlide } from "./types";

const BANNERS_PATH = "/items/banners" as const;
const DEFAULT_DIRECTUS_BASE = "https://tool-portal.discoveraseer.com";

export interface ApiBanner {
  id?: string | number;
  status?: string | null;
  image?: string | null;
  /** Optional overlay logo (e.g. World Region of Gastronomy badge). */
  logo?: string | null;
  title?: string | null;
  title_ar?: string | null;
  subtitle?: string | null;
  subtitle_ar?: string | null;
  button_text?: string | null;
  button_text_ar?: string | null;
  button_link?: string | null;
  [key: string]: unknown;
}

interface ApiBannersResponse {
  data?: ApiBanner[];
}

const SLIDE_ASSETS: Pick<
  HeroSlide,
  "id" | "image" | "logo" | "href" | "largeTitle" | "filmUrl"
>[] = [
  {
    id: "aseer",
    image: "/assets/landing/hero-slide-aseer.png",
    href: "/film",
    filmUrl: ASEER_FILM_YOUTUBE_URL,
    largeTitle: true,
  },
  {
    id: "cuisine",
    image: "/assets/landing/hero-slide-cuisine.png",
    logo: "/assets/landing/hero-slide-cuisine-logo.png",
    href: "/aseer-cuisine",
    largeTitle: true,
  },
];

type HeroSlidesTranslator = (
  key:
    | "slide1.title"
    | "slide1.subtitle"
    | "slide1.cta"
    | "slide2.title"
    | "slide2.subtitle"
    | "slide2.cta",
) => string;

function getDirectusBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim().replace(/\/$/, "") ||
    DEFAULT_DIRECTUS_BASE
  );
}

function resolveBannerImage(
  image: string | null | undefined,
  directusUrl: string,
  fallback: string,
): string {
  const trimmed = (image || "").trim();
  if (!trimmed) return fallback;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) return trimmed;
  return `${directusUrl}/assets/${trimmed}`;
}

/** Static slide copy from `messages` — used when CMS banners are missing or fields are empty. */
export function buildFallbackHeroSlides(t: HeroSlidesTranslator): HeroSlide[] {
  return [
    {
      ...SLIDE_ASSETS[0],
      title: t("slide1.title"),
      subtitle: t("slide1.subtitle"),
      cta: t("slide1.cta"),
    },
    {
      ...SLIDE_ASSETS[1],
      title: t("slide2.title"),
      subtitle: t("slide2.subtitle"),
      cta: t("slide2.cta"),
    },
  ];
}

async function fetchBannersFromCms(directusUrl: string): Promise<ApiBanner[]> {
  try {
    const url = new URL(`${directusUrl}${BANNERS_PATH}`);
    url.searchParams.set("filter[status][_eq]", "published");

    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];

    const json: ApiBannersResponse = await response.json();
    if (!Array.isArray(json.data)) return [];

    return json.data.filter(
      (row) => !row.status || row.status === "published",
    );
  } catch {
    return [];
  }
}

function mergeBannerWithFallback(
  banner: ApiBanner,
  fallback: HeroSlide,
  locale: LocaleCode,
  directusUrl: string,
): HeroSlide {
  const record = banner as Record<string, unknown>;
  const title = pickLocalizedField(record, "title", locale) || fallback.title;
  const subtitle =
    pickLocalizedField(record, "subtitle", locale) || fallback.subtitle;
  const image = resolveBannerImage(banner.image, directusUrl, fallback.image);
  const cmsLogo = (banner.logo || "").trim();
  const logo = cmsLogo
    ? resolveBannerImage(cmsLogo, directusUrl, "")
    : undefined;

  // Film CTA slides keep translated label + modal URL even if CMS still points at the map.
  if (fallback.filmUrl) {
    return {
      id: banner.id != null ? String(banner.id) : fallback.id,
      image,
      logo,
      largeTitle: fallback.largeTitle,
      title,
      subtitle,
      cta: fallback.cta,
      href: fallback.href,
      filmUrl: fallback.filmUrl,
    };
  }

  const cta =
    pickLocalizedField(record, "button_text", locale) || fallback.cta;
  const href = (banner.button_link || "").trim() || fallback.href;

  return {
    id: banner.id != null ? String(banner.id) : fallback.id,
    image,
    logo,
    largeTitle: fallback.largeTitle,
    title,
    subtitle,
    cta,
    href,
  };
}

/**
 * Homepage hero slides from `banners`, with per-field fallback to static slide copy and assets.
 */
export async function resolveHomeHeroSlides(
  locale: LocaleCode,
  fallbacks: HeroSlide[],
): Promise<HeroSlide[]> {
  const directusUrl = getDirectusBaseUrl();
  const banners = await fetchBannersFromCms(directusUrl);
  if (banners.length === 0) return fallbacks;

  return banners.map((banner, index) => {
    const fallback =
      fallbacks[index] ?? fallbacks[fallbacks.length - 1] ?? fallbacks[0];
    return mergeBannerWithFallback(banner, fallback, locale, directusUrl);
  });
}
