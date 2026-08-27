import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import AttractionsGallerySection from "@/components/attractions/AttractionsGallerySection";
import AttractionsHero from "@/components/attractions/AttractionsHero";
import AttractionsIntroSection from "@/components/attractions/AttractionsIntroSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AttractionsMapSection from "@/components/attractions/AttractionsMapSection";
import {
  fetchAttractions,
  getAttractionBySlug,
  getRelatedAttractions,
  resolveAttractionMapTarget,
} from "@/components/attractions/data";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import type { LocaleCode } from "@/lib/i18n/localized";

interface AttractionSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function AttractionSlugPage({
  params,
}: AttractionSlugPageProps) {
  const locale = (await getLocale()) as LocaleCode;
  const t = await getTranslations();
  const tAttr = await getTranslations("attractionsPage");
  const { slug } = await params;

  const [attraction, allAttractionsResult] = await Promise.all([
    getAttractionBySlug(slug, locale),
    fetchAttractions(locale),
  ]);
  const allAttractions = allAttractionsResult.items;

  if (!attraction) {
    notFound();
  }

  const related = getRelatedAttractions(attraction, allAttractions, 4);
  const mapTarget = resolveAttractionMapTarget(attraction);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AttractionsHero
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: tAttr("breadcrumb"), href: "/attractions" },
          { label: attraction.title },
        ]}
        title={attraction.title}
        subtitle={attraction.subtitle || attraction.location}
        backgroundImage={attraction.image}
      />

      <AttractionsIntroSection
        title={attraction.title}
        imageUrl={attraction.image}
        imageAlt={attraction.title}
        descriptionHtml={attraction.contentHtml}
      />

      <AttractionsGallerySection
        title={tAttr("galleryTitle")}
        images={attraction.galleryImages}
      />

      {related.length > 0 ? (
        <AttractionsLandmarksSection
          landmarks={related}
          title={tAttr("relatedAttractionsTitle")}
          showFilters={false}
        />
      ) : null}

      <AttractionsMapSection
        areaLabel={attraction.title}
        mapTarget={mapTarget}
      />

      <EventsInfo />
    </div>
  );
}

export async function generateStaticParams() {
  const { items: rows } = await fetchAttractions("ar");
  return rows.map((row) => ({ slug: row.slug }));
}
