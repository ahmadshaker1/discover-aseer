import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import AttractionsMainPageContent from "@/components/attractions/AttractionsMainPageContent";
import { parseAttractionsTerrainParam } from "@/components/film/landscapeFilters";
import { fetchLandmarks, type Landmark } from "@/components/landmarks/data";

const fallbackAttraction = (
  partial: Pick<Landmark, "id" | "slug" | "title"> & Partial<Landmark>,
): Landmark => ({
  subtitle: "",
  location: "أبها",
  area: "أبها",
  city: "أبها",
  description: "",
  contentHtml: "",
  guideName: "",
  image: "/assets/experiences/experiences.png",
  galleryImages: ["/assets/experiences/experiences.png"],
  categoryLabel: "المعالم",
  interestTags: ["culture"],
  ...partial,
});

const FALLBACK_ATTRACTIONS: Landmark[] = [
  fallbackAttraction({
    id: "a-1",
    slug: "souq-al-thulatha",
    title: "سوق الثلاثاء",
    location: "أبها",
    area: "أبها",
    description: "تسلق جبل سودا مع متسلق الجبال المحلي فيصل",
    guideName: "فيصل",
    image: "/restaurant/img1.png",
    cityId: "abha",
    travelerTypes: ["solo", "couple"],
    priceFrom: 0,
    priceTo: 30,
    interestTags: ["historical", "culture", "shopping"],
  }),
  fallbackAttraction({
    id: "a-2",
    slug: "rijal-almaa",
    title: "قرية رجال ألمع",
    location: "رجال ألمع",
    area: "محايل عسير",
    description: "استكشاف الفن المعماري التراثي في جولة ثقافية",
    guideName: "سارة",
    image: "/restaurant/img2.png",
    cityId: "mahayil",
    travelerTypes: ["couple", "family"],
    priceFrom: 50,
    priceTo: 120,
    interestTags: ["historical", "culture"],
  }),
  fallbackAttraction({
    id: "a-3",
    slug: "al-soudah",
    title: "جبال السودة",
    location: "حديقة السودة ، أبها",
    area: "أبها",
    description: "مغامرة مشي في الطبيعة واستمتاع بالإطلالة",
    guideName: "محمد",
    image: "/restaurant/img3.png",
    cityId: "abha",
    travelerTypes: ["solo", "small-group", "large-group"],
    priceFrom: 20,
    priceTo: 220,
    interestTags: ["nature", "adventure"],
  }),
  fallbackAttraction({
    id: "a-4",
    slug: "abu-sirah-palace",
    title: "قصر أبو سراح",
    location: "أبها",
    area: "أبها",
    description: "زيارة القصور التاريخية مع تجربة تراثية متكاملة",
    guideName: "أحمد",
    image: "/assets/attractions/attractions-hero.png",
    cityId: "abha",
    travelerTypes: ["family", "large-group"],
    priceFrom: 60,
    priceTo: 180,
    interestTags: ["historical", "culture"],
  }),
  fallbackAttraction({
    id: "a-5",
    slug: "habala-park",
    title: "منتزه الحبلة",
    location: "الحبلة",
    area: "أبها",
    description: "تجربة التلفريك والمناظر الجبلية الخلابة",
    guideName: "نورة",
    image: "/restaurant/img4.png",
    cityId: "abha",
    travelerTypes: ["couple", "family", "small-group"],
    priceFrom: 70,
    priceTo: 260,
    interestTags: ["nature", "adventure"],
  }),
  fallbackAttraction({
    id: "a-6",
    slug: "abu-khayal-park",
    title: "منتزه أبو خيال",
    location: "أبها",
    area: "أبها",
    description: "جلسات طبيعية وممرات للمشي وإطلالات بانورامية",
    guideName: "ليان",
    image: "/restaurant/img2.png",
    cityId: "abha",
    travelerTypes: ["family", "small-group"],
    priceFrom: 0,
    priceTo: 40,
    interestTags: ["nature", "relaxation"],
  }),
];

interface AttractionsPageProps {
  searchParams: Promise<{ terrain?: string }>;
}

const AttractionsPage = async ({ searchParams }: AttractionsPageProps) => {
  const locale = await getLocale();
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const { terrain: terrainParam } = await searchParams;
  const initialTerrain = parseAttractionsTerrainParam(terrainParam);
  /**
   * Backend handoff:
   * - This is the main attractions listing page opened from the navbar.
   * - Main attractions list uses Directus data from `fetchLandmarks()`.
   * - `FALLBACK_ATTRACTIONS` keeps the UI available when API is empty.
   * - Optional `?city=` matches filter city ids (`filterOptions` CITY_DEFS).
   */
  const landmarks = await fetchLandmarks(locale);
  const displayLandmarks =
    landmarks.length > 0 ? landmarks : FALLBACK_ATTRACTIONS;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: t("breadcrumb") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={t("title")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/attractions/attractions-hero.png"
      />

      <AttractionsMainPageContent
        landmarks={displayLandmarks}
        initialTerrain={initialTerrain}
      />
    </div>
  );
};

export default AttractionsPage;
