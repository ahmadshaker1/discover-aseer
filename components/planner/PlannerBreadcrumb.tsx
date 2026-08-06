import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";


const PlannerBreadcrumb = async () => {
  const t = await getTranslations("planner");
  const tCommon = await getTranslations("common");

  return (
    <div className="w-full px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10 md:pb-16 md:pt-12 lg:px-8">
      <div className="container mx-auto">
        {/* Breadcrumb - Centered */}
        <div className="mb-6 flex items-center justify-center text-sm font-medium text-muted-foreground sm:mb-8 sm:text-base">
          <Link href="/" className="transition-colors hover:text-foreground">
            {tCommon("breadcrumbHome")}
          </Link>
          <span className={`mx-2 inline-block text-muted-foreground rtl:rotate-180`}>{" › "}</span>
          <span className="text-muted-foreground">{t("title")}</span>
        </div>

        {/* Main Title - Centered, Big Text */}
        <div className="text-center">
          <h1
            className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("title")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PlannerBreadcrumb;
