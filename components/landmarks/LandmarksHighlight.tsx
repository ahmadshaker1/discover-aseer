"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { landmarks } from "./data";
import { Button, Menu } from "@headlessui/react";
import {
  ClockIcon,
  PriceIcon,
  PeopleIcon,
  HeartIcon,
  LocationIcon,
  ChevronDownIcon,
} from "./Icons";

const LandmarksHighlight = () => {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedTravelers, setSelectedTravelers] = useState<string | null>(
    null
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleShowMoreClick = () => {
    router.push("/landmarks");
  };

  const durationOptions = [
    { id: "short", label: "قصيرة (1-3 ساعات)" },
    { id: "half-day", label: "نصف يوم (3-6 ساعات)" },
    { id: "full-day", label: "يوم كامل" },
    { id: "weekend", label: "عطلة نهاية الأسبوع (1-2 أيام)" },
    { id: "extended", label: "ممتدة (3+ أيام)" },
  ];

  const priceOptions = [
    { id: "free", label: "مجاني" },
    { id: "budget", label: "اقتصادي (أقل من 50 ر.س)" },
    { id: "mid-range", label: "متوسط (50-200 ر.س)" },
    { id: "luxury", label: "فاخر (أكثر من 200 ر.س)" },
  ];

  const travelerOptions = [
    { id: "solo", label: "فردي" },
    { id: "couple", label: "زوجين" },
    { id: "family", label: "عائلة" },
    { id: "small-group", label: "مجموعة صغيرة (3-5 أشخاص)" },
    { id: "large-group", label: "مجموعة كبيرة (6+ أشخاص)" },
  ];

  const interestOptions = [
    { id: "adventure", label: "المغامرات" },
    { id: "culture", label: "الثقافة والتراث" },
    { id: "nature", label: "الطبيعة والهواء الطلق" },
    { id: "food", label: "الطعام والمطاعم" },
    { id: "relaxation", label: "الاسترخاء" },
    { id: "shopping", label: "التسوق" },
    { id: "historical", label: "المواقع التاريخية" },
  ];

  const cityOptions = [
    { id: "abha", label: "أبها" },
    { id: "khamis", label: "خميس مشيط" },
    { id: "tanomah", label: "تنومة" },
    { id: "bisha", label: "بيشة" },
    { id: "mahayil", label: "محايل عسير" },
    { id: "najran", label: "نجران" },
  ];

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center bg-white py-8 sm:py-12 md:py-16"
      dir="rtl"
    >
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-24 space-y-6 sm:space-y-8 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col items-start space-y-4 text-right w-full">
          <h2 className="text-3xl md:text-7xl font-bold text-right w-full text-black">
            أشهر المعالم في عسير
          </h2>
          <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
          <p className="text-base md:text-lg text-gray-700 text-right max-w-2xl">
            اكتشف أبرز المعالم في عسير واستمتع بتجارب متنوعة بين الطبيعة والتراث
            والأسواق الشعبية. استخدم الفلاتر أدناه للعثور على المعالم التي
            تناسبك.
          </p>
        </div>

        {/* Filter dropdowns row */}
        <div className="flex justify-start w-full">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {/* Duration Filter */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronDownIcon />
                <span>
                  {selectedDuration
                    ? durationOptions.find((opt) => opt.id === selectedDuration)
                        ?.label
                    : "مدة الزيارة"}
                </span>
                <ClockIcon />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border border-gray-300">
                <div className="py-1">
                  {durationOptions.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedDuration(option.id)}
                          className={`${active ? "bg-gray-100" : ""} ${
                            selectedDuration === option.id
                              ? "bg-gray-50 font-semibold"
                              : ""
                          } block w-full text-right px-4 py-2 text-sm text-black`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                  {selectedDuration && (
                    <Menu.Item>
                      <button
                        onClick={() => setSelectedDuration(null)}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 border-t border-gray-200 mt-1"
                      >
                        إزالة التصفية
                      </button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Menu>

            {/* Price Filter */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronDownIcon />
                <span>
                  {selectedPrice
                    ? priceOptions.find((opt) => opt.id === selectedPrice)
                        ?.label
                    : "الأسعار"}
                </span>
                <PriceIcon />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border border-gray-300">
                <div className="py-1">
                  {priceOptions.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPrice(option.id)}
                          className={`${active ? "bg-gray-100" : ""} ${
                            selectedPrice === option.id
                              ? "bg-gray-50 font-semibold"
                              : ""
                          } block w-full text-right px-4 py-2 text-sm text-black`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                  {selectedPrice && (
                    <Menu.Item>
                      <button
                        onClick={() => setSelectedPrice(null)}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 border-t border-gray-200 mt-1"
                      >
                        إزالة التصفية
                      </button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Menu>

            {/* Travelers Filter */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronDownIcon />
                <span>
                  {selectedTravelers
                    ? travelerOptions.find(
                        (opt) => opt.id === selectedTravelers
                      )?.label
                    : "المسافرين"}
                </span>
                <PeopleIcon />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border border-gray-300">
                <div className="py-1">
                  {travelerOptions.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedTravelers(option.id)}
                          className={`${active ? "bg-gray-100" : ""} ${
                            selectedTravelers === option.id
                              ? "bg-gray-50 font-semibold"
                              : ""
                          } block w-full text-right px-4 py-2 text-sm text-black`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                  {selectedTravelers && (
                    <Menu.Item>
                      <button
                        onClick={() => setSelectedTravelers(null)}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 border-t border-gray-200 mt-1"
                      >
                        إزالة التصفية
                      </button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Menu>

            {/* Interests Filter */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronDownIcon />
                <span>
                  {selectedInterests.length > 0
                    ? `الاهتمامات (${selectedInterests.length})`
                    : "الاهتمامات"}
                </span>
                <HeartIcon />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border border-gray-300 max-h-80 overflow-y-auto">
                <div className="py-1">
                  {interestOptions.map((option) => {
                    const isSelected = selectedInterests.includes(option.id);
                    return (
                      <Menu.Item key={option.id}>
                        {({ active }) => (
                          <button
                            onClick={() => handleInterestToggle(option.id)}
                            className={`${active ? "bg-gray-100" : ""} ${
                              isSelected ? "bg-gray-50 font-semibold" : ""
                            } flex items-center justify-between w-full text-right px-4 py-2 text-sm text-black`}
                          >
                            <span>{option.label}</span>
                            {isSelected && (
                              <span className="text-black">✓</span>
                            )}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                  {selectedInterests.length > 0 && (
                    <Menu.Item>
                      <button
                        onClick={() => setSelectedInterests([])}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 border-t border-gray-200 mt-1"
                      >
                        إزالة التصفية
                      </button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Menu>

            {/* City Filter */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronDownIcon />
                <span>
                  {selectedCity
                    ? cityOptions.find((opt) => opt.id === selectedCity)?.label
                    : "المدينة"}
                </span>
                <LocationIcon />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border border-gray-300">
                <div className="py-1">
                  {cityOptions.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedCity(option.id)}
                          className={`${active ? "bg-gray-100" : ""} ${
                            selectedCity === option.id
                              ? "bg-gray-50 font-semibold"
                              : ""
                          } block w-full text-right px-4 py-2 text-sm text-black`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                  {selectedCity && (
                    <Menu.Item>
                      <button
                        onClick={() => setSelectedCity(null)}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 border-t border-gray-200 mt-1"
                      >
                        إزالة التصفية
                      </button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Landmarks cards row */}
        <div className="flex justify-end w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 min-w-max">
            {landmarks.slice(0, 4).map((landmark) => (
              <div
                key={landmark.id}
                className="group w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-[380px] sm:h-[420px] md:h-[440px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90  flex-shrink-0"
              >
                <div className="relative h-full w-full">
                  <img
                    src={landmark.image}
                    alt={landmark.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-6 left-0 right-0 px-6 text-right space-y-2 text-white">
                    <div className="text-xs opacity-80">
                      {landmark.location}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {landmark.title}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {landmark.description}
                    </p>
                    <div className="text-xs opacity-80">
                      {landmark.guideName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show more CTA */}
      <Button
        onClick={handleShowMoreClick}
        className="mt-10 inline-flex items-center justify-center rounded-full bg-[#6027D2] px-10 py-3 text-sm md:text-base font-semibold text-white  cursor-pointer hover:bg-[#4f1fb0] transition-colors"
      >
        عرض المزيد
      </Button>
    </section>
  );
};

export default LandmarksHighlight;
