import type { Metadata } from "next";
import TourGuideRegisterFlow from "@/components/tour-guides/TourGuideRegisterFlow/TourGuideRegisterFlow";

export const metadata: Metadata = {
  title: "نموذج تسجيل المرشدين السياحيين | Discover Aseer",
  description: "تسجيل كمرشد سياحي في منطقة عسير",
};

const TourGuideRegisterPage = () => {
  return (
    <div className="flex min-h-0 w-full flex-col bg-white pb-4 sm:pb-6">
      <TourGuideRegisterFlow />
    </div>
  );
};

export default TourGuideRegisterPage;
