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
  {
    id: "g-2",
    name: "سارة عبدالله",
    location: "أبها",
    profileImage: "/assets/experiences/experiences.png",
    languages: [{ code: "ar", name: "العربية", flag: "🇸🇦" }],
    whatsappUrl: "#",
    description: "جولات تراثية وثقافية للزوار.",
  },
  {
    id: "g-3",
    name: "نورة عبدالله",
    location: "خميس مشيط",
    profileImage: "/assets/experiences/experiences.png",
    languages: [{ code: "ar", name: "العربية", flag: "🇸🇦" }],
    whatsappUrl: "#",
    description: "تنظيم مسارات سياحية عائلية متنوعة.",
  },
  {
    id: "g-4",
    name: "محمد عبدالله",
    location: "رجال ألمع",
    profileImage: "/assets/experiences/experiences.png",
    languages: [{ code: "ar", name: "العربية", flag: "🇸🇦" }],
    whatsappUrl: "#",
    description: "خبرة في المعالم الطبيعية والتاريخية.",
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
  {
    id: "l-2",
    title: "قرية رجال ألمع",
    location: "رجال ألمع",
    area: "رجال ألمع",
    description: "قرية تاريخية ذات طراز معماري فريد في عسير.",
    guideName: "سارة",
    image: "/restaurant/img2.png",
  },
  {
    id: "l-3",
    title: "جبال السودة",
    location: "السودة",
    area: "السودة",
    description: "وجهة طبيعية رائعة للاستمتاع بالأجواء المعتدلة.",
    guideName: "نورة",
    image: "/restaurant/img3.png",
  },
  {
    id: "l-4",
    title: "قصر أبو سراح",
    location: "أبها",
    area: "أبها",
    description: "أحد أبرز المعالم التراثية التي تحكي تاريخ المنطقة.",
    guideName: "محمد",
    image: "/restaurant/img4.png",
  },
];

const AttractionsPage = async () => {
  /**
   * Backend handoff:
   * - Hero image is currently local: `/assets/attractions/attractions-hero.png`.
   * - Tour guides data comes from `fetchTourGuides()` (Directus-ready in components/tour-guides/data.ts).
   * - Landmarks data comes from `fetchLandmarks()` (Directus-ready in components/landmarks/data.ts).
   * - The "عرض المزيد" button inside the landmarks block points to `/landmarks` (listing page).
   * - Fallback arrays below keep UI visible if API returns empty.
   */
  const [{ guides }, landmarks] = await Promise.all([fetchTourGuides(), fetchLandmarks()]);
  const displayGuides = guides.length > 0 ? guides : FALLBACK_GUIDES;
  const displayLandmarks = landmarks.length > 0 ? landmarks : FALLBACK_LANDMARKS;

  return (
    <div className="flex w-full flex-col bg-white">
      <AttractionsHero
        breadcrumbs={[
          { label: "التجارب" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title="قصور آل أبو سراح"
        subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
        backgroundImage="/assets/attractions/attractions-hero.png"
      />

      <AttractionsIntroSection imageUrl="/assets/attractions/attractions-hero.png" />
      <AttractionsGuidesSection guides={displayGuides} />
      <AttractionsLandmarksSection landmarks={displayLandmarks} />
      <AttractionsMapSection />
      <EventsInfo />
    </div>
  );
};

export default AttractionsPage;

