import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import DestinationsMainPageContent from "@/components/destinations/DestinationsMainPageContent";
import { fetchDestinationsWithFallback } from "@/components/destinations/data";

const TOUR_GUIDE_REGISTER_HREF = "/tour-guides/register";

const LocalizedDestinationsBrowsePage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");
  const destinations = await fetchDestinationsWithFallback(locale);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("destinations") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        breadcrumbDir={locale === "ar" ? "rtl" : "ltr"}
        title={t("browseTitle")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/activities/activities.jpg"
        primaryCta={{
          href: TOUR_GUIDE_REGISTER_HREF,
          label: t("contributeDestinations"),
        }}
      />

      <DestinationsMainPageContent destinations={destinations} filterLayout="browse" />
    </div>
  );
};

export default LocalizedDestinationsBrowsePage;
