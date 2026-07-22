import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PlanItineraryProps {
  data: any;
}

export default function PlanItinerary({ data }: PlanItineraryProps) {
  const t = useTranslations("Planner");

  const [planData, setPlanData] = useState(data);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleDeleteDay = (index: number) => {
    const newDays = [...planData.days];
    newDays.splice(index, 1);
    setPlanData({ ...planData, days: newDays });

    // Adjust selected index if needed
    if (selectedDayIndex >= newDays.length) {
      setSelectedDayIndex(Math.max(0, newDays.length - 1));
    }
  };

  if (!planData || !planData.days || planData.days.length === 0) {
    return (
      <div className="w-full text-center py-10">No plan data available.</div>
    );
  }

  const days = planData.days;
  const currentDay = days[selectedDayIndex];

  return (
    <div className="flex flex-col items-start w-full gap-8">
      {/* Header Row */}
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-[32px] font-bold text-black dark:text-white">
          خطتك
        </h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            طباعة
          </button>
          <button className="flex items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            مشاركة
          </button>
        </div>
      </div>

      {/* Days Cards Selector */}
      <div
        className="w-full flex gap-4 overflow-x-auto pb-4"
        style={{ fontFamily: "IBM Plex Sans Arabic" }}
      >
        {days.map((day: any, index: number) => {
          const isSelected = selectedDayIndex === index;
          return (
            <div
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`cursor-pointer transition-colors flex flex-col justify-center items-center shrink-0 ${
                isSelected
                  ? "bg-[#CEEEEE] text-black"
                  : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"
              }`}
              style={{
                width: "105px",
                minHeight: "120px",
                padding: "16px 12px",
                gap: "8px",
                borderRadius: "20px",
                border: isSelected
                  ? "2px solid #00BBB4"
                  : "1px solid rgba(0, 0, 0, 0.33)",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {t(`day${index + 1}`)}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDay(index);
                }}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
                title="حذف اليوم"
              >
                <Image
                  src="/assets/planner/delete-bin-6-line.svg"
                  alt="Delete"
                  width={20}
                  height={20}
                  className={
                    isSelected ? "" : "dark:invert opacity-70 hover:opacity-100"
                  }
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Current Day Content (Temporary simple view) */}
      {currentDay && (
        <div className="w-full flex flex-col gap-6 mt-4">
          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#1C0F2A]">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              الفعاليات
            </h3>
            <pre className="text-sm text-black dark:text-white" dir="ltr">
              {JSON.stringify(currentDay.events, null, 2)}
            </pre>
          </div>

          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#1C0F2A]">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              التجارب
            </h3>
            <pre className="text-sm text-black dark:text-white" dir="ltr">
              {JSON.stringify(currentDay.experiences, null, 2)}
            </pre>
          </div>

          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#1C0F2A]">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              المطاعم
            </h3>
            <pre className="text-sm text-black dark:text-white" dir="ltr">
              {JSON.stringify(currentDay.restaurants, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
