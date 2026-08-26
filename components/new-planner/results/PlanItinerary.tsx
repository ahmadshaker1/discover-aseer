"use client";
/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { transformApiEventToListingItem } from "@/components/events/data";
import { transformExperience } from "@/components/experiences/data";
import { formatCuisineTypes } from "@/components/restaurants/restaurantLocale";
import { transformLocationToRestaurant } from "@/components/restaurants/data";

interface PlanItineraryProps {
  data: any;
}

const TimelinePeriodHeader = ({ periodName }: { periodName: string }) => {
  return (
    <div className="flex items-center gap-3 mb-6 mt-8 w-full print:mt-4">
      <Image
        src="/assets/planner/haze-line.svg"
        alt="Period"
        width={24}
        height={24}
        className="dark:brightness-0 dark:invert"
      />
      <h4 className="text-2xl font-bold text-black dark:text-white capitalize">
        {periodName}
      </h4>
    </div>
  );
};

const PlannerRestaurantCardNew = ({
  restaurant,
  onReplace,
  isReplacing,
  locale,
}: any) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/planner/restaurant-2-line.svg"
          alt="Restaurant"
          width={24}
          height={24}
          className="dark:brightness-0 dark:invert"
        />
        <span className="text-lg font-bold text-[#6027D2] dark:text-white capitalize">
          {locale === "ar" ? "مطعم" : "Restaurant"}
        </span>
      </div>
      <div className="flex flex-col md:flex-row p-4 items-start md:items-center rounded-xl bg-white border border-[rgba(204,204,204,0.37)] dark:bg-[#1C0F2A] dark:border-white/10 w-full gap-4 md:gap-0">
        <div className="w-full md:w-[120px] h-[200px] md:h-[120px] shrink-0 rounded-lg overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 md:px-4 gap-2 w-full">
          <h3 className="text-xl font-bold text-black dark:text-white">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1">
            <img
              src="/assets/planner/map-pin.svg"
              alt="Location"
              className="w-4 h-4 dark:brightness-0 dark:invert opacity-70"
            />
            <span className="text-sm text-gray-500">{restaurant.location}</span>
          </div>
          {restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && (
            <div className="flex items-center gap-1">
              <img
                src="/assets/planner/restaurant-2-line copy.svg"
                alt="Cuisine"
                className="w-4 h-4 dark:brightness-0 dark:invert opacity-70"
              />
              <span className="text-sm text-black dark:text-gray-400">
                {formatCuisineTypes(restaurant.cuisineTypes, locale)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 shrink-0 md:px-2 justify-start h-full pt-2 w-full md:w-auto">
          <button
            onClick={() =>
              window.open(restaurant.mapsUrl, "_blank", "noopener,noreferrer")
            }
            className="w-full md:w-auto flex h-9 px-4 py-2.5 justify-center items-center gap-3 rounded-[86px] border border-[rgba(40,0,72,0.16)] text-[#7300CD] font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer dark:bg-white/5 dark:text-white"
          >
            <img
              src={"/assets/planner/direction-line.svg"}
              alt={"direction"}
              className="w-5 h-5 object-cover dark:brightness-0 dark:invert"
            />
            {locale === "ar" ? "الاتجاهات" : "Directions"}
          </button>
        </div>
      </div>
      <button
        onClick={onReplace}
        disabled={isReplacing}
        className="flex w-full md:w-[170px] h-[46px] px-4 py-2.5 justify-center hover:cursor-pointer items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white text-sm font-medium print-hidden"
      >
        <img
          src={"/assets/planner/Rotate.svg"}
          alt={"direction"}
          className="w-[15px] h-[15px] object-cover dark:brightness-0 dark:invert"
        />
        {isReplacing ? (
          <span className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
        ) : locale === "ar" ? (
          "تبديل المطعم"
        ) : (
          "Replace Restaurant"
        )}
      </button>
    </div>
  );
};

const PlannerEventCardNew = ({
  event,
  aiTime,
  onReplace,
  isReplacing,
  locale,
}: any) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/planner/open-arm-fill.svg"
          alt="Event"
          width={24}
          height={24}
          className="dark:brightness-0 dark:invert"
        />
        <span className="text-lg font-bold text-[#6027D2] dark:text-white capitalize">
          {locale === "ar" ? "فعالية" : "Event"}
        </span>
      </div>
      <div className="flex flex-col md:flex-row p-4 items-start md:items-center rounded-xl bg-white border border-[rgba(204,204,204,0.37)] dark:bg-[#1C0F2A] dark:border-white/10 w-full gap-4 md:gap-0">
        <div className="w-full md:w-[120px] h-[200px] md:h-[120px] shrink-0 rounded-lg overflow-hidden">
          <img
            src={event.image || event.images?.[0]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 md:px-4 gap-2 w-full">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-black dark:text-white">
              {event.title}
            </h3>
            {event.price != null && String(event.price).trim() !== "" && (
              <div className="flex items-center gap-1 text-[#00BBB4] font-bold">
                <span>{event.price}</span>
                <Image
                  src="/assets/planner/Saudi_Riyal_Symbol-2%201.svg"
                  alt="SAR"
                  width={16}
                  height={16}
                />
              </div>
            )}
          </div>
          {(event.startDate || event.endDate) && (
            <div className="flex items-center gap-1">
              <img
                src="/assets/planner/calendar-line.svg"
                alt="Calendar"
                className="w-4 h-4 dark:brightness-0 dark:invert opacity-70"
              />
              <span className="text-sm text-gray-500">
                {event.startDate &&
                event.endDate &&
                event.startDate !== event.endDate
                  ? `${event.startDate} - ${event.endDate}`
                  : event.startDate || event.endDate}
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-black dark:text-white">
            {aiTime}
          </span>
        </div>
        <div className="flex flex-col items-center gap-4 shrink-0 md:px-2 justify-start h-full pt-2 w-full md:w-auto">
          <button
            onClick={() =>
              window.open(
                event.location?.mapsUrl || event.mapsUrl,
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="w-full md:w-auto flex h-9 px-4 py-2.5 justify-center items-center gap-3 rounded-[86px] border border-[rgba(40,0,72,0.16)] text-[#7300CD] font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer dark:bg-white/5 dark:text-white"
          >
            <img
              src={"/assets/planner/direction-line.svg"}
              alt={"direction"}
              className="w-5 h-5 object-cover dark:brightness-0 dark:invert"
            />
            {locale === "ar" ? "الاتجاهات" : "Directions"}
          </button>
        </div>
      </div>
      <button
        onClick={onReplace}
        disabled={isReplacing}
        className="flex w-full md:w-[170px] h-[46px] px-4 py-2.5 justify-center hover:cursor-pointer items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white text-sm font-medium print-hidden"
      >
        <img
          src={"/assets/planner/Rotate.svg"}
          alt={"direction"}
          className="w-[15px] h-[15px] object-cover dark:brightness-0 dark:invert"
        />
        {isReplacing ? (
          <span className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
        ) : locale === "ar" ? (
          "تبديل الفعالية"
        ) : (
          "Replace Event"
        )}
      </button>
    </div>
  );
};

const PlannerExperienceCardNew = ({
  experience,
  onReplace,
  isReplacing,
  locale,
}: any) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/planner/open-arm-fill.svg"
          alt="Experience"
          width={24}
          height={24}
          className="fill -[#6027D2] dark:brightness-0 dark:invert"
        />
        <span className="text-lg font-bold text-[#6027D2] dark:text-white capitalize">
          {locale === "ar" ? "تجربة" : "Experience"}
        </span>
      </div>
      <div
        onClick={() =>
          window.open(
            `/${locale}/experiences/${experience.id}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="flex flex-col md:flex-row p-4 items-start md:items-center rounded-xl bg-white border border-[rgba(204,204,204,0.37)] dark:bg-[#1C0F2A] dark:border-white/10 w-full gap-4 md:gap-0 cursor-pointer hover:border-[#6027D2] transition-colors"
      >
        <div className="w-full md:w-[140px] h-[200px] md:h-40 shrink-0 rounded-lg overflow-hidden">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 md:px-4 py-2 gap-3 justify-between h-full w-full">
          <div>
            {experience.category && (
              <div className="flex w-20 h-[25px] justify-center items-center gap-2.5 rounded-xl border border-[rgba(0,0,0,0.80)] dark:border-white/80 mb-3">
                <span className="text-xs font-semibold whitespace-nowrap">
                  {experience.category}
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">
              {experience.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {experience.description}
            </p>
          </div>

          <div className="flex items-center justify-between w-full">
            {experience.price && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">
                  {locale === "ar" ? "يبدأ من" : "Starts from"}
                </span>
                <div className="flex items-center gap-1 text-black dark:text-white font-bold">
                  <span>{experience.price}</span>
                  <Image
                    src="/assets/planner/Saudi_Riyal_Symbol-2%201%20(1).svg"
                    alt="SAR"
                    width={16}
                    height={16}
                    className="dark:brightness-0 dark:invert"
                  />
                  {experience.groupSize > 0 && (
                    <span className="text-xs text-gray-500 font-normal ml-1 rtl:mr-1 rtl:ml-0">
                      /{" "}
                      {locale === "ar"
                        ? experience.groupSize === 1
                          ? "لشخص "
                          : experience.groupSize === 2
                            ? "لشخصين "
                            : experience.groupSize >= 3 &&
                                experience.groupSize <= 10
                              ? `لـ ${experience.groupSize} أشخاص`
                              : `لـ ${experience.groupSize} شخص`
                        : experience.groupSize === 1
                          ? " per person"
                          : ` for ${experience.groupSize} people`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onReplace}
        disabled={isReplacing}
        className="flex w-full md:w-[170px] h-[46px] px-4 py-2.5 justify-center hover:cursor-pointer items-center gap-2.5 rounded-[86px] border border-[#E5E5E5] bg-[#F7F7F7] text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1C0F2A] dark:text-white text-sm font-medium print-hidden"
      >
        <img
          src={"/assets/planner/Rotate.svg"}
          alt={"direction"}
          className="w-[15px] h-[15px] object-cover dark:brightness-0 dark:invert"
        />
        {isReplacing ? (
          <span className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
        ) : locale === "ar" ? (
          "تبديل التجربة"
        ) : (
          "Replace Experience"
        )}
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
  const [isAddingDay, setIsAddingDay] = useState<number | null>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [noAlternativeModal, setNoAlternativeModal] = useState<{
    isOpen: boolean;
    type: string;
  }>({ isOpen: false, type: "" });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (planData) {
      sessionStorage.setItem("planner_generatedPlan", JSON.stringify(planData));
    }
  }, [planData]);

  const handleDeleteDay = (index: number) => {
    const newDays = [...planData.days];
    newDays.splice(index, 1);
    setPlanData({ ...planData, days: newDays });

    if (selectedDayIndex >= newDays.length) {
      setSelectedDayIndex(Math.max(0, newDays.length - 1));
    }
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    try {
      setIsExportingPDF(true);
      // Wait for React to render the full list
      await new Promise((resolve) => setTimeout(resolve, 300));

      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false, // Suppresses any stray warnings
        onclone: async (clonedDoc) => {
          const imgs = Array.from(clonedDoc.querySelectorAll("img"));
          const promises = imgs.map(async (img) => {
            img.removeAttribute("loading");
            img.removeAttribute("decoding");

            let src = img.currentSrc || img.src;
            if (img.srcset) {
              // Extract the first or last URL from srcset (often Next.js provides optimized paths here)
              const sources = img.srcset
                .split(",")
                .map((s) => s.trim().split(" ")[0]);
              if (sources.length > 0) {
                // Get the largest image from srcset (usually the last one)
                src = sources[sources.length - 1];
              }
            }

            if (!src || src.startsWith("data:")) return;

            try {
              // Route through our local proxy API to bypass CORS entirely
              const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(src)}`;
              const response = await fetch(proxyUrl);
              if (!response.ok) throw new Error("Network response was not ok");
              const blob = await response.blob();
              const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });

              img.removeAttribute("srcset");
              img.src = base64;
            } catch (err) {
              console.error("Failed to load image for PDF:", src, err);
            }
          });

          await Promise.all(promises);
        },
        ignoreElements: (node: Element) => {
          const className = node.className || "";
          if (
            typeof className === "string" &&
            (className.includes("userway") ||
              className.includes("uw-") ||
              className.includes("print-hidden"))
          ) {
            return true;
          }
          return false;
        },
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#14091F"
          : "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `discover-aseer-plan-${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF", error);
      alert(
        locale === "ar" ? "حدث خطأ أثناء تحميل الملف" : "Error downloading PDF",
      );
    } finally {
      setIsExportingPDF(false);
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

        if (errorData?.error === "NO_ALTERNATIVES") {
          setNoAlternativeModal({ isOpen: true, type: itemType });
          return;
        }
      }

      const data = await res.json();
      if (data.finalItem) {
        const newPlanData = { ...planData };
        const day = newPlanData.days[dayIndex];

        let replaced = false;
        if (day.periods) {
          day.periods.forEach((period: any) => {
            if (!replaced && period.items) {
              const idx = period.items.findIndex(
                (item: any) =>
                  item.type === itemType &&
                  String(item.itemId) === String(itemId),
              );
              if (idx !== -1) {
                period.items[idx] = data.finalItem;
                replaced = true;
              }
            }
          });
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

  const handleAddDay = async () => {
    const newDayIndex = planData.days.length;
    setIsAddingDay(newDayIndex);

    try {
      const payload = { currentPlanData: planData };

      const res = await fetch("/api/new-planner/add-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Backend error response:", errorData);
        throw new Error(errorData?.error || "Failed to add day");
      }

      const data = await res.json();
      if (data.newDay) {
        const newPlanData = {
          ...planData,
          planDetails: {
            ...planData.planDetails,
            totalDays: planData.days.length + 1,
          },
          days: [...planData.days, data.newDay],
        };
        setPlanData(newPlanData);
        setSelectedDayIndex(newPlanData.days.length - 1);
      }
    } catch (error) {
      console.error("Error adding day:", error);
      alert(
        locale === "ar"
          ? "حدث خطأ أثناء إضافة اليوم الجديد"
          : "Error adding a new day",
      );
    } finally {
      setIsAddingDay(null);
    }
  };

  useEffect(() => {
    if (!planData || !planData.days) return;
    const imageUrls: string[] = [];
    planData.days.forEach((day: any) => {
      day.periods?.forEach((period: any) => {
        period.items?.forEach((item: any) => {
          if (item.itemData?.image) imageUrls.push(item.itemData.image);
          if (item.itemData?.images && Array.isArray(item.itemData.images)) {
            item.itemData.images.forEach((img: string) => imageUrls.push(img));
          } else if (typeof item.itemData?.images === "string") {
            imageUrls.push(item.itemData.images);
          }
        });
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
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-4 print-hidden gap-4">
        <h2 className="text-2xl md:text-[32px] font-bold text-black dark:text-white">
          {t("yourPlan")}
        </h2>
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className={`flex flex-1 md:flex-none justify-center items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium transition-colors ${
              isExportingPDF
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer"
            }`}
          >
            {isExportingPDF ? (
              <span className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
            ) : locale === "ar" ? (
              "تحميل PDF"
            ) : (
              "Download PDF"
            )}
          </button>
          <button
            onClick={() => window.print()}
            className="flex flex-1 md:flex-none justify-center items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
            className={`flex flex-1 md:flex-none justify-center items-center gap-2 border border-[rgba(0,0,0,0.1)] dark:border-white/20 rounded-full px-6 py-2 text-black dark:text-white font-medium transition-colors ${
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
      <div className="w-full flex flex-wrap gap-4 pb-4 print-hidden">
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
                width: "90px",
                minHeight: "100px",
                padding: "12px 8px",
                gap: "8px",
                borderRadius: "16px",
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

        {/* Placeholder for remaining days up to 7 */}
        {Array.from({ length: Math.max(0, 7 - days.length) }).map((_, i) => {
          const newDayIndex = days.length + i;
          const isLoadingThisDay = isAddingDay === newDayIndex;

          return (
            <div
              key={`placeholder-${newDayIndex}`}
              onClick={() => {
                if (newDayIndex === days.length && !isAddingDay) {
                  handleAddDay();
                } else if (newDayIndex > days.length) {
                }
              }}
              className={`cursor-pointer transition-colors flex flex-col justify-center items-center shrink-0 bg-transparent text-black/50 dark:text-white/50 ${newDayIndex > days.length ? "opacity-50 cursor-not-allowed" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
              style={{
                width: "90px",
                minHeight: "100px",
                padding: "12px 8px",
                gap: "8px",
                borderRadius: "16px",
                border: "2px dashed rgba(0, 0, 0, 0.33)",
              }}
            >
              {isLoadingThisDay ? (
                <span className="animate-spin h-6 w-6 border-2 border-black dark:border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span className="text-2xl font-bold leading-none mb-1">
                    +
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {t(`day${newDayIndex + 1}`)}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* All Days Content (visible conditionally for print) */}
      <div
        className={`relative w-full ${isExportingPDF ? "p-8" : ""}`}
        ref={contentRef}
      >
        {days.map((dayToRender: any, dIndex: number) => {
          const isSelected = selectedDayIndex === dIndex;
          return (
            <div
              key={dIndex}
              className={`w-full flex-col p-6 bg-[#F7F7F7] dark:bg-[#14091F] print:relative! print:flex! print:opacity-100! print:h-auto! print:overflow-visible! print:mb-8 print:pointer-events-auto! print:mt-4! ${
                isSelected || isExportingPDF
                  ? "flex relative opacity-100 mt-4 z-10"
                  : "flex absolute top-0 left-0 opacity-0 h-0 overflow-hidden pointer-events-none -z-10"
              } ${isExportingPDF ? "mb-8 transform scale-90 origin-top" : ""}`}
              style={{
                borderRadius: "12px",
              }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white text-start mb-6">
                {t(`day${dIndex + 1}`)}
              </h3>

              <div className="flex flex-col w-full relative">
                {/* Vertical Timeline Line */}
                <div className="absolute top-10 bottom-10 rtl:right-[15px] ltr:left-[15px] w-0.5 bg-gray-200 dark:bg-white/10 z-0" />

                {dayToRender.periods?.map((period: any, pIdx: number) => {
                  const localizedPeriod =
                    locale === "ar"
                      ? period.periodName === "Morning"
                        ? "الصباح"
                        : period.periodName === "Afternoon"
                          ? "بعد الظهر"
                          : period.periodName === "Evening"
                            ? "المساء"
                            : period.periodName
                      : period.periodName;

                  return (
                    <div
                      key={pIdx}
                      className="w-full flex flex-col mb-4 relative z-10"
                    >
                      <TimelinePeriodHeader periodName={localizedPeriod} />

                      {period.items && period.items.length > 0 ? (
                        <div className="flex flex-col gap-6 w-full">
                          {period.items.map((item: any, iIdx: number) => {
                            const apiData = item.itemData;
                            if (!apiData) return null;

                            return (
                              <div
                                key={iIdx}
                                className="relative flex w-full group items-center"
                              >
                                {/* Dot */}
                                <div className="absolute top-1/2 -translate-y-1/2 rtl:right-[11px] ltr:left-[11px] w-2.5 h-2.5 rounded-full bg-black dark:bg-white border-2 border-white dark:border-[#14091F] z-10" />

                                <div className="w-full rtl:pr-10 ltr:pl-10">
                                  {item.type === "event" && (
                                    <PlannerEventCardNew
                                      event={transformApiEventToListingItem(
                                        apiData,
                                        locale as any,
                                      )}
                                      aiTime={item.time}
                                      onReplace={() =>
                                        handleReplaceItem(
                                          dIndex,
                                          "event",
                                          item.itemId,
                                        )
                                      }
                                      isReplacing={
                                        replacingItemId ===
                                        `${dIndex}-event-${item.itemId}`
                                      }
                                      locale={locale}
                                    />
                                  )}
                                  {item.type === "experience" && (
                                    <PlannerExperienceCardNew
                                      experience={transformExperience(
                                        apiData,
                                        locale as any,
                                      )}
                                      onReplace={() =>
                                        handleReplaceItem(
                                          dIndex,
                                          "experience",
                                          item.itemId,
                                        )
                                      }
                                      isReplacing={
                                        replacingItemId ===
                                        `${dIndex}-experience-${item.itemId}`
                                      }
                                      locale={locale}
                                    />
                                  )}
                                  {item.type === "restaurant" && (
                                    <PlannerRestaurantCardNew
                                      restaurant={transformLocationToRestaurant(
                                        apiData,
                                        locale as any,
                                      )}
                                      mealType={item.mealType}
                                      onReplace={() =>
                                        handleReplaceItem(
                                          dIndex,
                                          "restaurant",
                                          item.itemId,
                                        )
                                      }
                                      isReplacing={
                                        replacingItemId ===
                                        `${dIndex}-restaurant-${item.itemId}`
                                      }
                                      locale={locale}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-start text-sm rtl:pr-10 ltr:pl-10">
                          {locale === "ar"
                            ? "لا توجد نشاطات في هذه الفترة"
                            : "No activities for this period"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Alternative Modal */}
      {noAlternativeModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-[#1C0F2A] rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 border border-[rgba(204,204,204,0.37)] dark:border-white/10">
            <h3 className="text-xl font-bold text-black dark:text-white">
              {locale === "ar" ? "نعتذر" : "Sorry"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {noAlternativeModal.type === "restaurant"
                ? locale === "ar"
                  ? "عفواً، لا توجد مطاعم أخرى من هذا النوع!"
                  : "Sorry, no other restaurant from this type!"
                : noAlternativeModal.type === "experience"
                  ? locale === "ar"
                    ? "عفواً، لا توجد تجارب أخرى من هذا النوع!"
                    : "Sorry, no other experience from this type!"
                  : locale === "ar"
                    ? "عفواً، لا توجد فعاليات أخرى من هذا النوع!"
                    : "Sorry, no other event from this type!"}
            </p>
            <button
              onClick={() => setNoAlternativeModal({ isOpen: false, type: "" })}
              className="mt-4 w-full h-10 rounded-full bg-[#6027D2] text-white font-medium hover:bg-[#4b1d9c] transition-colors"
            >
              {locale === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
