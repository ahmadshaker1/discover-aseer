import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import DestinationsMainPageContent from "@/components/destinations/DestinationsMainPageContent";
import { fetchDestinations } from "@/components/destinations/data";
import { parseDestinationsFilterParam } from "@/components/destinations/filterOptions";

const TOUR_GUIDE_REGISTER_HREF = "/tour-guides/register";

interface DestinationsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

const DestinationsPage = async ({ searchParams }: DestinationsPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const { filter: filterParam } = await searchParams;
  const initialDestinationFilter = parseDestinationsFilterParam(filterParam);
  const destinations = await fetchDestinations(locale);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: tCommon("destinations") },
        ]}
        title={t("browseTitle")}
        subtitle={t("browseSubtitle")}
        backgroundImage="/assets/destinations/hero.jpeg"
        hidePattern
        primaryCta={{
          href: TOUR_GUIDE_REGISTER_HREF,
          label: t("contributeDestinations"),
        }}
      />

      <DestinationsMainPageContent
        destinations={destinations}
        filterLayout="browse"
        initialDestinationFilter={initialDestinationFilter}
      />
    </div>
  );
};

export default DestinationsPage;
