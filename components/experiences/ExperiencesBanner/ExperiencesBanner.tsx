import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";

export default async function ExperiencesBanner() {
  const t = await getTranslations("experiencesPage");
  const tCommon = await getTranslations("common");

  return (
    <PageBanner
      breadcrumbs={[{ label: t("breadcrumb") }, { label: tCommon("breadcrumbHome"), href: "/" }]}
      title={t("title")}
      subtitle={t("subtitle")}
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
}
