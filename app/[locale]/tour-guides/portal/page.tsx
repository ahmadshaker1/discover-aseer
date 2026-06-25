import type { Metadata } from "next";
import TourGuidePortalFlow from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFlow";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("tourGuidePortal");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const TourGuidePortalPage = () => {
  return <TourGuidePortalFlow />;
};

export default TourGuidePortalPage;
