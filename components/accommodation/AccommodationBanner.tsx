import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";

export default async function AccommodationBanner() {
  const t = await getTranslations("accommodationPage");
  const tCommon = await getTranslations("common");

  return (
    <PageBanner
      breadcrumbs={[
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ]}
      title={t("title")}
      subtitle={t("subtitle")}
      backgroundImage="/assets/accommodation/accomodation-banner.webp"
      hidePattern
    />
  );
}
