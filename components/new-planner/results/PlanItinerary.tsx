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
  const [replacingItemId, setReplacingItemId] = useState<string | null>(null);
  const currentDay = planData?.days?.[selectedDayIndex];

  const handleDeleteDay = (index: number) => {
    const newDays = [...planData.days];
    newDays.splice(index, 1);
    setPlanData({ ...planData, days: newDays });

    if (selectedDayIndex >= newDays.length) {
      setSelectedDayIndex(Math.max(0, newDays.length - 1));
    }
  };

  const handleReplaceItem = async (
    dayIndex: number,
    itemType: string,
    itemId: string | number,
  ) => {
    const compositeKey = `${dayIndex}-${itemType}-${itemId}`;
    setReplacingItemId(compositeKey);

    try {
      const payload = {
        dayIndex,
        itemType,
        itemIdToReplace: itemId,
        currentPlanData: planData,
      };

      const res = await fetch("/api/new-planner/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Backend error response:", errorData);
        throw new Error(errorData?.error || "Failed to replace item");
      }

      const data = await res.json();
      if (data.finalItem) {
        const newPlanData = { ...planData };
        const day = newPlanData.days[dayIndex];

        if (itemType === "event" && day.events) {
          const idx = day.events.findIndex(
            (e: any) => String(e.itemId) === String(itemId),
          );
          if (idx !== -1) day.events[idx] = data.finalItem;
        } else if (itemType === "experience" && day.experiences) {
          const idx = day.experiences.findIndex(
            (e: any) => String(e.itemId) === String(itemId),
          );
          if (idx !== -1) day.experiences[idx] = data.finalItem;
        } else if (itemType === "restaurant" && day.restaurants) {
          const idx = day.restaurants.findIndex(
            (e: any) => String(e.itemId) === String(itemId),
          );
          if (idx !== -1) day.restaurants[idx] = data.finalItem;
        }

        setPlanData(newPlanData);
      }
    } catch (error) {
      console.error(error);
      alert(
        locale === "ar" ? "حدث خطأ أثناء الاستبدال" : "Error replacing item",
      );
    } finally {
      setReplacingItemId(null);
    }
  };

  useEffect(() => {
    if (!planData || !planData.days) return;
    const imageUrls: string[] = [];
    planData.days.forEach((day: any) => {
      day.events?.forEach((ev: any) => {
        if (ev.itemData?.image) imageUrls.push(ev.itemData.image);
        if (ev.itemData?.images)
          ev.itemData.images.forEach((img: string) => imageUrls.push(img));
      });
      day.experiences?.forEach((exp: any) => {
        if (exp.itemData?.image) imageUrls.push(exp.itemData.image);
        if (exp.itemData?.images)
          exp.itemData.images.forEach((img: string) => imageUrls.push(img));
      });
      day.restaurants?.forEach((res: any) => {
        if (res.itemData?.image) imageUrls.push(res.itemData.image);
        if (res.itemData?.images)
          res.itemData.images.forEach((img: string) => imageUrls.push(img));
      });
    });

    // Preload images into browser cache so they appear when printing all days
    imageUrls.forEach((url) => {
      if (!url) return;
      const img = new window.Image();
      img.src = url;
    });
  }, [planData]);

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
      <style>{`
        @media print {
          @page {
            margin: 0.5cm;
            size: auto;
          }
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-hidden {
            display: none !important;
          }
          .shrink-0 {
            break-inside: avoid;
          }
          .overflow-x-auto { 
            overflow: visible !important;
            flex-wrap: wrap !important;
          }
          /* Force Light Theme Colors for print */
          .dark\\:bg-\\[\\#1C0F2A\\], .dark\\:bg-\\[\\#14091F\\] {
            background-color: #F7F7F7 !important;
          }
          .dark\\:text-white {
            color: black !important;
          }
          .dark\\:border-white\\/10, .dark\\:border-white\\/20 {
            border-color: #e5e7eb !important;
          }
          img {
            max-width: 100% !important;
            object-fit: cover !important;
          }
        }
      `}</style>

      {/* Header Row */}
      <div className="flex w-full justify-between items-center mb-4 print-hidden">
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
        className="w-full flex gap-4 overflow-x-auto pb-4 print-hidden"
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

      {/* All Days Content (visible conditionally for print) */}
      <div className="relative w-full">
        {days.map((dayToRender: any, dIndex: number) => {
          const isSelected = selectedDayIndex === dIndex;
          return (
            <div
              key={dIndex}
              className={`w-full flex-col p-6 bg-[#F7F7F7] dark:bg-[#14091F] print:!relative print:!flex print:!opacity-100 print:!h-auto print:!overflow-visible print:mb-8 print:!pointer-events-auto print:!mt-4 ${
                isSelected
                  ? "flex relative opacity-100 mt-4 z-10"
                  : "flex absolute top-0 left-0 opacity-0 h-0 overflow-hidden pointer-events-none -z-10"
              }`}
              style={{
                borderRadius: "12px",
              }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white text-start mb-6">
                {t(`day${dIndex + 1}`)}
              </h3>

              <div className="flex flex-col gap-4 w-full">
                <h4 className="text-xl font-bold text-black dark:text-white text-start">
                  {t("events")}
                </h4>
                {dayToRender.events && dayToRender.events.length > 0 ? (
                  <div className="flex flex-wrap gap-4 w-[500px] justify-start [&>div]:!mx-0">
                    {dayToRender.events.map((ev: any, idx: number) => {
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
                      return (
                        <div
                          key={item.id || idx}
                          className="w-[250px] shrink-0 flex flex-col items-center gap-4"
                        >
                          <EventListingCard event={item} />
                          <button
                            onClick={() =>
                              handleReplaceItem(dIndex, "event", ev.itemId)
                            }
                            disabled={
                              replacingItemId === `${dIndex}-event-${ev.itemId}`
                            }
                            className="flex w-[190px] h-[46px] px-4 py-2.5 justify-center hover:cursor-pointer items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black  transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white"
                          >
                            {replacingItemId ===
                            `${dIndex}-event-${ev.itemId}` ? (
                              <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                            ) : locale === "ar" ? (
                              "استبدال الفعالية"
                            ) : (
                              "Replace Event"
                            )}
                          </button>
                        </div>
                      );
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
                {dayToRender.experiences &&
                dayToRender.experiences.length > 0 ? (
                  <div className="flex flex-wrap gap-4 justify-start">
                    {dayToRender.experiences.map((exp: any, idx: number) => {
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
                        <div
                          key={item.id || idx}
                          className="w-[300px] shrink-0 flex flex-col items-center gap-4"
                        >
                          <ExperienceCard {...item} />
                          <button
                            onClick={() =>
                              handleReplaceItem(
                                dIndex,
                                "experience",
                                exp.itemId,
                              )
                            }
                            disabled={
                              replacingItemId ===
                              `${dIndex}-experience-${exp.itemId}`
                            }
                            className="flex w-[190px] h-[46px] px-4 py-2.5 justify-center items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white"
                          >
                            {replacingItemId ===
                            `${dIndex}-experience-${exp.itemId}` ? (
                              <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                            ) : locale === "ar" ? (
                              "استبدال التجربة"
                            ) : (
                              "Replace Experience"
                            )}
                          </button>
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
                {dayToRender.restaurants &&
                dayToRender.restaurants.length > 0 ? (
                  <div className="flex flex-nowrap gap-4 justify-start overflow-x-auto pb-4 w-full">
                    {dayToRender.restaurants.map((res: any, idx: number) => {
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
                        <div
                          key={item.id || idx}
                          className="flex flex-col items-center gap-4"
                        >
                          <PlannerRestaurantCard
                            restaurant={item}
                            mealType={res.mealType || ""}
                          />
                          <button
                            onClick={() =>
                              handleReplaceItem(
                                dIndex,
                                "restaurant",
                                res.itemId,
                              )
                            }
                            disabled={
                              replacingItemId ===
                              `${dIndex}-restaurant-${res.itemId}`
                            }
                            className="flex w-[190px] h-[46px] px-4 py-2.5 justify-center items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white"
                          >
                            {replacingItemId ===
                            `${dIndex}-restaurant-${res.itemId}` ? (
                              <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                            ) : locale === "ar" ? (
                              "استبدال المطعم"
                            ) : (
                              "Replace Restaurant"
                            )}
                          </button>
                        </div>
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
          );
        })}
      </div>
    </div>
  );
}
