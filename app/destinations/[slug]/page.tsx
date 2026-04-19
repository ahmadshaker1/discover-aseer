import { notFound } from "next/navigation";
import AttractionsGuidesSection from "@/components/attractions/AttractionsGuidesSection";
import AttractionsHero from "@/components/attractions/AttractionsHero";
import { destinationIntroParagraphs } from "@/components/destinations/introCopy";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import DestinationsRelatedSection from "@/components/destinations/DestinationsRelatedSection";
import { fetchDestinationsWithFallback, getDestinationBySlug } from "@/components/destinations/data";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const list = await fetchDestinationsWithFallback();
  return list.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) {
    return { title: "وجهة غير موجودة" };
  }
  return {
    title: `${destination.title} | الوجهات`,
    description: destination.description,
  };
}

const DestinationDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const [destination, allDestinations, { guides }] = await Promise.all([
    getDestinationBySlug(slug),
    fetchDestinationsWithFallback(),
    fetchTourGuides(),
  ]);

  if (!destination) {
    notFound();
  }

  const displayGuides = guides.length > 0 ? guides : FALLBACK_GUIDES;
  return (
    <div className="flex w-full flex-col bg-white">
      <AttractionsHero
        breadcrumbs={[
          { label: "الوجهات", href: "/destinations" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title={destination.title}
        subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
        backgroundImage={destination.image}
      />

      <DestinationsIntroSection
        title={destination.title}
        imageUrl={destination.image}
        imageAlt=""
        paragraphs={destinationIntroParagraphs(destination)}
      />

      <AttractionsGuidesSection guides={displayGuides} />
      <DestinationsRelatedSection destinations={allDestinations} excludeSlug={destination.slug} />
      <DestinationsMapSection />
      <EventsInfo />
    </div>
  );
};

export default DestinationDetailPage;
