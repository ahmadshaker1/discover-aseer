"use client";

import { useState } from "react";
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
    <div className="flex justify-start w-full">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <FilterDropdown
          icon={<ClockIcon />}
          label="مدة الزيارة"
          selectedValue={selectedDuration}
          options={durationOptions}
          onSelect={setSelectedDuration}
          onClear={() => setSelectedDuration(null)}
        />

        <FilterDropdown
          icon={<PriceIcon />}
          label="الأسعار"
          selectedValue={selectedPrice}
          options={priceOptions}
          onSelect={setSelectedPrice}
          onClear={() => setSelectedPrice(null)}
        />

        <FilterDropdown
          icon={<PeopleIcon />}
          label="المسافرين"
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
          label="المدينة"
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
