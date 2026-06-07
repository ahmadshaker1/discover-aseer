/**
 * Film page data — Directus `films` collection.
 * @see https://tool-portal.discoveraseer.com/items/films
 *
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL` (defaults to tool-portal when unset).
 */

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
    image: "/assets/aboutAseer/mountains.png",
  },
  {
    id: "film-land-2",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.plains,
    filterId: "plains",
    image: "/assets/film/cb7870bcdbeed166a47cfcfd91a8a0fa3f5c72b5.jpg",
  },
  {
    id: "film-land-3",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.beaches,
    filterId: "beaches",
    image: "/assets/film/3031f7f312de80d43b7987da3469513cef9830aa.jpg",
  },
  {
    id: "film-land-4",
    labelKey: FILM_LANDSCAPE_LABEL_KEYS.desert,
    filterId: "desert",
    image: "/assets/igcat/ralydakar.jpg",
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
      next: { revalidate: 3600 },
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

const FILM_CULTURAL_IMAGE_FILES = [
  "Cultural 1.webp",
  "Cultural 2.webp",
  "Cultural 3.webp",
  "Cultural 4.webp",
  "Cultural 5.webp",
  "Cultural 6.webp",
  "Cultural 7.webp",
  "Cultural 8.webp",
] as const;

const FILM_NATURE_IMAGE_FILES = [
  "Natural 1.webp",
  "Natural 2.webp",
  "Natural 3.webp",
  "Natural 4.webp",
  "Natural 5.webp",
  "Natural 6.webp",
  "Natural 7.webp",
  "Natural 8.webp",
  "Natural 9.webp",
] as const;

const filmWhyAseerAssetUrl = (
  folder: "cultural" | "nature",
  fileName: string,
) => `/assets/film/${folder}/${encodeURIComponent(fileName)}`;

const FILM_WHY_ASEER_CULTURAL_COPY: Omit<
  FilmWhyAseerSlide,
  "id" | "lane" | "image"
>[] = [
  {
    title: "تنوع ثقافي",
    description:
      "يُسهم الثراء والتنوع الثقافي في منطقة عسير في إلهام صُناع الأفلام وتحفيز الحس الإبداعي لديهم. كونها تحتضن أصالة عريقة ضاربة في جذور التاريخ في أكثر من ٤ آلاف قرية تراثية، ",
    textTheme: "light",
  },
  {
    title: "عمق تاريخي",
    description:
      "أكثر من ٤ آلاف قرية تراثية تمنح المشهد السينمائي عمقاً بصرياً وسردياً نادراً في مكان واحد.",
    textTheme: "light",
  },
  {
    title: "مواقع متعددة",
    description:
      "من القمم العالية إلى السفوح والوديان، يمكن تصوير مشاهد متنوعة خلال نطاق جغرافي قريب ومترابط.",
    textTheme: "dark",
  },
];

const FILM_WHY_ASEER_NATURE_COPY: Omit<
  FilmWhyAseerSlide,
  "id" | "lane" | "image"
>[] = [
  {
    title: "تنوع طبيعي",
    description:
      "تمثل منطقة عسير بيئة مثالية لإنتاج الأفلام والأعمال الفنية التي تبرز الجمال وتتطلب التنوع الطبيعي والمناخي فيها.",
    textTheme: "light",
  },
  {
    title: "بنية متنامية",
    description:
      "تسارع الخدمات اللوجستية والسياحية يسهّل عمليات الإنتاج والتصوير لفِرق العمل المحلية والدولية.",
    textTheme: "dark",
  },
  {
    title: "قرب المواقع",
    description:
      "تقارب مواقع التصوير المختلفة يساعد على تقليل زمن التنقل ورفع كفاءة أيام التصوير.",
    textTheme: "light",
  },
];

function buildFilmWhyAseerSlidesFromAssets(): FilmWhyAseerSlide[] {
  const cultural = FILM_CULTURAL_IMAGE_FILES.map((fileName, index) => {
    const copy =
      FILM_WHY_ASEER_CULTURAL_COPY[index % FILM_WHY_ASEER_CULTURAL_COPY.length];
    return {
      id: `film-why-cultural-${index + 1}`,
      lane: "left" as const,
      image: filmWhyAseerAssetUrl("cultural", fileName),
      ...copy,
    };
  });

  const nature = FILM_NATURE_IMAGE_FILES.map((fileName, index) => {
    const copy =
      FILM_WHY_ASEER_NATURE_COPY[index % FILM_WHY_ASEER_NATURE_COPY.length];
    return {
      id: `film-why-nature-${index + 1}`,
      lane: "right" as const,
      image: filmWhyAseerAssetUrl("nature", fileName),
      ...copy,
    };
  });

  return [...cultural, ...nature];
}

export const FALLBACK_FILM_WHY_ASEER_SLIDES: FilmWhyAseerSlide[] =
  buildFilmWhyAseerSlidesFromAssets();

interface ApiFilmWhyAseerSlide {
  id: string;
  title?: string | null;
  description?: string | null;
  cover_image?: string | null;
  lane?: FilmSlideLane | null;
  text_theme?: FilmSlideTextTheme | null;
  status?: string | null;
}

interface ApiFilmWhyAseerSlidesResponse {
  data: ApiFilmWhyAseerSlide[];
}

const transformFilmWhyAseerSlide = (
  row: ApiFilmWhyAseerSlide,
  directusUrl: string,
  fallback: FilmWhyAseerSlide,
): FilmWhyAseerSlide => {
  const image = row.cover_image
    ? `${directusUrl}/assets/${row.cover_image}`
    : fallback.image;

  return {
    id: row.id,
    lane:
      row.lane === "left" || row.lane === "right" ? row.lane : fallback.lane,
    title: row.title?.trim() || fallback.title,
    description: row.description?.trim() || fallback.description,
    image,
    textTheme:
      row.text_theme === "light" || row.text_theme === "dark"
        ? row.text_theme
        : fallback.textTheme,
  };
};

export const fetchFilmWhyAseerSlides = async (): Promise<
  FilmWhyAseerSlide[]
> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/film_why_aseer`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const apiData: ApiFilmWhyAseerSlidesResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return [];

    return apiData.data
      .filter((row) => !row.status || row.status === "published")
      .map((row, index) =>
        transformFilmWhyAseerSlide(
          row,
          directusUrl,
          FALLBACK_FILM_WHY_ASEER_SLIDES[
            index % FALLBACK_FILM_WHY_ASEER_SLIDES.length
          ],
        ),
      );
  } catch {
    return [];
  }
};

export const fetchFilmWhyAseerSlidesWithFallback = async (): Promise<
  FilmWhyAseerSlide[]
> => {
  // Showcase uses bundled cultural / nature stills from public/assets/film.
  return buildFilmWhyAseerSlidesFromAssets();
};

export type FilmServiceIconKey = "crew" | "locations" | "permits";

export interface FilmServiceCard {
  id: string;
  title: string;
  description: string;
  iconKey: FilmServiceIconKey;
}

export const FALLBACK_FILM_SERVICE_CARDS: FilmServiceCard[] = [
  {
    id: "film-service-1",
    title: ".طاقم العمل",
    description:
      "الدعم في الوصول الى الطاقات البشرية والكفاءات المتنوعة ف مجال انتاج الأفلام من المجتمع المحلي في منطقة عسير.",
    iconKey: "crew",
  },
  {
    id: "film-service-2",
    title: "مواقع التصوير",
    description:
      "دعم وتسهيل التعرف والوصول إلى المواقع المناسبة للإنتاج وفق طبيعة ومتطلبات العمل الفني.",
    iconKey: "locations",
  },
  {
    id: "film-service-3",
    title: "الموافقات الرسمية",
    description:
      "دعم وتسهيل الاجراءات اللازمة للحصول على موافقة الجهات الرسمية المعنية بصناعة وانتاج الأفلام في منطقة عسير.",
    iconKey: "permits",
  },
];

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

const transformFilmServiceCard = (
  row: ApiFilmServiceCard,
  fallback: FilmServiceCard,
): FilmServiceCard => {
  return {
    id: row.id,
    title: row.title?.trim() || fallback.title,
    description: row.description?.trim() || fallback.description,
    iconKey: normalizeFilmServiceIconKey(row.icon_key) ?? fallback.iconKey,
  };
};

export const fetchFilmServiceCards = async (): Promise<FilmServiceCard[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/film_services`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const apiData: ApiFilmServiceCardsResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return [];

    return apiData.data
      .filter((row) => !row.status || row.status === "published")
      .map((row, index) =>
        transformFilmServiceCard(
          row,
          FALLBACK_FILM_SERVICE_CARDS[
            index % FALLBACK_FILM_SERVICE_CARDS.length
          ],
        ),
      );
  } catch {
    return [];
  }
};

export const fetchFilmServiceCardsWithFallback = async (): Promise<
  FilmServiceCard[]
> => {
  const rows = await fetchFilmServiceCards();
  return rows.length > 0 ? rows : FALLBACK_FILM_SERVICE_CARDS;
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

export const FALLBACK_FILM_SHOWCASE_CARDS: FilmShowcaseCard[] = [
  {
    id: "film-showcase-1",
    title: "جنوب الدرب",
    category: "أفلام",
    image: "/assets/film/film-hero.png",
  },
  {
    id: "film-showcase-2",
    title: "جنوب الدرب",
    category: "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ",
    image: "/assets/film/3031f7f312de80d43b7987da3469513cef9830aa.jpg",
  },
  {
    id: "film-showcase-3",
    title: "جنوب الدرب",
    category: "ﻣﺴﻠﺴﻼت",
    image: "/assets/film/f553c2485f7cee0001b8c78577a11b28d342a8d9.png",
  },
  {
    id: "film-showcase-4",
    title: "جنوب الدرب",
    category: "أفلام ﻣﻮﺳﻴﻘﻴﺔ",
    image: "/assets/film/cb7870bcdbeed166a47cfcfd91a8a0fa3f5c72b5.jpg",
  },
  {
    id: "film-showcase-5",
    title: "جنوب الدرب",
    category: "أفلام",
    image: "/assets/film/216f4631aac0e23146a54ede4d47668e3a6b8c75 (1).png",
  },
  {
    id: "film-showcase-6",
    title: "جنوب الدرب",
    category: "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ",
    image: "/assets/film/imghorizontal.png",
  },
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
  index: number,
): FilmShowcaseCard {
  const fb =
    FALLBACK_FILM_SHOWCASE_CARDS[index % FALLBACK_FILM_SHOWCASE_CARDS.length];
  const title = pickFilmTitle(row, locale) || fb.title;
  const image = row.cover_image
    ? withDirectusCoverTransform(`${directusUrl}/assets/${row.cover_image}`, {
        width: 1200,
        height: 1460,
        quality: 92,
      })
    : fb.image;

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
      { next: { revalidate: 3600 } },
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
      showcaseCards: rows.map((row, index) =>
        transformFilmRowToShowcase(row, directusUrl, locale, index),
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
  return FALLBACK_FILM_SHOWCASE_CARDS;
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
