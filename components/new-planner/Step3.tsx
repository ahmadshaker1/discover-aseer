import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { PlannerData } from "./types";

interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  plannerData: PlannerData;
  updatePlannerData: (updates: Partial<PlannerData>) => void;
}

import StepHeader from "./StepHeader";

export default function Step3({
  onPrev,
  onNext,
  plannerData,
  updatePlannerData,
}: Step3Props) {
  const t = useTranslations("Planner");

  const toggleInterest = (id: string) => {
    const currentInterests = plannerData.interests || [];
    if (currentInterests.includes(id)) {
      updatePlannerData({
        interests: currentInterests.filter((item) => item !== id),
      });
    } else {
      updatePlannerData({
        interests: [...currentInterests, id],
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        <StepHeader currentStep={3} />

        {/* Titles */}
        <div className="flex flex-col items-start mb-10">
          <h1
            className=" text-black dark:text-white"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("interestsTitle")}
          </h1>
        </div>

        {/* Style Selection */}
        <div className="mb-12 w-full max-w-[600px] flex flex-col items-start">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("exploreTitle")}
          </h2>

          <p
            className="text-[#535353] dark:text-gray-300 mb-2"
            style={{
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            {t("exploreDesc")}
          </p>

          <div
            className="w-full flex flex-wrap gap-4 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {[
              {
                id: "Nature",
                titleKey: "interestNature",
                icon: "/assets/planner/Step3/S3.1.svg",
              },
              {
                id: "Heritage and arts",
                titleKey: "interestHeritage",
                icon: "/assets/planner/Step3/S3.2.svg",
              },
              {
                id: "Culinary arts",
                titleKey: "interestFood",
                icon: "/assets/planner/Step3/S3.5.svg",
              },
              {
                id: "Adventures",
                titleKey: "interestAdventure",
                icon: "/assets/planner/Step3/S3.6.svg",
              },
            ].map((interestOption) => {
              const currentInterests = plannerData.interests || [];
              const isSelected = currentInterests.includes(interestOption.id);

              return (
                <button
                  key={interestOption.id}
                  onClick={() => toggleInterest(interestOption.id)}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    display: "flex",
                    height: "120px",
                    padding: "0 12px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "6px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    flex: "1 1 0",
                    minWidth: "140px",
                  }}
                >
                  <Image
                    src={interestOption.icon}
                    alt={t(interestOption.titleKey)}
                    width={24}
                    height={24}
                    className={
                      !isSelected ? "dark:brightness-0 dark:invert" : ""
                    }
                  />
                  <span style={{ fontSize: "18px", fontWeight: 700 }}>
                    {t(interestOption.titleKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-start gap-4 mt-8 max-w-[300px]">
          <button
            onClick={onPrev}
            className="cursor-pointer text-black dark:text-white border border-[rgba(40,0,72,0.16)] dark:border-white dark:bg-[#1C0F2A]"
            style={{
              display: "flex",
              height: "46px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flex: "1 0 0",
              borderRadius: "86px",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            {t("previous")}
          </button>

          <button
            onClick={() => {
              onNext();
            }}
            disabled={
              !plannerData.interests || plannerData.interests.length === 0
            }
            className={`cursor-pointer border border-[rgba(40,0,72,0.16)] dark:border-white/20 ${
              plannerData.interests && plannerData.interests.length > 0
                ? "bg-[#F3E4FF] text-[#7300CD] dark:bg-[#F3E4FF] dark:text-[#7300CD]"
                : "bg-[#D8D3E0] text-[#888] dark:bg-white/5 dark:text-gray-400"
            }`}
            style={{
              display: "flex",
              height: "46px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              borderRadius: "86px",
              fontSize: "20px",
              fontWeight: 600,
              cursor:
                plannerData.interests && plannerData.interests.length > 0
                  ? "pointer"
                  : "not-allowed",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {t("next")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180 "
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
