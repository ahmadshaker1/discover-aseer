"use client";

import { Button, Checkbox, Menu, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
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
  ChevronDownIcon,
  LocationIcon,
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

const ExperiencesFilter = ({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
}: ExperiencesFilterProps) => {
  const tCommon = useTranslations("common");
  const tExperiencesPage = useTranslations("experiencesPage");
  const { cityOptions, interests, costOptions, travelerTypes } = filterOptions;

  const cityMenuButtonClass = "flex w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-foreground transition-all duration-200 hover:border-muted-foreground sm:px-4 sm:py-3 sm:text-sm";
  const menuItemsClass = "absolute start-0 z-50 mt-2 w-full origin-top-start rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none";

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
    <div
      className="w-full max-w-md rounded-lg bg-surface p-6 text-foreground shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button
          onClick={handleReset}
          className="cursor-pointer whitespace-nowrap rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
        >
          {tCommon("resetFilters")}
        </Button>
        <h2 className="text-xl font-bold text-foreground">{tCommon("filterExperiences")}</h2>
      </div>

      <div className="mb-4">
        <Menu as="div" className="relative">
          <Menu.Button className={cityMenuButtonClass}>
            <LocationIcon />
            <span className="flex-1 text-start">
              {cityOptions.find((city) => city.id === filters.city)?.label || tCommon("city")}
            </span>
            <ChevronDownIcon />
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
            <Menu.Items className={menuItemsClass}>
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
                        className={`${active ? "bg-primary/10 text-primary" : ""} ${filters.city === city.id
                            ? "bg-primary/5 font-semibold text-primary"
                            : "text-foreground"
                          } block w-full text-start px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
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
          <div className="mb-4 flex items-center justify-start gap-2">
            <HeartIcon />
            <h3 className="text-lg font-bold text-foreground">{tCommon("interests")}</h3>
          </div>
          <div className="space-y-4">
            {interests.map((interest) => {
              const isChecked = filters.interests.includes(interest.id);
              return (
                <div
                  key={interest.id}
                  className="flex items-center justify-between p-2 rounded transition-colors"
                >
                  <div className="flex flex-row items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleInterestToggle(interest.id)}
                      className="group relative inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded border-2 border-border bg-surface transition data-checked:border-primary data-checked:bg-primary data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
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
                    <span className="text-sm text-foreground">{interest.label}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {interest.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-start gap-2">
          <WalletIcon />
          <h3 className="text-lg font-bold text-foreground">{tExperiencesPage("costSection")}</h3>
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
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isSelected
                    ? "border-primary bg-muted"
                    : "border-border hover:border-muted-foreground"
                  }`}
              >
                <div
                  className={`mb-2 ${isSelected ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {icon}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground">({option.count})</span>
              </Button>
            );
          })}
        </div>
      </div>

      {travelerTypes.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-start gap-2">
            <SuitcaseIcon />
            <h3 className="text-lg font-bold text-foreground">{tCommon("travelerTypes")}</h3>
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
                  className={`flex h-12 cursor-pointer flex-row items-center justify-center space-x-1 rounded-full border-2 px-2 py-1 transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isSelected
                      ? "border-primary bg-muted"
                      : "border-border hover:border-muted-foreground"
                    }`}
                >
                  <div
                    className={` ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {icon}
                  </div>
                  <span className="text-center text-xs font-medium text-foreground">
                    {traveler.label}
                  </span>
                  <span className="text-xs text-muted-foreground">({traveler.count})</span>
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

