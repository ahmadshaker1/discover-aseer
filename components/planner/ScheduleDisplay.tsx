"use client";

import React, { useEffect, useState } from "react";
import { Activity, PlanResponse } from "./types";
import SaveAndSharePlan from "./SaveAndSharePlan";

type ScheduleDisplayProps = {
  schedule?: PlanResponse;
};

// ==========================================
// figma icons
// ==========================================
const PrintIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);
const ShareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);
const DirectionIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
    <line x1="3" y1="22" x2="21" y2="22"></line>
  </svg>
);
const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#FBB03B"
    stroke="#FBB03B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const PinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const PeopleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const BillIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M6 12h.01M18 12h.01"></path>
  </svg>
);
const CarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
  </svg>
);
const ActivityTypeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// ==========================================
// Main Component
// ==========================================
export default function ScheduleDisplay({ schedule }: ScheduleDisplayProps) {
  // حالة (State) لحفظ اليوم المحدد حالياً
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    setIsPrinting(true);

    // Wait for print-only markup to be committed before opening print dialog.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });
  };

  if (!schedule || !schedule.days || schedule.days.length === 0) return null;

  const activeDay = schedule.days[activeDayIndex];

  const renderActivityCard = (
    activity: Activity,
    index: number,
    printMode = false,
  ) => (
    <div
      key={`${activity.title}-${index}`}
      className="relative z-10 mb-2 planner-print-activity"
    >
      <div className="flex justify-start items-start gap-4 mb-4 me-[10px]">
        <div className="z-10 bg-surface py-2 text-primary">
          <ActivityTypeIcon />
        </div>
        <div className="text-start pt-1">
          <p className="mb-1 text-[14px] font-bold text-primary">
            {activity.type}
          </p>
          <p className="text-[18px] font-bold text-foreground">
            {activity.time}
          </p>
        </div>
      </div>

      <div
        className={`me-14 flex flex-col-reverse items-center justify-between gap-6 rounded-3xl border border-border bg-surface p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] planner-print-card ${
          printMode
            ? "sm:flex-col"
            : "transition-transform hover:-translate-y-1 sm:flex-row"
        }`}
      >
        <div className="text-start w-full sm:w-auto ">
          <h4 className="mb-3 text-[22px] font-bold text-foreground">
            {activity.title}
          </h4>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2 text-[14px] text-muted-foreground">
              <StarIcon />
              <span>
                ({activity.reviewsCount}) {activity.rating}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 text-[14px] text-muted-foreground">
              <PinIcon />
              <span>{activity.locationText}</span>
            </div>
            <div className="mt-1 flex items-center justify-start gap-4 text-[14px] font-bold text-foreground">
              <div className="flex items-center gap-1.5">
                <span>{activity.priceRange}</span>
                <BillIcon />
              </div>
              <div className="flex items-center gap-1.5">
                <span>{activity.category}</span>
                <PeopleIcon />
              </div>
            </div>
          </div>
        </div>

        <a
          href={activity.googleMapsUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 px-6 py-2.5 font-bold text-primary planner-print-link ${
            printMode
              ? "sm:w-full"
              : "transition-colors hover:bg-primary/10 sm:w-auto"
          }`}
        >
          <DirectionIcon />
          الاتجاهات
        </a>
      </div>

      {activity.travelToNext && (
        <div className="me-[10px] mt-4 flex h-[80px] items-center justify-start gap-4 bg-surface planner-print-card">
          <div className="pt-2 text-start text-[13px] leading-relaxed text-muted-foreground">
            <p>{activity.travelToNext.duration}</p>
            <p>{activity.travelToNext.distance}</p>
          </div>
          <div className="z-10 bg-surface py-4 text-muted-foreground">
            <CarIcon />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto mt-16 w-full max-w-5xl text-foreground planner-print-root">
      {/* 1. العنوان وأزرار المشاركة والطباعة */}
      <div className="planner-screen-only flex flex-col-reverse sm:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-[32px] font-bold text-foreground sm:text-[40px]">
          خطتك {schedule.planDetails?.title || "خطتك"}
        </h2>
        <div className="flex gap-3 h-10">
          <SaveAndSharePlan currentPlan={schedule} />
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center gap-2 rounded-full border border-border px-6 py-2 font-bold text-muted-foreground transition hover:bg-muted disabled:opacity-60"
          >
            <PrintIcon />
            طباعة
          </button>
        </div>
      </div>

      {/* 2. شريط الأيام (التبويبات) */}
      <div
        className="planner-screen-only flex gap-4 overflow-x-auto pb-4 mb-10 hide-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {schedule.days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`flex h-[100px] w-[100px] shrink-0 flex-col items-center justify-center rounded-4xl border-2 transition-all ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface hover:border-muted-foreground"
              }`}
            >
              <span
                className={`mb-1 text-[16px] font-bold ${isActive ? "text-primary" : "text-foreground"}`}
              >
                {day.dayLabel.replace("اليوم ", "اليوم\n")}
              </span>
              <span
                className={`text-[12px] ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {day.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. التايم لاين لليوم المحدد */}
      <div className="planner-screen-only">
        <h3 className="mb-8 text-start text-[20px] font-bold text-foreground">
          {activeDay.dayLabel}
        </h3>

        <div className="relative">
          {/* الخط المنقط العمودي */}
          <div className="absolute bottom-0 end-[19px] top-8 z-0 w-0 border-e-2 border-dashed border-border"></div>

          {activeDay.activities.map((activity, index) =>
            renderActivityCard(activity, index),
          )}
        </div>
      </div>

      {/* 4. نسخة الطباعة: جميع أيام الخطة */}
      <div className="planner-print-only hidden">
        <h2 className="mb-8 text-[28px] font-bold text-foreground">
          خطتك {schedule.planDetails?.title || "خطتك"}
        </h2>

        {schedule.days.map((day, dayIdx) => (
          <section
            key={`${day.dayLabel}-${dayIdx}`}
            className="planner-print-day mb-10"
          >
            <h3 className="mb-6 text-start text-[22px] font-bold text-foreground">
              {day.dayLabel} - {day.date}
            </h3>

            <div className="relative">
              <div className="absolute bottom-0 end-[19px] top-8 z-0 w-0 border-e-2 border-dashed border-border"></div>
              {day.activities.map((activity, index) =>
                renderActivityCard(activity, index, true),
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
