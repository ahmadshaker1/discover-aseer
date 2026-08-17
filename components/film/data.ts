/**
 * Film page data — Directus `films` collection.
 * @see https://tool-portal.discoveraseer.com/items/films
 *
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL` (defaults to tool-portal when unset).
 */

import { LANDSCAPE_HIGHLIGHT_IMAGES } from "@/components/destinations/filterOptions";
import {
  FILM_LANDSCAPE_LABEL_KEYS,
  resolveFilmLandscapeFilterId,
  type FilmLandscapeFilterId,
} from "./landscapeFilters";
import { withDirectusCoverTransform } from "@/lib/directusAssetUrl";

const DIRECTUS_API_BASE =
  process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

const FILMS_ITEMS_PATH = "/items/films" as const;

export interface FilmLandscape {
  id: string;
  title?: string;
  description?: string;
  /** i18n key under `film` namespace, e.g. `landscapes.mountains` */
  labelKey?: string;
  /** Landscape key → `/destinations?filter=` via `LANDSCAPE_TO_DESTINATION_FILTER`. */
  filterId?: FilmLandscapeFilterId;
  image: string;
  /** External watch link (Netflix, YouTube, Shahid, …). */
  watchUrl?: string;
}

const filmLandscapeAssetUrl = (fileName: string) =>
  `/assets/film/nature/${encodeURIComponent(fileName)}`;

/** Terrain carousel (mountains, plains, beaches, desert) — local assets only. */
export const FALLBACK_FILM_LANDSCAPES: FilmLandscape[] = [
  {
    id: "film-land-1",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.mountains,
    filterId: "mountains",
    image: LANDSCAPE_HIGHLIGHT_IMAGES[0],
  },
  {
    id: "film-land-2",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.plains,
    filterId: "plains",
    image: LANDSCAPE_HIGHLIGHT_IMAGES[1],
  },
  {
    id: "film-land-3",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.beaches,
    filterId: "beaches",
    image: LANDSCAPE_HIGHLIGHT_IMAGES[2],
  },
  {
    id: "film-land-4",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.desert,
    filterId: "desert",
    image: LANDSCAPE_HIGHLIGHT_IMAGES[3],
  },
];

interface ApiFilmLandscape {
  id: string;
  title?: string | null;
  title_en?: string | null;
  filter_key?: string | null;
  cover_image?: string | null;
  status?: string | null;
}

interface ApiFilmLandscapeResponse {
  data: ApiFilmLandscape[];
}

const transformFilmLandscape = (
  row: ApiFilmLandscape,
  directusUrl: string,
  fallback: FilmLandscape,
): FilmLandscape => {
  const image = row.cover_image
    ? `${directusUrl}/assets/${row.cover_image}`
    : fallback.image;

  const filterId =
    resolveFilmLandscapeFilterId(row.filter_key) ||
    resolveFilmLandscapeFilterId(row.title_en) ||
    resolveFilmLandscapeFilterId(row.title) ||
    fallback.filterId;

  return {
    id: row.id,
    labelKey: FILM_LANDSCAPE_LABEL_KEYS[filterId],
    filterId,
    image,
  };
};

export const fetchFilmLandscapes = async (): Promise<FilmLandscape[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/film_landscapes`, {
      next: { revalidate: 0 }, // TODO: restore 3600 collection cache
    });
    if (!response.ok) return [];

    const apiData: ApiFilmLandscapeResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return [];

    return apiData.data
      .filter((row) => !row.status || row.status === "published")
      .map((row, index) =>
        transformFilmLandscape(
          row,
          directusUrl,
          FALLBACK_FILM_LANDSCAPES[index % FALLBACK_FILM_LANDSCAPES.length],
        ),
      );
  } catch {
    return [];
  }
};

export const fetchFilmLandscapesWithFallback = async (): Promise<
  FilmLandscape[]
> => FALLBACK_FILM_LANDSCAPES;

export type FilmSlideLane = "left" | "right";
export type FilmSlideTextTheme = "light" | "dark";

export interface FilmWhyAseerSlide {
  id: string;
  lane: FilmSlideLane;
  title: string;
  description: string;
  image: string;
  textTheme: FilmSlideTextTheme;
}

const FILM_PLACEHOLDER_IMAGE = "/assets/film/film-hero.png";

export const FALLBACK_FILM_WHY_ASEER_SLIDES: FilmWhyAseerSlide[] = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    id: `nature-${i}`,
    lane: "right" as const,
    title: "",
    description: "",
    image: `/assets/film/nature/Natural ${i}.webp`,
    textTheme: "light" as const,
  })),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    id: `culture-${i}`,
    lane: "left" as const,
    title: "",
    description: "",
    image: `/assets/film/cultural/Cultural ${i}.webp`,
    textTheme: "light" as const,
  })),
];

export const fetchFilmWhyAseerSlides = async (): Promise<
  FilmWhyAseerSlide[]
> => {
  return FALLBACK_FILM_WHY_ASEER_SLIDES;
};

export type FilmServiceIconKey = "crew" | "locations" | "permits";

export interface FilmServiceCard {
  id: string;
  title: string;
  description: string;
  iconKey: FilmServiceIconKey;
}

interface ApiFilmServiceCard {
  id: string;
  title?: string | null;
  description?: string | null;
  icon_key?: string | null;
  status?: string | null;
}

interface ApiFilmServiceCardsResponse {
  data: ApiFilmServiceCard[];
}

const normalizeFilmServiceIconKey = (
  value: string | null | undefined,
): FilmServiceIconKey | null => {
  if (value === "crew" || value === "locations" || value === "permits")
    return value;
  return null;
};

const transformFilmServiceCard = (row: ApiFilmServiceCard): FilmServiceCard => {
  return {
    id: row.id,
    title: row.title?.trim() || "",
    description: row.description?.trim() || "",
    iconKey: normalizeFilmServiceIconKey(row.icon_key) ?? "crew",
  };
};

export const fetchFilmServiceCards = async (): Promise<FilmServiceCard[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/film_services`, {
      next: { revalidate: 0 }, // TODO: restore 3600 collection cache
    });
    if (!response.ok) return [];

    const apiData: ApiFilmServiceCardsResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return [];

    return apiData.data
      .filter((row) => !row.status || row.status === "published")
      .map((row) => transformFilmServiceCard(row));
  } catch {
    return [];
  }
};

export type FilmShowcaseCategory =
  | "الكل"
  | "أفلام"
  | "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ"
  | "ﻣﺴﻠﺴﻼت"
  | "أفلام ﻣﻮﺳﻴﻘﻴﺔ";

export interface FilmShowcaseCard {
  id: string;
  title: string;
  category: FilmShowcaseCategory;
  image: string;
  /** External watch link (Netflix, YouTube, Shahid, …). */
  watchUrl?: string;
}

export const FILM_SHOWCASE_FILTERS: FilmShowcaseCategory[] = [
  "الكل",
  "أفلام",
  "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ",
  "ﻣﺴﻠﺴﻼت",
  "أفلام ﻣﻮﺳﻴﻘﻴﺔ",
];

function normalizeDirectusBase(url: string): string {
  return url.replace(/\/+$/, "");
}

interface ApiFilm {
  id: string;
  status?: string | null;
  title_ar?: string | null;
  title_en?: string | null;
  url?: string | null;
  cover_image?: string | null;
  type?: string | null;
}

interface FilmsListResponse {
  data: ApiFilm[];
}

export function mapFilmTypeToCategory(
  type: string | null | undefined,
): FilmShowcaseCategory {
  switch (type) {
    case "movies":
      return "أفلام";
    case "promotional_series":
      return "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ";
    case "series":
      return "ﻣﺴﻠﺴﻼت";
    case "musical_film":
      return "أفلام ﻣﻮﺳﻴﻘﻴﺔ";
    default:
      return "أفلام";
  }
}

function pickFilmTitle(row: ApiFilm, locale: string): string {
  const isEn = locale === "en";
  const primary = (isEn ? row.title_en : row.title_ar)?.trim();
  const secondary = (isEn ? row.title_ar : row.title_en)?.trim();
  return primary || secondary || "";
}

function transformFilmRowToLandscape(
  row: ApiFilm,
  directusUrl: string,
  locale: string,
  index: number,
): FilmLandscape {
  const fb = FALLBACK_FILM_LANDSCAPES[index % FALLBACK_FILM_LANDSCAPES.length];
  const title = pickFilmTitle(row, locale);
  const image = row.cover_image
    ? withDirectusCoverTransform(`${directusUrl}/assets/${row.cover_image}`, {
        width: 960,
        height: 1040,
        quality: 92,
      })
    : fb.image;

  return {
    id: row.id,
    title: title || undefined,
    labelKey: fb.labelKey,
    filterId: fb.filterId,
    image,
    watchUrl: row.url?.trim() || undefined,
  };
}

function transformFilmRowToShowcase(
  row: ApiFilm,
  directusUrl: string,
  locale: string,
): FilmShowcaseCard {
  const title = pickFilmTitle(row, locale);
  const image = row.cover_image
    ? withDirectusCoverTransform(`${directusUrl}/assets/${row.cover_image}`, {
        width: 1200,
        height: 1460,
        quality: 92,
      })
    : FILM_PLACEHOLDER_IMAGE;

  return {
    id: row.id,
    title,
    category: mapFilmTypeToCategory(row.type),
    image,
    watchUrl: row.url?.trim() || undefined,
  };
}

async function fetchPublishedFilmsFromDirectus(locale: string): Promise<{
  landscapes: FilmLandscape[];
  showcaseCards: FilmShowcaseCard[];
} | null> {
  const directusUrl = normalizeDirectusBase(DIRECTUS_API_BASE);

  try {
    const response = await fetch(
      `${directusUrl}${FILMS_ITEMS_PATH}?sort=-date_created`,
      { next: { revalidate: 0 } }, // TODO: restore 3600 collection cache
    );
    if (!response.ok) return null;

    const apiData: FilmsListResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return null;

    const rows = apiData.data.filter(
      (row) => !row.status || row.status === "published",
    );
    if (rows.length === 0) return null;

    return {
      landscapes: rows.map((row, index) =>
        transformFilmRowToLandscape(row, directusUrl, locale, index),
      ),
      showcaseCards: rows.map((row) =>
        transformFilmRowToShowcase(row, directusUrl, locale),
      ),
    };
  } catch {
    return null;
  }
}

/** “Filmed works” grid from Directus `films` (not the terrain intro carousel). */
export async function fetchFilmShowcaseCardsForFilmPage(
  locale: string,
): Promise<FilmShowcaseCard[]> {
  const fromApi = await fetchPublishedFilmsFromDirectus(locale);
  if (fromApi) return fromApi.showcaseCards;
  return [];
}

/** Film page data: terrain strip uses local slides; showcase may come from Directus. */
export async function fetchFilmsForFilmPage(locale: string): Promise<{
  landscapes: FilmLandscape[];
  showcaseCards: FilmShowcaseCard[];
}> {
  const [landscapes, showcaseCards] = await Promise.all([
    fetchFilmLandscapesWithFallback(),
    fetchFilmShowcaseCardsForFilmPage(locale),
  ]);

  return { landscapes, showcaseCards };
}
