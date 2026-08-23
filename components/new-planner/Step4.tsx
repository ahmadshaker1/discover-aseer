import { useTranslations } from "next-intl";
import Link from "next/link";
import { PlannerData } from "./types";

interface Step4Props {
  onPrev: () => void;
  onSubmit: () => void;
  plannerData: PlannerData;
  updatePlannerData: (updates: Partial<PlannerData>) => void;
  isSubmitting?: boolean;
}

function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="rotate-180 rtl:rotate-0"
    >
      <path
        d="M4.25135 -1.87195e-06C4.35427 -1.88095e-06 4.45719 0.0379143 4.53844 0.119164C4.69552 0.276247 4.69552 0.536248 4.53844 0.693332L1.00677 4.225C0.74677 4.485 0.74677 4.9075 1.00677 5.1675L4.53844 8.69916C4.69552 8.85625 4.69552 9.11625 4.53844 9.27333C4.38135 9.43041 4.12135 9.43041 3.96427 9.27333L0.432604 5.74167C0.156354 5.46542 -0.00072946 5.09166 -0.000729494 4.69625C-0.000729529 4.30083 0.150937 3.92708 0.432603 3.65083L3.96427 0.119165C4.04552 0.0433312 4.14844 -1.86295e-06 4.25135 -1.87195e-06Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Step4({
  onPrev,
  onSubmit,
  plannerData,
  updatePlannerData,
  isSubmitting,
}: Step4Props) {
  const t = useTranslations("Planner");

  const toggleFoodPreference = (id: string) => {
    const current = plannerData.foodPreferences || [];
    if (current.includes(id)) {
      updatePlannerData({
        foodPreferences: current.filter((item) => item !== id),
      });
    } else {
      updatePlannerData({ foodPreferences: [...current, id] });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        {/* Breadcrumb */}
        <div className="mb-10 flex w-full items-center gap-2 text-sm md:text-base text-gray-500 justify-start  dark:text-white">
          <Link href="/" className="hover:underline">
            {t("homePage")}
          </Link>
          <span aria-hidden>
            <BreadcrumbChevron />
          </span>
          <p>{t("crumbPlanner")}</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full flex flex-col items-start gap-3 mb-5">
          <p
            className=""
            style={{
              color: "var(--Main-Text-Color, #292D30) dark:text-white",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("stepXofY", { step: 4, total: 4 })}
          </p>
          <div className="flex gap-2 w-full">
            <div
              style={{
                height: "5px",
                flex: "1 0 0",
                borderRadius: "2px",
                background: "#7300CD",
              }}
            ></div>
            <div
              style={{
                height: "5px",
                flex: "1 0 0",
                borderRadius: "2px",
                background: "#7300CD",
              }}
            ></div>
            <div
              style={{
                height: "5px",
                flex: "1 0 0",
                borderRadius: "2px",
                background: "#7300CD",
              }}
            ></div>
            <div
              style={{
                height: "5px",
                flex: "1 0 0",
                borderRadius: "2px",
                background: "#7300CD",
              }}
            ></div>
          </div>
        </div>

        {/* Titles */}
        <div className="flex flex-col items-start mb-10">
          <h1
            className="mb-2 text-black dark:text-white"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("foodPreferencesTitle")}
          </h1>
        </div>

        {/* Section 1: Meals Count */}
        <div className="w-full flex flex-col mb-12">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("mealsCountTitle")}
          </h2>
          <div
            className="w-full flex flex-wrap gap-2 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              }}
          >
            {[
              { id: "3", label: t("mealsCount3") },
              { id: "2", label: t("mealsCount2") },
              { id: "1", label: t("mealsCount1") },
              { id: "0", label: t("mealsCount0") },
            ].map((meal) => {
              const isSelected = plannerData.mealsCount === meal.id;
              return (
                <button
                  key={meal.id}
                  onClick={() => updatePlannerData({ mealsCount: meal.id })}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "6px",
                    borderRadius: "55px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {meal.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Food Preferences */}
        <div className="w-full flex flex-col  mb-12">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("foodTypeTitle")}
          </h2>
          <div
            className="w-full flex flex-wrap gap-4 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              }}
          >
            {[
              { id: "local", title: t("foodLocal"), desc: t("foodLocalDesc") },
              {
                id: "italian",
                title: t("foodItalian"),
                desc: t("foodItalianDesc"),
              },
              {
                id: "indian",
                title: t("foodIndian"),
                desc: t("foodIndianDesc"),
              },
              {
                id: "american",
                title: t("foodAmerican"),
                desc: t("foodAmericanDesc"),
              },
              {
                id: "mexican",
                title: t("foodMexican"),
                desc: t("foodMexicanDesc"),
              },
              {
                id: "middle_eastern",
                title: t("foodMiddleEastern"),
                desc: t("foodMiddleEasternDesc"),
              },
              {
                id: "far_eastern",
                title: t("foodFarEastern"),
                desc: t("foodFarEasternDesc"),
              },
            ].map((option) => {
              const currentPrefs = plannerData.foodPreferences || [];
              const isSelected = currentPrefs.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => toggleFoodPreference(option.id)}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    display: "flex",
                    minHeight: "120px",
                    padding: "16px 12px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "6px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    flex: "1 1 0",
                    minWidth: "140px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      textAlign: "start",
                    }}
                  >
                    {option.title}
                  </span>
                  <span
                    className="opacity-70 text-sm text-start"
                  >
                    {option.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-start gap-4 mt-8 max-w-[300px]">
          <button
            onClick={onPrev}
            disabled={isSubmitting}
            className={`cursor-pointer text-black dark:text-white border border-[rgba(40,0,72,0.16)] dark:border-white dark:bg-[#1C0F2A] ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{
              display: "flex",
              height: "46px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flex: "1 0 0",
              borderRadius: "86px",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            {t("previous")}
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`cursor-pointer border border-[rgba(40,0,72,0.16)] dark:border-white/20 bg-[#F3E4FF] text-[#7300CD] dark:bg-[#F3E4FF] dark:text-[#7300CD] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{
              display: "flex",
              height: "46px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              borderRadius: "86px",
              fontSize: "20px",
              fontWeight: 600,
              transition: "all 0.2s ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-6 w-6 text-[#7300CD]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                {t("planMyTrip")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rtl:rotate-180 "
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
