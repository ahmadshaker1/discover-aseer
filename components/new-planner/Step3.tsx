import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { PlannerData } from "./types";

interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  plannerData: PlannerData;
  updatePlannerData: (updates: Partial<PlannerData>) => void;
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

export default function Step3({
  onPrev,
  onNext,
  plannerData,
  updatePlannerData,
}: Step3Props) {
  const t = useTranslations("Planner");

  const toggleInterest = (id: string) => {
    const currentInterests = plannerData.interests || [];
    if (currentInterests.includes(id)) {
      updatePlannerData({
        interests: currentInterests.filter((item) => item !== id),
      });
    } else {
      updatePlannerData({
        interests: [...currentInterests, id],
      });
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
            {t("stepXofY", { step: 3, total: 4 })}
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
                background: "#D8D3E0",
              }}
            ></div>
          </div>
        </div>

        {/* Titles */}
        <div className="flex flex-col items-start mb-10">
          <h1
            className=" text-black dark:text-white"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("interestsTitle")}
          </h1>
        </div>

        {/* Style Selection */}
        <div className="mb-12 w-full max-w-[600px] flex flex-col items-start">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("exploreTitle")}
          </h2>

          <p
            className="text-[#535353] dark:text-gray-300 mb-2"
            style={{
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            {t("exploreDesc")}
          </p>

          <div
            className="w-full flex flex-wrap gap-4 mt-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {[
              {
                id: "nature",
                titleKey: "interestNature",
                icon: "/assets/planner/Step3/S3.1.svg",
              },
              {
                id: "heritage",
                titleKey: "interestHeritage",
                icon: "/assets/planner/Step3/S3.2.svg",
              },
              {
                id: "family",
                titleKey: "interestFamily",
                icon: "/assets/planner/Step3/S3.3.svg",
              },
              {
                id: "culture",
                titleKey: "interestCulture",
                icon: "/assets/planner/Step3/S3.4.svg",
              },
              {
                id: "food",
                titleKey: "interestFood",
                icon: "/assets/planner/Step3/S3.5.svg",
              },
              {
                id: "adventure",
                titleKey: "interestAdventure",
                icon: "/assets/planner/Step3/S3.6.svg",
              },
            ].map((interestOption) => {
              const currentInterests = plannerData.interests || [];
              const isSelected = currentInterests.includes(interestOption.id);

              return (
                <button
                  key={interestOption.id}
                  onClick={() => toggleInterest(interestOption.id)}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    display: "flex",
                    height: "120px",
                    padding: "0 12px",
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
                  <Image
                    src={interestOption.icon}
                    alt={t(interestOption.titleKey)}
                    width={24}
                    height={24}
                    className={
                      !isSelected ? "dark:brightness-0 dark:invert" : ""
                    }
                  />
                  <span style={{ fontSize: "18px", fontWeight: 700 }}>
                    {t(interestOption.titleKey)}
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
            className="cursor-pointer text-black dark:text-white border border-[rgba(40,0,72,0.16)] dark:border-white dark:bg-[#1C0F2A]"
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
            onClick={() => {
              onNext();
            }}
            disabled={
              !plannerData.interests || plannerData.interests.length === 0
            }
            className={`cursor-pointer border border-[rgba(40,0,72,0.16)] dark:border-white/20 ${
              plannerData.interests && plannerData.interests.length > 0
                ? "bg-[#F3E4FF] text-[#7300CD] dark:bg-[#F3E4FF] dark:text-[#7300CD]"
                : "bg-[#D8D3E0] text-[#888] dark:bg-white/5 dark:text-gray-400"
            }`}
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
              cursor:
                plannerData.interests && plannerData.interests.length > 0
                  ? "pointer"
                  : "not-allowed",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {t("next")}
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
          </button>
        </div>
      </div>
    </div>
  );
}
