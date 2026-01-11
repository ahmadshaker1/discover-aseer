"use client";

import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import FilterDropdown from "../landmarks/FilterDropdown";
import InterestsFilter from "../landmarks/InterestsFilter";
import { LocationIcon, HeartIcon, ClockIcon, ChevronDownIcon } from "../landmarks/Icons";
import { cityOptions, interestOptions } from "../landmarks/filterOptions";
import { CalendarIcon } from "./Icons";

const durationOptions = [
  { id: "morning", label: "صباحي (6 صباحاً - 12 ظهراً)" },
  { id: "afternoon", label: "بعد الظهر (12 ظهراً - 6 مساءً)" },
  { id: "evening", label: "مسائي (6 مساءً - 12 منتصف الليل)" },
  { id: "full-day", label: "يوم كامل" },
];

// Helper function to format dates in Arabic
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
            dir="rtl"
          />
        </div>

        {/* Input fields row */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
          {/* Interests */}
          <div className="flex-1 min-w-[200px]">
            <InterestsFilter
              selectedInterests={selectedInterests}
              onToggle={(id) => {
                setSelectedInterests((prev) =>
                  prev.includes(id)
                    ? prev.filter((interestId) => interestId !== id)
                    : [...prev, id]
                );
              }}
              onClear={() => setSelectedInterests([])}
              label="الاهتمامات"
              options={interestOptions}
              icon={<HeartIcon />}
            />
          </div>

          {/* Duration */}
          <div className="flex-1 min-w-[200px]">
            <FilterDropdown
              icon={<ClockIcon />}
              label="فترة الخروج"
              selectedValue={selectedDuration}
              options={durationOptions}
              onSelect={setSelectedDuration}
              onClear={() => setSelectedDuration(null)}
              width="w-full"
            />
          </div>

          {/* Date Range */}
          <div className="flex-1 min-w-[200px]">
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:border-[#6027D2] hover:bg-[#6027D2]/5 transition-all duration-200 cursor-pointer w-full">
                <ChevronDownIcon />
                <span className="flex-1 text-right">
                  {arrivalDate && departureDate
                    ? `${formatDate(arrivalDate)} - ${formatDate(departureDate)}`
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
                <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200 p-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-right text-sm font-medium mb-2 text-gray-700">
                        تاريخ الوصول
                      </label>
                      <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          setArrivalDate(e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#6027D2]"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-right text-sm font-medium mb-2 text-gray-700">
                        تاريخ المغادرة
                      </label>
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          setDepartureDate(e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        min={arrivalDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#6027D2]"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* City */}
          <div className="flex-1 min-w-[200px]">
            <FilterDropdown
              icon={<LocationIcon />}
              label="المدينة"
              selectedValue={selectedCity}
              options={cityOptions}
              onSelect={setSelectedCity}
              onClear={() => setSelectedCity(null)}
              width="w-full"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
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
