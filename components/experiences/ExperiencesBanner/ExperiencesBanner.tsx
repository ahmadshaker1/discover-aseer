import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";

export default async function ExperiencesBanner() {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const tCommon = await getTranslations("common");

  return (
    <PageBanner
      breadcrumbs={[
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ]}
      title={t("title")}
      subtitle={t("subtitle")}
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
}
