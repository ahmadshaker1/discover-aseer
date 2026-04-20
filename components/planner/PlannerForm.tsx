"use client";

import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import FilterDropdown from "../landmarks/FilterDropdown";
import InterestsFilter from "../landmarks/InterestsFilter";
import { DayPicker } from "react-day-picker";
import { ar } from "date-fns/locale";
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
      <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 lg:p-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-right mb-6 sm:mb-8">
          اكتب وصفاً لرحلتك
        </h2>

        {/* Main textarea */}
        <div className="mb-6">
          <textarea
            dir="rtl"
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
            placeholder="اقتراح: خطط لرحلة لمدة 7 أيام إلى عسير مع استراحة إفطار في الساعة 10 صباحاً، واستراحة غداء في الساعة 3 مساءً، واستراحة عشاء في الساعة 8 مساءً."
            className="w-full h-40 sm:h-48 p-4 sm:p-6 rounded-xl bg-white border border-gray-300 text-right text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6027D2] focus:border-transparent resize-none"
          />
        </div>

        {/* Input fields row */}
        <div className="flex  items-end gap-3 sm:gap-4 mb-6 text-right justify-end">
          {/* City */}
          <div>
            <FilterDropdown
              icon={<LocationIcon />}
              label="المدينة"
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
                className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:border-[#6027D2] hover:bg-[#6027D2]/5 transition-all duration-200 cursor-pointer"
              >
                <ChevronDownIcon />
                <span className="text-right whitespace-nowrap">
                  {arrivalDate && departureDate
                    ? `${formatDate(arrivalDate)} - ${formatDate(
                        departureDate,
                      )}`
                    : arrivalDate
                      ? `من ${formatDate(arrivalDate)}`
                      : departureDate
                        ? `إلى ${formatDate(departureDate)}`
                        : "اختر تاريخ الوصول والمغادرة"}
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
                <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200 p-4">
                  <div className="flex flex-col gap-4" dir="rtl">
                    {/* إضافة التقويم هنا */}
                    <style>{`
      /* هذي التعديلات البسيطة عشان نظبط ألوان الفيجما على التقويم */
      .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
        background-color: #7300CD1A !important;
        color: white !important;
        border-radius: 8px;
      }
      .rdp-day_range_middle {
        background-color: #7300CD1A !important;
        color: black !important;
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
                      locale={ar} // تحويل التقويم للعربي
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
              label="فترة الخروج"
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
              label="الاهتمامات"
              options={interestOptions}
              icon={<HeartIcon />}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            data-submit-plan="true"
            disabled={isLoading || !description.trim()}
            className="px-8 py-3 bg-[#6027D2] text-white rounded-full font-semibold text-base hover:bg-[#5020B8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "جاري التخطيط..." : "إنشاء الخطة"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlannerForm;
