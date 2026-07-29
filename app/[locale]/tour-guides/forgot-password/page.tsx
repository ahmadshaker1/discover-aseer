import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TourGuideForgotPassword from "@/components/tour-guides/TourGuidePortal/TourGuideForgotPassword";
import TourGuidePortalHero from "@/components/tour-guides/TourGuidePortal/TourGuidePortalHero";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("tourGuidePortal");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const TourGuideForgotPasswordPage = () => {
  return (
    <div className="w-full px-4 pb-24 pt-50 sm:px-6 sm:pb-28 md:px-10 lg:px-8 lg:pb-32">
      <TourGuideForgotPassword />
    </div>
  );
};

export default TourGuideForgotPasswordPage;
