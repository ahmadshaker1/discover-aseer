"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FilterDropdown from "./FilterDropdown";
import InterestsFilter from "./InterestsFilter";
import { ClockIcon, PriceIcon, PeopleIcon, LocationIcon } from "./Icons";
import {
  durationOptions,
  priceOptions,
  travelerOptions,
  cityOptions,
} from "./filterOptions";

const LandmarksFilters = () => {
  const tCommon = useTranslations("common");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedTravelers, setSelectedTravelers] = useState<string | null>(
    null
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <div className={`font-brando flex w-full justify-end`}>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <FilterDropdown
          icon={<ClockIcon />}
          label={tCommon("visitDuration")}
          selectedValue={selectedDuration}
          options={durationOptions}
          onSelect={setSelectedDuration}
          onClear={() => setSelectedDuration(null)}
        />

        <FilterDropdown
          icon={<PriceIcon />}
          label={tCommon("prices")}
          selectedValue={selectedPrice}
          options={priceOptions}
          onSelect={setSelectedPrice}
          onClear={() => setSelectedPrice(null)}
        />

        <FilterDropdown
          icon={<PeopleIcon />}
          label={tCommon("travelers")}
          selectedValue={selectedTravelers}
          options={travelerOptions}
          onSelect={setSelectedTravelers}
          onClear={() => setSelectedTravelers(null)}
        />

        <InterestsFilter
          selectedInterests={selectedInterests}
          onToggle={handleInterestToggle}
          onClear={() => setSelectedInterests([])}
        />

        <FilterDropdown
          icon={<LocationIcon />}
          label={tCommon("city")}
          selectedValue={selectedCity}
          options={cityOptions}
          onSelect={setSelectedCity}
          onClear={() => setSelectedCity(null)}
          width="w-48"
        />
      </div>
    </div>
  );
};

export default LandmarksFilters;
