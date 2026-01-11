"use client";

import { useState } from "react";
import { PlanResponse } from "./types";
import ScheduleCard from "./ScheduleCard";

interface ScheduleDisplayProps {
  schedule: PlanResponse;
}

const ScheduleDisplay = ({ schedule }: ScheduleDisplayProps) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay = schedule.days[currentDayIndex];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: schedule.planDetails.title,
        text: `خطة رحلتي إلى عسير - ${currentDay.dayLabel}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDirections = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Generate Google Maps URL from activity name
      const activityName = currentDay.activities[0]?.name || "";
      const encodedName = encodeURIComponent(activityName);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedName}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
      {/* Header */}
      <div className="flex flex-row-reverse items-center justify-between mb-8">
        <div className="text-right">
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {schedule.planDetails.title}
          </h3>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="text-lg font-medium">{currentDay.dayLabel}</span>
            <span className="text-base">{currentDay.date}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#6027D2] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span className="text-sm font-medium">مشاركة</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#6027D2] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span className="text-sm font-medium">طباعة</span>
          </button>
        </div>
      </div>

      {/* Day Navigation */}
      {schedule.days.length > 1 && (
        <div className="flex flex-row-reverse gap-2 mb-6 overflow-x-auto pb-2">
          {schedule.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                currentDayIndex === index
                  ? "bg-[#6027D2] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day.dayLabel}
            </button>
          ))}
        </div>
      )}

      {/* Activities List */}
      <div className="space-y-6">
        {currentDay.activities.map((activity, index) => (
          <div key={activity.id}>
            <ScheduleCard
              activity={activity}
              onDirectionsClick={handleDirections}
            />
            {/* Travel Info */}
            {activity.travelInfoToNext &&
              index < currentDay.activities.length - 1 && (
                <div className="flex flex-row-reverse items-center gap-4 my-6 pr-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-[#6027D2] flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700 text-sm font-medium">
                    <span>{activity.travelInfoToNext.durationMinutes} دقيقة</span>
                    <span>{activity.travelInfoToNext.distanceKm} كيلومتر</span>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
