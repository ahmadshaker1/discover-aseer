"use client";

import { Button, Checkbox } from "@headlessui/react";
import { HeartIcon, WalletIcon } from "./Icons";
import type { TourGuidesFilterOptions } from "@/components/tour-guides/data";

export interface TourGuidesFilterState {
  specializations: string[];
  gender: string[];
  transportation: string | null;
}

interface TourGuidesFilterProps {
  filterOptions: TourGuidesFilterOptions;
  filters: TourGuidesFilterState;
  onFiltersChange: (filters: TourGuidesFilterState) => void;
  onReset: () => void;
}

const TourGuidesFilter = ({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
}: TourGuidesFilterProps) => {
  const { specializations, gender, transportation } = filterOptions;

  const handleSpecializationToggle = (id: string) => {
    onFiltersChange({
      ...filters,
      specializations: filters.specializations.includes(id)
        ? filters.specializations.filter((s) => s !== id)
        : [...filters.specializations, id],
    });
  };

  const handleGenderToggle = (id: string) => {
    onFiltersChange({
      ...filters,
      gender: filters.gender.includes(id)
        ? filters.gender.filter((g) => g !== id)
        : [...filters.gender, id],
    });
  };

  const handleTransportationSelect = (id: string) => {
    onFiltersChange({
      ...filters,
      transportation: filters.transportation === id ? null : id,
    });
  };

  return (
    <div className="w-full lg:max-w-xs bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-black">
          تصفية المرشدون
        </h2>
        <Button
          onClick={onReset}
          className="px-4 py-2 cursor-pointer text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap data-focus:outline-none data-focus:ring-2 data-focus:ring-gray-500 data-focus:ring-offset-2 self-start sm:self-auto"
        >
          إعادة تعيين النتائج
        </Button>
      </div>

      {/* Specializations (Interests) */}
      {specializations.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <HeartIcon />
            <h3 className="text-base sm:text-lg font-bold text-black">
              التخصصات
            </h3>
          </div>
          <div className="space-y-4">
            {specializations.map((item) => {
              const isChecked = filters.specializations.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <span className="text-sm text-black">{item.label}</span>
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleSpecializationToggle(item.id)}
                      className="group relative cursor-pointer inline-flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white transition data-checked:border-black data-checked:bg-black data-focus:outline-none data-focus:ring-2 data-focus:ring-black data-focus:ring-offset-2"
                    >
                      <svg
                        className="h-3 w-3 stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gender */}
      {gender.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base sm:text-lg font-bold text-black">
              الجنس
            </h3>
          </div>
          <div className="space-y-4">
            {gender.map((item) => {
              const isChecked = filters.gender.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <span className="text-sm text-black">{item.label}</span>
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleGenderToggle(item.id)}
                      className="group relative cursor-pointer inline-flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white transition data-checked:border-black data-checked:bg-black data-focus:outline-none data-focus:ring-2 data-focus:ring-black data-focus:ring-offset-2"
                    >
                      <svg
                        className="h-3 w-3 stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transportation */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <WalletIcon />
          <h3 className="text-base sm:text-lg font-bold text-black">
            النقل
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {transportation.map((option) => {
            const isSelected = filters.transportation === option.id;
            return (
              <Button
                key={option.id}
                onClick={() => handleTransportationSelect(option.id)}
                disabled={option.count === 0}
                className={`cursor-pointer px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed data-focus:outline-none data-focus:ring-2 data-focus:ring-black data-focus:ring-offset-2 ${
                  isSelected
                    ? "border-black bg-gray-50 text-black"
                    : "border-gray-200 hover:border-gray-300 text-black"
                }`}
              >
                {option.label}
                <span className="text-gray-500 mr-1">({option.count})</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourGuidesFilter;
