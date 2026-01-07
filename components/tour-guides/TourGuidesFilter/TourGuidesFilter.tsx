"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Checkbox } from "@headlessui/react";
import { HeartIcon, WalletIcon } from "./Icons";
import { TourGuideData } from "../TourGuideCard/TourGuideCard";

interface FilterState {
  interests: string[];
  costFrom: string;
  costTo: string;
}

interface TourGuidesFilterProps {
  guides: TourGuideData[];
  onFilterChange: (filteredGuides: TourGuideData[]) => void;
}

const TourGuidesFilter = ({
  guides,
  onFilterChange,
}: TourGuidesFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    interests: [],
    costFrom: "",
    costTo: "",
  });

  // Define interest categories that map to specialties
  const interests = [
    { id: "المغامرات", label: "المغامرات" },
    { id: "التراث و الفنون", label: "التراث و الفنون" },
    { id: "فنون الطهي", label: "فنون الطهي" },
    { id: "الطبيعة", label: "الطبيعة" },
  ];

  // Calculate counts for each interest based on actual guides
  const interestsWithCounts = useMemo(() => {
    return interests.map((interest) => {
      const count = guides.filter((guide) =>
        guide.specialties?.some((specialty) =>
          specialty.toLowerCase().includes(interest.id.toLowerCase())
        )
      ).length;
      return { ...interest, count };
    });
  }, [guides]);

  const handleInterestToggle = (interestId: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleCostFromChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      costFrom: value,
    }));
  };

  const handleCostToChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      costTo: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      interests: [],
      costFrom: "",
      costTo: "",
    });
  };

  // Filter guides based on current filter state
  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      // Filter by interests (specialties)
      if (filters.interests.length > 0) {
        const hasMatchingInterest = filters.interests.some((interest) =>
          guide.specialties?.some((specialty) =>
            specialty.toLowerCase().includes(interest.toLowerCase())
          )
        );
        if (!hasMatchingInterest) return false;
      }

      // Filter by price range
      if (filters.costFrom && guide.pricePerHour) {
        if (guide.pricePerHour < Number(filters.costFrom)) return false;
      }
      if (filters.costTo && guide.pricePerHour) {
        if (guide.pricePerHour > Number(filters.costTo)) return false;
      }

      return true;
    });
  }, [guides, filters]);

  // Notify parent when filtered guides change
  useEffect(() => {
    onFilterChange(filteredGuides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGuides]);

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 space-x-4">
        <h2 className="text-xl font-bold text-black">تصفية المرشدون</h2>
        <Button
          onClick={handleReset}
          className="px-4 py-2 cursor-pointer text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-gray-500 data-[focus]:ring-offset-2"
        >
          إعادة تعيين النتائج
        </Button>
      </div>

      {/* Interests Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <HeartIcon />
          <h3 className="text-lg font-bold text-black">الاهتمامات</h3>
        </div>
        <div className="space-y-4">
          {interestsWithCounts.map((interest) => {
            const isChecked = filters.interests.includes(interest.id);
            return (
              <div
                key={interest.id}
                className="flex items-center justify-between p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3 flex-row-reverse">
                  <span className="text-sm text-black">{interest.label}</span>
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleInterestToggle(interest.id)}
                    className="group relative cursor-pointer inline-flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white transition data-[checked]:border-black data-[checked]:bg-black data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2"
                  >
                    <svg
                      className="h-3 w-3 stroke-white opacity-0 group-data-[checked]:opacity-100"
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
                  {interest.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <WalletIcon />
          <h3 className="text-lg font-bold text-black">التكلفة</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2 text-right">
              من
            </label>
            <input
              type="number"
              value={filters.costFrom}
              onChange={(e) => handleCostFromChange(e.target.value)}
              placeholder=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2 text-right">
              إلى
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                ر.س
              </span>
              <input
                type="number"
                value={filters.costTo}
                onChange={(e) => handleCostToChange(e.target.value)}
                placeholder=""
                className="w-full pr-12 pl-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuidesFilter;
