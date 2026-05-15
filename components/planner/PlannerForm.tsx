"use client";

import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import FilterDropdown from "../landmarks/FilterDropdown";
import InterestsFilter from "../landmarks/InterestsFilter";
import { DayPicker } from "react-day-picker";
import { ar, enUS } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import {
  LocationIcon,
  HeartIcon,
  ClockIcon,
  ChevronDownIcon,
} from "../landmarks/Icons";
import { cityOptions, interestOptions } from "../landmarks/filterOptions";
import { CalendarIcon } from "./Icons";

const durationOptions = [
  { id: "morning", label: "صباحي (6 صباحاً - 12 ظهراً)" },
  { id: "afternoon", label: "بعد الظهر (12 ظهراً - 6 مساءً)" },
  { id: "evening", label: "مسائي (6 مساءً - 12 منتصف الليل)" },
  { id: "full-day", label: "يوم كامل" },
];

// Convert Date to YYYY-MM-DD using local calendar day (no UTC shift)
const toLocalISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Parse YYYY-MM-DD as a local date (avoids timezone offset issues)
const fromLocalISODate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return undefined;
  }
  return new Date(year, month - 1, day);
};

// Helper function to format dates in Arabic
const formatDate = (dateString: string) => {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } catch {
    return dateString;
  }
};

interface PlannerFormProps {
  onSubmit: (data: {
    description: string;
    city: string | null;
    arrivalDate: string;
    departureDate: string;
    duration: string | null;
    interests: string[];
  }) => void;
  isLoading: boolean;
}

const PlannerForm = ({ onSubmit, isLoading }: PlannerFormProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tPlanner = useTranslations("planner");
  const [description, setDescription] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only allow submission from the explicit planner submit button.
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (!submitter || submitter.dataset.submitPlan !== "true") {
      return;
    }

    console.log("Submitting form with data:", {
      description,
      city: selectedCity,
      arrivalDate,
      departureDate,
      duration: selectedDuration,
      interests: selectedInterests,
    });

    // Prevent submission if already loading
    if (isLoading) {
      return;
    }

    // Only submit if description is provided
    if (!description.trim()) {
      return;
    }

    onSubmit({
      description,
      city: selectedCity,
      arrivalDate,
      departureDate,
      duration: selectedDuration,
      interests: selectedInterests,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="rounded-2xl bg-surface p-6 text-foreground sm:p-8 lg:p-12">
        {/* Title */}
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-start`}>
          {tPlanner("formTitle")}
        </h2>

        {/* Main textarea */}
        <div className="mb-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              // Prevent form submission on Enter key
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                // Allow Ctrl/Cmd+Enter to submit
                return;
              } else if (e.key === "Enter") {
                // Allow normal Enter for new lines
                return;
              }
            }}
            placeholder={tPlanner("formPlaceholder")}
            className={`h-40 w-full resize-none rounded-xl border border-border bg-background p-4 text-sm placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary sm:h-48 sm:p-6 sm:text-base text-start`}
          />
        </div>

        {/* Input fields row */}
        <div className={`flex items-end gap-3 sm:gap-4 mb-6 text-start justify-end`}>
          {/* City */}
          <div>
            <FilterDropdown
              icon={<LocationIcon />}
              label={tCommon("city")}
              selectedValue={selectedCity}
              options={cityOptions}
              onSelect={setSelectedCity}
              onClear={() => setSelectedCity(null)}
            />
          </div>
          {/* Date Range */}
          <div>
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className={`flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 sm:px-6 sm:py-2 sm:text-sm flex-row`}
              >
                <ChevronDownIcon />
                <span className="text-start whitespace-nowrap">
                  {arrivalDate && departureDate
                    ? `${formatDate(arrivalDate)} - ${formatDate(
                        departureDate,
                      )}`
                    : arrivalDate
                      ? `${tPlanner("dateFrom")} ${formatDate(arrivalDate)}`
                      : departureDate
                        ? `${tPlanner("dateTo")} ${formatDate(departureDate)}`
                        : tCommon("datePlaceholder")}
                </span>
                <CalendarIcon />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95 translate-y-1"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-1"
              >
                <Menu.Items className={`absolute z-50 mt-2 rounded-lg border border-border bg-surface p-4 shadow-xl ring-1 ring-border focus:outline-none start-0 origin-top-start`}>
                  <div className="flex flex-col gap-4">
                    {/* إضافة التقويم هنا */}
                    <style>{`
      /* هذي التعديلات البسيطة عشان نظبط ألوان الفيجما على التقويم */
      .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
        background-color: color-mix(in srgb, var(--primary) 10%, transparent) !important;
        color: var(--primary-foreground) !important;
        border-radius: 8px;
      }
      .rdp-day_range_middle {
        background-color: color-mix(in srgb, var(--primary) 10%, transparent) !important;
        color: var(--foreground) !important;
        border-radius: 0px !important;
      }
      .rdp-day_range_start {
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
      }
      .rdp-day_range_end {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }
    `}</style>

                    <DayPicker
                      mode="range"
                      locale={locale === "ar" ? ar : enUS}
                      selected={{
                        from: arrivalDate
                          ? fromLocalISODate(arrivalDate)
                          : undefined,
                        to: departureDate
                          ? fromLocalISODate(departureDate)
                          : undefined,
                      }}
                      onSelect={(range) => {
                        // تحديث حالة الوصول والمغادرة بناءً على التحديد
                        // إذا كان عندك طريقة معينة لحفظ التاريخ (مثلاً string) تقدر تعدلها هنا
                        setArrivalDate(
                          range?.from ? toLocalISODate(range.from) : "",
                        );
                        setDepartureDate(
                          range?.to ? toLocalISODate(range.to) : "",
                        );
                      }}
                      className="border-0 font-sans"
                    />
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Duration */}
          <div>
            <FilterDropdown
              icon={<ClockIcon />}
              label={tPlanner("timePeriod")}
              selectedValue={selectedDuration}
              options={durationOptions}
              onSelect={setSelectedDuration}
              onClear={() => setSelectedDuration(null)}
            />
          </div>
          {/* Interests */}
          <div>
            <InterestsFilter
              selectedInterests={selectedInterests}
              onToggle={(id) => {
                setSelectedInterests((prev) =>
                  prev.includes(id)
                    ? prev.filter((interestId) => interestId !== id)
                    : [...prev, id],
                );
              }}
              onClear={() => setSelectedInterests([])}
              label={tCommon("interests")}
              options={interestOptions}
              icon={<HeartIcon />}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className={`flex justify-end`}>
          <button
            type="submit"
            data-submit-plan="true"
            disabled={isLoading || !description.trim()}
            className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? tPlanner("planning") : tPlanner("createPlan")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlannerForm;
