"use client";

import { useCallback, useState } from "react";
import TourGuideRegisterHero from "@/components/tour-guides/TourGuideRegisterHero/TourGuideRegisterHero";
import TourGuideRegisterProgress from "@/components/tour-guides/TourGuideRegisterProgress/TourGuideRegisterProgress";
import TourGuideRegisterStepOneForm from "@/components/tour-guides/TourGuideRegisterStepOneForm/TourGuideRegisterStepOneForm";

const TOTAL_TRACKED_FIELDS = 7;

const TourGuideRegisterFlow = () => {
  const [completedCount, setCompletedCount] = useState(0);

  const onCompletionChange = useCallback((completed: number) => {
    setCompletedCount(completed);
  }, []);

  return (
    <>
      <TourGuideRegisterHero
        bottomSlot={
          <TourGuideRegisterProgress
            completedCount={completedCount}
            totalCount={TOTAL_TRACKED_FIELDS}
            currentStep={1}
          />
        }
      />
      <div className="w-full px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:px-8 lg:pb-32 lg:pt-14">
        <TourGuideRegisterStepOneForm onCompletionChange={onCompletionChange} />
      </div>
    </>
  );
};

export default TourGuideRegisterFlow;
