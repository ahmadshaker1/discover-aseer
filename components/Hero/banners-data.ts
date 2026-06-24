import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import type { HeroSlide } from "./Hero";

const BANNERS_PATH = "/items/banners" as const;

export interface ApiBanner {
  id?: string | number;
  status?: string | null;
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
  "id" | "image" | "logo" | "href" | "largeTitle"
>[] = [
  {
    id: "aseer",
    image: "/assets/landing/hero-slide-aseer.png",
    href: "/interactive-map",
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
  key: "slide1.title" | "slide1.subtitle" | "slide1.cta" | "slide2.title" | "slide2.subtitle" | "slide2.cta",
) => string;

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

function getDirectusBaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

async function fetchBannersFromCms(): Promise<ApiBanner[]> {
  const directusUrl = getDirectusBaseUrl();
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}${BANNERS_PATH}`, {
      next: { revalidate: 3600 },
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
): HeroSlide {
  const record = banner as Record<string, unknown>;
  const title = pickLocalizedField(record, "title", locale) || fallback.title;
  const subtitle =
    pickLocalizedField(record, "subtitle", locale) || fallback.subtitle;
  const cta =
    pickLocalizedField(record, "button_text", locale) || fallback.cta;
  const href = (banner.button_link || "").trim() || fallback.href;

  return {
    id: banner.id != null ? String(banner.id) : fallback.id,
    image: fallback.image,
    logo: fallback.logo,
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
  const banners = await fetchBannersFromCms();
  if (banners.length === 0) return fallbacks;

  return banners.map((banner, index) => {
    const fallback =
      fallbacks[index] ?? fallbacks[fallbacks.length - 1] ?? fallbacks[0];
    return mergeBannerWithFallback(banner, fallback, locale);
  });
}
