import { useTranslations } from "next-intl";
import Link from "next/link";
import { PlannerData } from "./types";

interface Step4Props {
  onPrev: () => void;
  onSubmit: () => void;
  plannerData: PlannerData;
  updatePlannerData: (updates: Partial<PlannerData>) => void;
  isSubmitting?: boolean;
}

import StepHeader from "./StepHeader";

export default function Step4({
  onPrev,
  onSubmit,
  plannerData,
  updatePlannerData,
  isSubmitting,
}: Step4Props) {
  const t = useTranslations("Planner");

  const toggleFoodPreference = (id: string) => {
    const current = plannerData.foodPreferences || [];
    if (current.includes(id)) {
      updatePlannerData({
        foodPreferences: current.filter((item) => item !== id),
      });
    } else {
      updatePlannerData({ foodPreferences: [...current, id] });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        <StepHeader currentStep={4} />

        {/* Titles */}
        <div className="flex flex-col items-start mb-10">
          <h1
            className="mb-2 text-black dark:text-white"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("foodPreferencesTitle")}
          </h1>
        </div>

        {/* Section 1: Meals Count */}
        <div className="w-full flex flex-col mb-12">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("mealsCountTitle")}
          </h2>
          <div
            className="w-full flex flex-wrap gap-2 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {[
              { id: "3", label: t("mealsCount3") },
              { id: "2", label: t("mealsCount2") },
              { id: "1", label: t("mealsCount1") },
              { id: "0", label: t("mealsCount0") },
            ].map((meal) => {
              const isSelected = plannerData.mealsCount === meal.id;
              return (
                <button
                  key={meal.id}
                  onClick={() => updatePlannerData({ mealsCount: meal.id })}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "6px",
                    borderRadius: "55px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {meal.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Food Preferences */}
        <div className="w-full flex flex-col  mb-12">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("foodTypeTitle")}
          </h2>
          <div
            className="w-full flex flex-wrap gap-4 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {[
              { id: "khaleeji cuisine", title: t("foodKhaleeji") },
              { id: "Lebanese cuisine", title: t("foodLebanese") },
              { id: "Italian cuisine", title: t("foodItalian") },
              { id: "Indian cuisine", title: t("foodIndian") },
              { id: "International cuisines", title: t("foodInternational") },
              { id: "American cuisine", title: t("foodAmerican") },
              { id: "Cafes", title: t("foodCafes") },
              { id: "Local cuisine", title: t("foodLocal") },
            ].map((option) => {
              const currentPrefs = plannerData.foodPreferences || [];
              const isSelected = currentPrefs.includes(option.id);
              const isDisabled =
                !plannerData.mealsCount || plannerData.mealsCount === "0";

              return (
                <button
                  key={option.id}
                  onClick={() => toggleFoodPreference(option.id)}
                  disabled={isDisabled}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{
                    display: "flex",
                    minHeight: "120px",
                    padding: "16px 12px",
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
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      textAlign: "start",
                    }}
                  >
                    {option.title}
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
            disabled={isSubmitting}
            className={`cursor-pointer text-black dark:text-white border border-[rgba(40,0,72,0.16)] dark:border-white dark:bg-[#1C0F2A] ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
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
            onClick={onSubmit}
            disabled={
              !plannerData.mealsCount ||
              (plannerData.mealsCount !== "0" &&
                (!plannerData.foodPreferences ||
                  plannerData.foodPreferences.length === 0)) ||
              isSubmitting
            }
            className={`cursor-pointer border border-[rgba(40,0,72,0.16)] dark:border-white/20 ${
              plannerData.mealsCount &&
              (plannerData.mealsCount === "0" ||
                (plannerData.foodPreferences &&
                  plannerData.foodPreferences.length > 0))
                ? "bg-[#F3E4FF] text-[#7300CD] dark:bg-[#F3E4FF] dark:text-[#7300CD]"
                : "bg-[#D8D3E0] text-[#888] dark:bg-white/5 dark:text-gray-400"
            } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
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
                !plannerData.mealsCount ||
                (plannerData.mealsCount !== "0" &&
                  (!plannerData.foodPreferences ||
                    plannerData.foodPreferences.length === 0)) ||
                isSubmitting
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.2s ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-6 w-6 text-[#7300CD]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                {t("planMyTrip")}
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
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
