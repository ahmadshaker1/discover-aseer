import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import DestinationsMainPageContent from "@/components/destinations/DestinationsMainPageContent";
import { fetchDestinations } from "@/components/destinations/data";
import { parseDestinationsFilterParam } from "@/components/destinations/filterOptions";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

const TOUR_GUIDE_PORTAL_HREF = "/tour-guides/portal";

interface DestinationsPageProps {
  searchParams: Promise<{ filter?: string; page?: string }>;
}

const DestinationsPage = async ({ searchParams }: DestinationsPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const { filter: filterParam, page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const initialDestinationFilter = parseDestinationsFilterParam(filterParam);
  const { items: destinations } = await fetchDestinations(locale);

  const assets = await fetchSiteAssets("destinations");
  const bannerUrl = getAssetUrl(
    assets,
    "Banner",
    "/assets/destinations/hero.jpeg",
  );

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: tCommon("destinations") },
        ]}
        title={t("browseTitle")}
        subtitle={t("browseSubtitle")}
        backgroundImage={bannerUrl}
        hidePattern
        primaryCta={{
          href: TOUR_GUIDE_PORTAL_HREF,
          label: t("contributeDestinations"),
        }}
      />

      <DestinationsMainPageContent
        destinations={destinations}
        filterLayout="browse"
        initialDestinationFilter={initialDestinationFilter}
        currentPage={page}
      />
    </div>
  );
};

export default DestinationsPage;
