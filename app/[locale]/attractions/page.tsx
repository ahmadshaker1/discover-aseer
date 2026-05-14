import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import AttractionsMainPageContent from "@/components/attractions/AttractionsMainPageContent";
import { fetchLandmarks, type Landmark } from "@/components/landmarks/data";
import type { LocaleCode } from "@/lib/i18n/localized";

const FALLBACK_ATTRACTIONS: Landmark[] = [
  {
    id: "a-1",
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
  },
  {
    id: "a-2",
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
  },
  {
    id: "a-3",
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
  },
  {
    id: "a-4",
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
  },
  {
    id: "a-5",
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
  },
  {
    id: "a-6",
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
  },
];

const AttractionsPage = async () => {
  const locale = (await getLocale()) as LocaleCode;
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  /**
   * Backend handoff:
   * - This is the main attractions listing page opened from the navbar.
   * - Main attractions list uses Directus data from `fetchLandmarks()`.
   * - `FALLBACK_ATTRACTIONS` keeps the UI available when API is empty.
   */
  const landmarks = await fetchLandmarks(locale);
  const displayLandmarks = landmarks.length > 0 ? landmarks : FALLBACK_ATTRACTIONS;

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

      <AttractionsMainPageContent landmarks={displayLandmarks} />
    </div>
  );
};

export default AttractionsPage;

