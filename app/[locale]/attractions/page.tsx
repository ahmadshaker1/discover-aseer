import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import AttractionsMainPageContent from "@/components/attractions/AttractionsMainPageContent";
import { parseAttractionsTerrainParam } from "@/components/film/landscapeFilters";
import { fetchLandmarks } from "@/components/landmarks/data";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

interface AttractionsPageProps {
  searchParams: Promise<{ terrain?: string; page?: string }>;
}

const AttractionsPage = async ({ searchParams }: AttractionsPageProps) => {
  const locale = await getLocale();
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const { terrain: terrainParam, page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const initialTerrain = parseAttractionsTerrainParam(terrainParam);
  const { items: landmarks, totalPages } = await fetchLandmarks(locale, {
    page,
  });

  const assets = await fetchSiteAssets("attractions");
  const bannerUrl = getAssetUrl(
    assets,
    "Banner",
    "/assets/attractions/hero.jpg",
  );

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: t("breadcrumb") },
        ]}
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage={bannerUrl}
      />

      <AttractionsMainPageContent
        landmarks={landmarks}
        initialTerrain={initialTerrain}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AttractionsPage;
