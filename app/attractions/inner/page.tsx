import { getTranslations } from "next-intl/server";
import AttractionsHero from "@/components/attractions/AttractionsHero";
import AttractionsIntroSection from "@/components/attractions/AttractionsIntroSection";
import AttractionsGuidesSection from "@/components/attractions/AttractionsGuidesSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AttractionsMapSection from "@/components/attractions/AttractionsMapSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { fetchLandmarks, type Landmark } from "@/components/landmarks/data";
import { fetchTourGuides } from "@/components/tour-guides/data";
import type { TourGuideData } from "@/components/tour-guides/TourGuideCard/TourGuideCard";

const FALLBACK_GUIDES: TourGuideData[] = [
  {
    id: "g-1",
    name: "أحمد عبدالله",
    location: "أبها",
    profileImage: "/assets/experiences/experiences.png",
    languages: [{ code: "ar", name: "العربية", flag: "🇸🇦" }],
    whatsappUrl: "#",
    description: "مرشد سياحي محترف في أبرز معالم عسير.",
  },
];

const FALLBACK_LANDMARKS: Landmark[] = [
  {
    id: "l-1",
    title: "سوق الثلاثاء",
    location: "أبها",
    area: "أبها",
    description: "سوق تراثي يعكس ثقافة المنطقة ومنتجاتها المحلية.",
    guideName: "أحمد",
    image: "/restaurant/img1.png",
  },
];

const AttractionsInnerPage = async () => {
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const [{ guides }, landmarks] = await Promise.all([
    fetchTourGuides(),
    fetchLandmarks(),
  ]);
  const displayGuides = guides.length > 0 ? guides : FALLBACK_GUIDES;
  const displayLandmarks = landmarks.length > 0 ? landmarks : FALLBACK_LANDMARKS;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AttractionsHero
        breadcrumbs={[
          { label: t("breadcrumb") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={t("innerTitle")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/attractions/attractions-hero.png"
      />
      <AttractionsIntroSection imageUrl="/assets/attractions/attractions-hero.png" />
      <AttractionsGuidesSection guides={displayGuides} />
      <AttractionsLandmarksSection landmarks={displayLandmarks} showFilters={false} />
      <AttractionsMapSection />
      <EventsInfo />
    </div>
  );
};

export default AttractionsInnerPage;
