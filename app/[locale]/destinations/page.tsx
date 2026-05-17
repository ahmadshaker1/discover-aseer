import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import DestinationsMainPageContent from "@/components/destinations/DestinationsMainPageContent";
import { fetchDestinations } from "@/components/destinations/data";

const TOUR_GUIDE_REGISTER_HREF = "/tour-guides/register";

const DestinationsPage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const destinations = await fetchDestinations(locale);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("destinations") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={t("browseTitle")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/destinations/destination_banner.webp"
        primaryCta={{
          href: TOUR_GUIDE_REGISTER_HREF,
          label: t("contributeDestinations"),
        }}
      />

      <DestinationsMainPageContent
        destinations={destinations}
        filterLayout="browse"
      />
    </div>
  );
};

export default DestinationsPage;
