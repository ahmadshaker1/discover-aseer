import { useTranslations } from "next-intl";
import Link from "next/link";
import Calendar from "./Calendar";
import { PlannerData } from "./types";

import StepHeader from "./StepHeader";

interface Step1Props {
  onNext: () => void;
  onPrev: () => void;
  plannerData: PlannerData;
  updatePlannerData: (updates: Partial<PlannerData>) => void;
}

export default function Step1({
  onNext,
  onPrev,
  plannerData,
  updatePlannerData,
}: Step1Props) {
  const t = useTranslations("Planner");

  const renderDaysText = (count: number) => {
    if (count === 1) return t("oneDay");
    if (count === 2) return t("twoDays");
    return t("daysFormat", { count });
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        <StepHeader currentStep={1} />
        {/* Titles */}
        <div className="w-full flex flex-col items-start text-start mb-5">
          <h1
            className="mb-5 text-black dark:text-white"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("visitDetailsTitle")}
          </h1>

          <h2
            className="mb-2 text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("howManyDays")}
          </h2>
        </div>
        {/* Days Selection */}
        <div
          className="mb-12 w-full max-w-[600px] flex  flex-wrap gap-2"
          style={{
            alignItems: "flex-start",
            alignContent: "flex-start",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isSelected = plannerData.selectedDays === day;
            return (
              <button
                key={day}
                onClick={() => updatePlannerData({ selectedDays: day })}
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
                {renderDaysText(day)}
              </button>
            );
          })}
        </div>
        {/* Calendar Component */}
        <Calendar
          selectedDate={plannerData.selectedDate}
          onSelectDate={(date) => updatePlannerData({ selectedDate: date })}
        />
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
            onClick={onNext}
            disabled={!plannerData.selectedDays || !plannerData.selectedDate} // Disable if no day or date selected
            className={`cursor-pointerborder border-[rgba(40,0,72,0.16)] dark:border-white/20 ${
              plannerData.selectedDays && plannerData.selectedDate
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
                plannerData.selectedDays && plannerData.selectedDate
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
