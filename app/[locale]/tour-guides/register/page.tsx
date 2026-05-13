import type { Metadata } from "next";
import TourGuideRegisterFlow from "@/components/tour-guides/TourGuideRegisterFlow/TourGuideRegisterFlow";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("tourGuidesRegister");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const TourGuideRegisterPage = () => {
  return (
    <div className="flex min-h-0 w-full flex-col bg-background pb-4 text-foreground sm:pb-6">
      <TourGuideRegisterFlow />
    </div>
  );
};

export default TourGuideRegisterPage;
