"use client";

import { Button, Checkbox, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
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
import type { FilterOptions } from "@/components/experiences/data";

export interface FilterState {
  city: string | null;
  interests: string[];
  cost: string | null;
  travelers: string[];
}

interface ExperiencesFilterProps {
  filterOptions: FilterOptions;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const TRAVELER_ICONS: Record<string, React.ReactNode> = {
  individual: <IndividualIcon />,
  couple: <CoupleIcon />,
  female: <FemaleIcon />,
  groups: <GroupsIcon />,
  family: <FamilyIcon />,
};

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22C16 18.5 19 15.1 19 11A7 7 0 1 0 5 11C5 15.1 8 18.5 12 22Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const ExperiencesFilter = ({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
}: ExperiencesFilterProps) => {
  const { cityOptions, interests, costOptions, travelerTypes } = filterOptions;

  const handleInterestToggle = (interestId: string) => {
    onFiltersChange({
      ...filters,
      interests: filters.interests.includes(interestId)
        ? filters.interests.filter((id) => id !== interestId)
        : [...filters.interests, interestId],
    });
  };

  const handleCostSelect = (costId: string) => {
    onFiltersChange({
      ...filters,
      cost: filters.cost === costId ? null : costId,
    });
  };

  const handleTravelerToggle = (travelerId: string) => {
    onFiltersChange({
      ...filters,
      travelers: filters.travelers.includes(travelerId)
        ? filters.travelers.filter((id) => id !== travelerId)
        : [...filters.travelers, travelerId],
    });
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button
          onClick={handleReset}
          className="px-4 py-2 cursor-pointer text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap data-focus:outline-none data-focus:ring-2 data-focus:ring-gray-500 data-focus:ring-offset-2"
        >
          إعادة تعيين النتائج
        </Button>
        <h2 className="text-xl font-bold text-black">تصفية التجارب</h2>
      </div>

      <div className="mb-4">
        <Menu as="div" className="relative">
          <Menu.Button className="flex flex-row-reverse items-center gap-2 w-full rounded-full bg-white text-black px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer">
            <ChevronDownIcon />
            <span className="flex-1 text-right">
              {cityOptions.find((city) => city.id === filters.city)?.label || "المدينة"}
            </span>
            <LocationIcon />
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
            <Menu.Items className="absolute right-0 z-50 mt-2 w-full origin-top-right rounded-lg border border-gray-200 bg-white shadow-xl ring-1 ring-black/10 focus:outline-none">
              <div className="py-1">
                {cityOptions.map((city) => (
                  <Menu.Item key={city.id}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() =>
                          onFiltersChange({
                            ...filters,
                            city: filters.city === city.id ? null : city.id,
                          })
                        }
                        className={`${active ? "bg-[#6027D2]/10 text-[#6027D2]" : ""} ${
                          filters.city === city.id
                            ? "bg-[#6027D2]/5 text-[#6027D2] font-semibold"
                            : "text-black"
                        } block w-full text-right px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                      >
                        {city.label} ({city.count})
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {interests.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-end gap-2">
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
                    {interest.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-end gap-2">
          <WalletIcon />
          <h3 className="text-lg font-bold text-black">التكلفة</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {costOptions.map((option) => {
            const isSelected = filters.cost === option.id;
            const icon = option.id === "paid" ? <PaidIcon /> : <FreeIcon />;
            return (
              <Button
                key={option.id}
                onClick={() => handleCostSelect(option.id)}
                disabled={option.count === 0}
                className={`flex flex-col items-center justify-center cursor-pointer p-4 rounded-lg border-2 transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-black data-focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
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
                  {icon}
                </div>
                <span className="text-sm font-medium text-black">
                  {option.label}
                </span>
                <span className="text-xs text-gray-500">({option.count})</span>
              </Button>
            );
          })}
        </div>
      </div>

      {travelerTypes.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-end gap-2">
            <SuitcaseIcon />
            <h3 className="text-lg font-bold text-black">نوع المسافرين</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {travelerTypes.map((traveler) => {
              const isSelected = filters.travelers.includes(traveler.id);
              const icon = TRAVELER_ICONS[traveler.id];
              return (
                <Button
                  key={traveler.id}
                  onClick={() => handleTravelerToggle(traveler.id)}
                  disabled={traveler.count === 0}
                  className={`flex flex-row items-center justify-center px-2 py-1 space-x-1 cursor-pointer h-12 rounded-full border-2 transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-black data-focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={` ${isSelected ? "text-black" : "text-gray-400"}`}
                  >
                    {icon}
                  </div>
                  <span className="text-xs font-medium text-black text-center">
                    {traveler.label}
                  </span>
                  <span className="text-xs text-gray-500">({traveler.count})</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencesFilter;

