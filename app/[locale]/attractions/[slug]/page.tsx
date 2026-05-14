import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import AttractionsHero from "@/components/attractions/AttractionsHero";
import AttractionsIntroSection from "@/components/attractions/AttractionsIntroSection";
import AttractionsGuidesSection from "@/components/attractions/AttractionsGuidesSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AttractionsMapSection from "@/components/attractions/AttractionsMapSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import {
  fetchAttractionByHrefSegment,
  fetchLandmarks,
  getAttractionHrefSegments,
  type Landmark,
} from "@/components/landmarks/data";
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

function introPreviewImage(landmark: Landmark): string {
  const firstGallery = landmark.galleryImageUrls?.[0];
  if (firstGallery) return firstGallery;
  return landmark.image;
}

function buildIntroHtml(attraction: Landmark): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return (
    attraction.contentHtml?.trim() ||
    attraction.description?.trim() ||
    (attraction.subtitle?.trim() ? `<p>${esc(attraction.subtitle)}</p>` : "")
  );
}

function buildMapHref(attraction: Landmark): string | undefined {
  if (attraction.mapLink) return attraction.mapLink;
  const lat = attraction.latitude;
  const lon = attraction.longitude;
  if (lat != null && lon != null) {
    return `https://www.google.com/maps?q=${lat},${lon}`;
  }
  return undefined;
}

interface AttractionSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const AttractionSlugPage = async ({ params }: AttractionSlugPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const { slug } = await params;
  const attraction = await fetchAttractionByHrefSegment(slug, locale);
  if (!attraction) notFound();

  const [t, tCommon, tDest, { guides }, allLandmarks] = await Promise.all([
    getTranslations("attractionsPage"),
    getTranslations("common"),
    getTranslations("destinations"),
    fetchTourGuides(),
    fetchLandmarks(locale),
  ]);

  const displayGuides = guides.length > 0 ? guides : FALLBACK_GUIDES;

  const related = allLandmarks
    .filter((l) => l.id !== attraction.id && l.hrefSegment)
    .sort((a, b) => {
      const score = (x: Landmark) =>
        attraction.cityId && x.cityId === attraction.cityId ? 1 : 0;
      return score(b) - score(a);
    })
    .slice(0, 8);

  const mapHref = buildMapHref(attraction);
  const introHtml = buildIntroHtml(attraction);
  const heroSubtitle = attraction.subtitle?.trim() || tCommon("subtitleOneVisit");

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AttractionsHero
        breadcrumbs={[
          { label: attraction.title },
          { label: t("breadcrumb"), href: "/attractions" },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={attraction.title}
        subtitle={heroSubtitle}
        backgroundImage={attraction.image}
      />

      <AttractionsIntroSection
        imageUrl={introPreviewImage(attraction)}
        title={attraction.title}
        descriptionHtml={introHtml || undefined}
      />

      {attraction.galleryImageUrls && attraction.galleryImageUrls.length > 0 ? (
        <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 md:px-[60px]">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {attraction.galleryImageUrls.map((src) => (
              <div
                key={src}
                className="relative h-56 w-72 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-64 sm:w-80"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="320px" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <AttractionsGuidesSection guides={displayGuides} />
      <AttractionsLandmarksSection
        landmarks={related}
        showFilters={false}
        landmarkDetailBasePath="/attractions"
        title={tCommon("exploreAttractionsDefault")}
      />
      <AttractionsMapSection
        mapHref={mapHref}
        ctaLabel={tDest("mapViewOnMap", { area: attraction.title })}
        imageAlt={tDest("mapAlt", { area: attraction.title })}
      />
      <EventsInfo />
    </div>
  );
};

export async function generateStaticParams() {
  const segments = await getAttractionHrefSegments("ar");
  return segments.map((slug) => ({ slug }));
}

export default AttractionSlugPage;
