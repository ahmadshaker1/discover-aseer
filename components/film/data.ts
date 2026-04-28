/**
 * Backend handoff — film first section cards:
 * - Suggested Directus collection: `film_landscapes`
 * - Env: `NEXT_PUBLIC_DIRECTUS_APP_URL`
 * - Fields (suggested): `id`, `title`, `cover_image`, `status`
 */

export interface FilmLandscape {
  id: string;
  title: string;
  image: string;
}

export const FALLBACK_FILM_LANDSCAPES: FilmLandscape[] = [
  {
    id: "film-land-1",
    title: "الجبال",
    image: "/assets/film/3031f7f312de80d43b7987da3469513cef9830aa.jpg",
  },
  {
    id: "film-land-2",
    title: "السهول",
    image: "/assets/film/f553c2485f7cee0001b8c78577a11b28d342a8d9.png",
  },
  {
    id: "film-land-3",
    title: "الشواطئ",
    image: "/assets/film/cb7870bcdbeed166a47cfcfd91a8a0fa3f5c72b5.jpg",
  },
  {
    id: "film-land-4",
    title: "الصحراء",
    image: "/assets/film/216f4631aac0e23146a54ede4d47668e3a6b8c75 (1).png",
  },
];

interface ApiFilmLandscape {
  id: string;
  title?: string | null;
  cover_image?: string | null;
  status?: string | null;
}

interface ApiFilmLandscapeResponse {
  data: ApiFilmLandscape[];
}

const transformFilmLandscape = (
  row: ApiFilmLandscape,
  directusUrl: string,
  fallbackTitle: string,
): FilmLandscape => {
  const image = row.cover_image
    ? `${directusUrl}/assets/${row.cover_image}`
    : "/assets/film/3031f7f312de80d43b7987da3469513cef9830aa.jpg";

  return {
    id: row.id,
    title: row.title?.trim() || fallbackTitle,
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
          FALLBACK_FILM_LANDSCAPES[index % FALLBACK_FILM_LANDSCAPES.length]
            .title,
        ),
      );
  } catch {
    return [];
  }
};

export const fetchFilmLandscapesWithFallback = async (): Promise<
  FilmLandscape[]
> => {
  const rows = await fetchFilmLandscapes();
  return rows.length > 0 ? rows : FALLBACK_FILM_LANDSCAPES;
};

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

export const FALLBACK_FILM_WHY_ASEER_SLIDES: FilmWhyAseerSlide[] = [
  {
    id: "film-why-1",
    lane: "left",
    title: "تنوع ثقافي",
    description:
      "يُسهم الثراء والتنوع الثقافي في منطقة عسير في إلهام صُناع الأفلام وتحفيز الحس الإبداعي لديهم.",
    image: "/assets/film/3031f7f312de80d43b7987da3469513cef9830aa.jpg",
    textTheme: "light",
  },
  {
    id: "film-why-2",
    lane: "left",
    title: "عمق تاريخي",
    description:
      "أكثر من ٤ آلاف قرية تراثية تمنح المشهد السينمائي عمقاً بصرياً وسردياً نادراً في مكان واحد.",
    image: "/assets/film/216f4631aac0e23146a54ede4d47668e3a6b8c75 (1).png",
    textTheme: "light",
  },
  {
    id: "film-why-3",
    lane: "left",
    title: "مواقع متعددة",
    description:
      "من القمم العالية إلى السفوح والوديان، يمكن تصوير مشاهد متنوعة خلال نطاق جغرافي قريب ومترابط.",
    image: "/assets/film/f553c2485f7cee0001b8c78577a11b28d342a8d9.png",
    textTheme: "dark",
  },
  {
    id: "film-why-4",
    lane: "right",
    title: "تنوع طبيعي",
    description:
      "مزيج السحب والجبال والإضاءة الطبيعية يصنع كادرات بصرية قوية تناسب الإنتاجات السينمائية الكبرى.",
    image: "/assets/film/imghorizontal.png",
    textTheme: "light",
  },
  {
    id: "film-why-5",
    lane: "right",
    title: "بنية متنامية",
    description:
      "تسارع الخدمات اللوجستية والسياحية يسهّل عمليات الإنتاج والتصوير لفِرق العمل المحلية والدولية.",
    image: "/assets/film/cb7870bcdbeed166a47cfcfd91a8a0fa3f5c72b5.jpg",
    textTheme: "dark",
  },
  {
    id: "film-why-6",
    lane: "right",
    title: "قرب المواقع",
    description:
      "تقارب مواقع التصوير المختلفة يساعد على تقليل زمن التنقل ورفع كفاءة أيام التصوير.",
    image: "/assets/film/film-hero.png",
    textTheme: "light",
  },
];

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
  const rows = await fetchFilmWhyAseerSlides();
  return rows.length > 0 ? rows : FALLBACK_FILM_WHY_ASEER_SLIDES;
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

interface ApiFilmShowcaseCard {
  id: string;
  title?: string | null;
  category?: string | null;
  cover_image?: string | null;
  status?: string | null;
}

interface ApiFilmShowcaseCardsResponse {
  data: ApiFilmShowcaseCard[];
}

const normalizeFilmShowcaseCategory = (
  value: string | null | undefined,
  fallback: FilmShowcaseCategory,
): FilmShowcaseCategory => {
  if (value && FILM_SHOWCASE_FILTERS.includes(value as FilmShowcaseCategory)) {
    return value as FilmShowcaseCategory;
  }
  return fallback;
};

const transformFilmShowcaseCard = (
  row: ApiFilmShowcaseCard,
  directusUrl: string,
  fallback: FilmShowcaseCard,
): FilmShowcaseCard => {
  const image = row.cover_image
    ? `${directusUrl}/assets/${row.cover_image}`
    : fallback.image;
  return {
    id: row.id,
    title: row.title?.trim() || fallback.title,
    category: normalizeFilmShowcaseCategory(row.category, fallback.category),
    image,
  };
};

export const fetchFilmShowcaseCards = async (): Promise<FilmShowcaseCard[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/film_showcase`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const apiData: ApiFilmShowcaseCardsResponse = await response.json();
    if (!Array.isArray(apiData?.data)) return [];

    return apiData.data
      .filter((row) => !row.status || row.status === "published")
      .map((row, index) =>
        transformFilmShowcaseCard(
          row,
          directusUrl,
          FALLBACK_FILM_SHOWCASE_CARDS[
            index % FALLBACK_FILM_SHOWCASE_CARDS.length
          ],
        ),
      );
  } catch {
    return [];
  }
};

export const fetchFilmShowcaseCardsWithFallback = async (): Promise<
  FilmShowcaseCard[]
> => {
  const rows = await fetchFilmShowcaseCards();
  return rows.length > 0 ? rows : FALLBACK_FILM_SHOWCASE_CARDS;
};
