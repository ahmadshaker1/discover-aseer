"use client";

import { useCallback, useState } from "react";
import TourGuideRegisterHero from "@/components/tour-guides/TourGuideRegisterHero/TourGuideRegisterHero";
import TourGuideRegisterProgress from "@/components/tour-guides/TourGuideRegisterProgress/TourGuideRegisterProgress";
import TourGuideRegisterStepOneForm, {
  TOUR_GUIDE_REQUIRED_FIELDS_COUNT,
} from "@/components/tour-guides/TourGuideRegisterStepOneForm/TourGuideRegisterStepOneForm";

const TOTAL_TRACKED_FIELDS = TOUR_GUIDE_REQUIRED_FIELDS_COUNT;

const TourGuideRegisterFlow = () => {
  const [completedCount, setCompletedCount] = useState(0);

  const onCompletionChange = useCallback((completed: number) => {
    setCompletedCount(completed);
  }, []);

  return (
    <>
      <TourGuideRegisterHero />
      <div className="w-full px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:px-8 lg:pb-32 lg:pt-14">
        <TourGuideRegisterStepOneForm onCompletionChange={onCompletionChange} />
      </div>
    </>
  );
};

export default TourGuideRegisterFlow;
