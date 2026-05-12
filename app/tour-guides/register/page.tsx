import type { Metadata } from "next";
import TourGuideRegisterFlow from "@/components/tour-guides/TourGuideRegisterFlow/TourGuideRegisterFlow";
import { getLocale } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  return {
    title: isRtl
      ? "نموذج تسجيل المرشدين السياحيين | Discover Aseer"
      : "Tour guide registration form | Discover Aseer",
    description: isRtl
      ? "تسجيل كمرشد سياحي في منطقة عسير"
      : "Register as a tour guide in Aseer.",
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
