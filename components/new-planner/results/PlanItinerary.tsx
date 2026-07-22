"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import EventListingCard from "@/components/events/EventListingCard/EventListingCard";
import { transformApiEventToListingItem } from "@/components/events/data";
import type { EventListingItem } from "@/components/events/data";
import ExperienceCard from "@/components/experiences/ExperienceCard/ExperienceCard";
import { transformExperience } from "@/components/experiences/data";
import AseeriCuisineBadge from "@/components/restaurants/AseeriCuisineBadge";
import {
  formatCuisineTypes,
  hasAseeriCuisine,
} from "@/components/restaurants/restaurantLocale";
import { transformLocationToRestaurant } from "@/components/restaurants/data";
import type { Restaurant } from "@/components/restaurants/data";

interface PlanItineraryProps {
  data: any;
}

const PlannerRestaurantCard = ({
  restaurant,
  mealType,
}: {
  restaurant: Restaurant;
  mealType: string;
}) => {
  const locale = useLocale() as "ar" | "en";
  const tCommon = useTranslations("common");

  const mealTypeTranslations: Record<string, string> = {
    breakfast: "إفطار",
    lunch: "غداء",
    dinner: "عشاء",
    coffee: "قهوة",
    tea: "شاي",
  };
  const localizedMealType =
    locale === "ar"
      ? mealTypeTranslations[mealType.toLowerCase()] || mealType
      : mealType;

  const showAseeriBadge = hasAseeriCuisine(restaurant.cuisineTypes);
  const otherCuisineLabel = formatCuisineTypes(
    restaurant.cuisineTypes?.filter((type) => type !== "aseeri_cuisine"),
    locale,
  );

  return (
    <div className="flex flex-col gap-2 w-[220px] shrink-0">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/planner/restaurant-2-line.svg"
          alt="Restaurant"
          width={20}
          height={20}
          className="dark:brightness-0 dark:invert"
        />
        <span className="text-base font-bold text-[#6027D2] dark:text-white capitalize">
          {localizedMealType}
        </span>
      </div>
      <button
        type="button"
        onClick={() =>
          window.open(restaurant.mapsUrl, "_blank", "noopener,noreferrer")
        }
        className="group flex h-[260px] w-full flex-col overflow-hidden rounded-2xl bg-surface text-foreground shadow-lg transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-start"
      >
        <div className="relative h-32 w-full overflow-hidden shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/10" />
        </div>

        <div className="flex flex-col justify-between px-4 py-3 flex-1">
          <div className="space-y-1">
            <h3 className="text-start text-base font-bold text-foreground [unicode-bidi:plaintext] line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center justify-start  text-xs text-muted-foreground">
              {restaurant.distanceKm > 0 && (
                <>
                  <span className="text-[10px]">{tCommon("kmShort")}</span>
                  <span>{restaurant.distanceKm}</span>
                  <span className="mx-1 text-muted-foreground">•</span>
                </>
              )}
              <span className="truncate">{restaurant.location}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
            {restaurant.nationality && (
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span>{restaurant.nationality}</span>
              </div>
            )}
            {showAseeriBadge ? (
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                <AseeriCuisineBadge variant="card" />
              </div>
            ) : null}
            {otherCuisineLabel ? (
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                <span>{otherCuisineLabel}</span>
              </div>
            ) : null}
          </div>
        </div>
      </button>
    </div>
  );
};

export default function PlanItinerary({ data }: PlanItineraryProps) {
  const t = useTranslations("Planner");
  const locale = useLocale();

  const [planData, setPlanData] = useState(data);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const currentDay = planData?.days?.[selectedDayIndex];

  const handleDeleteDay = (index: number) => {
    const newDays = [...planData.days];
    newDays.splice(index, 1);
    setPlanData({ ...planData, days: newDays });

    // Adjust selected index if needed
    if (selectedDayIndex >= newDays.length) {
      setSelectedDayIndex(Math.max(0, newDays.length - 1));
    }
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const response = await fetch("/api/planner/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_data: planData }),
      });

      if (!response.ok) {
        throw new Error("Failed to save plan");
      }

      const result = await response.json();
      const shareUrl = `${window.location.origin}/${locale}/new-planner/share/${result.id}`;

      if (navigator.share) {
        await navigator.share({
          title: "My Aseer Trip",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert(
          locale === "ar"
            ? "تم نسخ الرابط إلى الحافظة!"
            : "Link copied to clipboard!",
        );
      }
    } catch (error) {
      console.error("Error sharing plan:", error);
      alert(
        locale === "ar"
          ? "حدث خطأ أثناء محاولة المشاركة"
          : "An error occurred while sharing",
      );
    } finally {
      setIsSharing(false);
    }
  };

  if (!planData || !planData.days || planData.days.length === 0) {
    return (
      <div className="w-full text-center py-10">No plan data available.</div>
    );
  }

  const days = planData.days;

  return (
    <div className="flex flex-col items-start w-full gap-8">
      {/* Header Row */}
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-[32px] font-bold text-black dark:text-white">
          {t("yourPlan")}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Image
              src="/assets/planner/printer-line.svg"
              alt="Print"
              width={20}
              height={20}
              className="dark:brightness-0 dark:invert"
            />
            {t("print")}
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className={`flex items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium transition-colors ${
              isSharing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer"
            }`}
          >
            {isSharing ? (
              <span className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
            ) : (
              <Image
                src="/assets/planner/share-line.svg"
                alt="Share"
                width={20}
                height={20}
                className="dark:brightness-0 dark:invert"
              />
            )}
            {t("share")}
          </button>
        </div>
      </div>

      {/* Days Cards Selector */}
      <div
        className="w-full flex gap-4 overflow-x-auto pb-4"
        style={{ fontFamily: "IBM Plex Sans Arabic" }}
      >
        {days.map((day: any, index: number) => {
          const isSelected = selectedDayIndex === index;
          return (
            <div
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`cursor-pointer transition-colors flex flex-col justify-center items-center shrink-0 ${
                isSelected
                  ? "bg-[#CEEEEE] text-black"
                  : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"
              }`}
              style={{
                width: "105px",
                minHeight: "120px",
                padding: "16px 12px",
                gap: "8px",
                borderRadius: "20px",
                border: isSelected
                  ? "2px solid #00BBB4"
                  : "1px solid rgba(0, 0, 0, 0.33)",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {t(`day${index + 1}`)}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDay(index);
                }}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
                title="حذف اليوم"
              >
                <Image
                  src="/assets/planner/delete-bin-6-line.svg"
                  alt="Delete"
                  width={20}
                  height={20}
                  className={
                    isSelected ? "" : "dark:invert opacity-70 hover:opacity-100"
                  }
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Current Day Content */}
      {currentDay && (
        <div
          className="w-full flex flex-col mt-4 p-6 bg-[#F7F7F7] dark:bg-[#14091F]"
          style={{
            borderRadius: "12px",
          }}
        >
          <h3 className="text-2xl font-bold text-black dark:text-white text-start mb-6">
            {t(`day${selectedDayIndex + 1}`)}
          </h3>

          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-xl font-bold text-black dark:text-white text-start">
              {t("events")}
            </h4>
            {currentDay.events && currentDay.events.length > 0 ? (
              <div className="flex flex-wrap gap-4 w-[300px] justify-start [&>div]:!mx-0">
                {currentDay.events.map((ev: any, idx: number) => {
                  const apiData = ev.itemData;
                  if (!apiData) {
                    return (
                      <div key={idx} className="text-sm text-gray-500">
                        لا توجد تفاصيل لهذه الفعالية
                      </div>
                    );
                  }
                  const item = transformApiEventToListingItem(
                    apiData,
                    locale as any,
                  );
                  return <EventListingCard key={item.id || idx} event={item} />;
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-start text-sm">
                {t("noEventsForDay")}
              </p>
            )}
          </div>

          <hr className="border-gray-200 dark:border-white/10 my-6" />

          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-xl font-bold text-black dark:text-white text-start">
              {t("experiences")}
            </h4>
            {currentDay.experiences && currentDay.experiences.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-start">
                {currentDay.experiences.map((exp: any, idx: number) => {
                  const apiData = exp.itemData;
                  if (!apiData) {
                    return (
                      <div key={idx} className="text-sm text-gray-500">
                        لا توجد تفاصيل لهذه التجربة
                      </div>
                    );
                  }
                  const item = transformExperience(apiData, locale as any);
                  return (
                    <div key={item.id || idx} className="w-[300px] shrink-0">
                      <ExperienceCard {...item} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-start text-sm">
                {t("noExperiencesForDay")}
              </p>
            )}
          </div>

          <hr className="border-gray-200 dark:border-white/10 my-6" />

          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-xl font-bold text-black dark:text-white text-start">
              {t("restaurants")}
            </h4>
            {currentDay.restaurants && currentDay.restaurants.length > 0 ? (
              <div className="flex flex-nowrap gap-4 justify-start overflow-x-auto pb-4 w-full">
                {currentDay.restaurants.map((res: any, idx: number) => {
                  const apiData = res.itemData;
                  if (!apiData) {
                    return (
                      <div key={idx} className="text-sm text-gray-500">
                        لا توجد تفاصيل لهذا المطعم
                      </div>
                    );
                  }
                  const item = transformLocationToRestaurant(
                    apiData,
                    locale as any,
                  );
                  return (
                    <PlannerRestaurantCard
                      key={item.id || idx}
                      restaurant={item}
                      mealType={res.mealType || ""}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-start text-sm">
                {t("noRestaurantsForDay")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
