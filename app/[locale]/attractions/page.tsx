import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import AttractionsMainPageContent from "@/components/attractions/AttractionsMainPageContent";
import { parseAttractionsTerrainParam } from "@/components/film/landscapeFilters";
import { fetchLandmarks } from "@/components/landmarks/data";

interface AttractionsPageProps {
  searchParams: Promise<{ terrain?: string }>;
}

const AttractionsPage = async ({ searchParams }: AttractionsPageProps) => {
  const locale = await getLocale();
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const { terrain: terrainParam } = await searchParams;
  const initialTerrain = parseAttractionsTerrainParam(terrainParam);
  const landmarks = await fetchLandmarks(locale);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: t("breadcrumb") },
        ]}
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/assets/attractions/hero.jpg"
      />

      <AttractionsMainPageContent
        landmarks={landmarks}
        initialTerrain={initialTerrain}
      />
    </div>
  );
};

export default AttractionsPage;
