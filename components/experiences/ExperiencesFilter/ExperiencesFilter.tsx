"use client";

import { useState } from "react";
import { Button, Checkbox } from "@headlessui/react";
import {
  HeartIcon,
  WalletIcon,
  SuitcaseIcon,
  PaidIcon,
  FreeIcon,
  IndividualIcon,
  CoupleIcon,
  FemaleIcon,
  GroupsIcon,
  FamilyIcon,
} from "./Icons";

interface FilterState {
  interests: string[];
  cost: string | null;
  travelers: string[];
}

const ExperiencesFilter = () => {
  const [filters, setFilters] = useState<FilterState>({
    interests: [],
    cost: null,
    travelers: [],
  });

  const interests = [
    { id: "adventures", label: "المغامرات", count: 4 },
    { id: "heritage", label: "التراث و الفنون", count: 3 },
    { id: "culinary", label: "فنون الطهي", count: 3 },
    { id: "nature", label: "الطبيعة", count: 3 },
  ];

  const costOptions = [
    { id: "paid", label: "مدفوعة", icon: <PaidIcon /> },
    { id: "free", label: "مجانية", icon: <FreeIcon /> },
  ];

  const travelerTypes = [
    { id: "individual", label: "فردي", icon: <IndividualIcon /> },
    { id: "couple", label: "زوجين", icon: <CoupleIcon /> },
    { id: "female", label: "فردي سيدات", icon: <FemaleIcon /> },
    { id: "groups", label: "مجموعات", icon: <GroupsIcon /> },
    { id: "family", label: "عائلة و أطفال", icon: <FamilyIcon /> },
  ];

  const handleInterestToggle = (interestId: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleCostSelect = (costId: string) => {
    setFilters((prev) => ({
      ...prev,
      cost: prev.cost === costId ? null : costId,
    }));
  };

  const handleTravelerToggle = (travelerId: string) => {
    setFilters((prev) => ({
      ...prev,
      travelers: prev.travelers.includes(travelerId)
        ? prev.travelers.filter((id) => id !== travelerId)
        : [...prev.travelers, travelerId],
    }));
  };

  const handleReset = () => {
    setFilters({
      interests: [],
      cost: null,
      travelers: [],
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 space-x-4">
        <h2 className="text-xl font-bold text-black">تصفية التجارب</h2>
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
          {interests.map((interest) => {
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
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <WalletIcon />
          <h3 className="text-lg font-bold text-black">التكلفة</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {costOptions.map((option) => {
            const isSelected = filters.cost === option.id;
            return (
              <Button
                key={option.id}
                onClick={() => handleCostSelect(option.id)}
                className={`flex flex-col items-center justify-center cursor-pointer p-4 rounded-lg border-2 transition-all data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2 ${
                  isSelected
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`mb-2 ${
                    isSelected ? "text-black" : "text-gray-400"
                  }`}
                >
                  {option.icon}
                </div>
                <span className="text-sm font-medium text-black">
                  {option.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Travelers Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <SuitcaseIcon />
          <h3 className="text-lg font-bold text-black">المسافرين</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {travelerTypes.map((traveler) => {
            const isSelected = filters.travelers.includes(traveler.id);
            return (
              <Button
                key={traveler.id}
                onClick={() => handleTravelerToggle(traveler.id)}
                className={`flex flex-row items-center justify-center px-2 py-1 space-x-1 cursor-pointer h-12 rounded-full border-2 transition-all data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2 ${
                  isSelected
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={` ${isSelected ? "text-black" : "text-gray-400"}`}
                >
                  {traveler.icon}
                </div>
                <span className="text-xs font-medium text-black text-center">
                  {traveler.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesFilter;

