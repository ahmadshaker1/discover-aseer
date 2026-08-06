import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PlannerData } from "./types";

interface Step2Props {
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

export default function Step2({
  onPrev,
  onNext,
  plannerData,
  updatePlannerData,
}: Step2Props) {
  const t = useTranslations("Planner");

  useEffect(() => {
    console.log("Data from Step 1:", plannerData);
  }, [plannerData]);

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        {/* Breadcrumb */}
        <div className="mb-10 flex w-full items-center gap-2 text-sm md:text-base text-gray-500 justify-start  dark:text-white">
          <a href="/" className="hover:underline">
            {t("homePage")}
          </a>
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
            {t("stepXofY", { step: 2, total: 4 })}
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
                background: "#D8D3E0",
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
            {t("tripStyleTitle")}
          </h1>
        </div>

        {/* Style Selection */}
        <div className="mb-12 w-full max-w-[600px] flex flex-col items-start gap-4">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("styleTitle")}
          </h2>

          <div
            className="w-full flex flex-wrap gap-4"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              }}
          >
            {[
              {
                id: "light",
                titleKey: "styleLight",
                descKey: "styleLightDesc",
                icon: "/assets/planner/Step2/Vector1.svg",
              },
              {
                id: "balanced",
                titleKey: "styleBalanced",
                descKey: "styleBalancedDesc",
                icon: "/assets/planner/Step2/Vector2.svg",
              },
              {
                id: "intensive",
                titleKey: "styleIntensive",
                descKey: "styleIntensiveDesc",
                icon: "/assets/planner/Step2/Vector3.svg",
              },
            ].map((styleOption) => {
              const isSelected = plannerData.tripStyle === styleOption.id;
              return (
                <button
                  key={styleOption.id}
                  onClick={() =>
                    updatePlannerData({ tripStyle: styleOption.id })
                  }
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
                    src={styleOption.icon}
                    alt={t(styleOption.titleKey)}
                    width={24}
                    height={24}
                    className={
                      !isSelected ? "dark:brightness-0 dark:invert" : ""
                    }
                  />
                  <span style={{ fontSize: "18px", fontWeight: 700 }}>
                    {t(styleOption.titleKey)}
                  </span>
                  <span
                    className={
                      isSelected
                        ? "text-black dark:text-black"
                        : "text-[#535353] dark:text-gray-300"
                    }
                    style={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      }}
                  >
                    {t(styleOption.descKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Selection */}
        <div className="mb-12 w-full max-w-[600px] flex flex-col items-start gap-4">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("budgetTitle")}
          </h2>

          <div
            className="w-full flex flex-wrap gap-2"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              }}
          >
            {[
              {
                id: "economy",
                titleKey: "budgetEconomy",
                icon: "/assets/planner/Step2/bank-card-line.svg",
              },
              {
                id: "medium",
                titleKey: "budgetMedium",
                icon: "/assets/planner/Step2/refund-2-fill.svg",
              },
              {
                id: "premium",
                titleKey: "budgetPremium",
                icon: "/assets/planner/Step2/vip-crown-line.svg",
              },
            ].map((budgetOption) => {
              const isSelected = plannerData.budget === budgetOption.id;
              return (
                <button
                  key={budgetOption.id}
                  onClick={() => updatePlannerData({ budget: budgetOption.id })}
                  className={`cursor-pointer transition-colors flex items-center ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    padding: "8px 16px",
                    gap: "6px",
                    borderRadius: "55px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <Image
                    src={budgetOption.icon}
                    alt={t(budgetOption.titleKey)}
                    width={20}
                    height={20}
                    className={
                      !isSelected ? "dark:brightness-0 dark:invert" : ""
                    }
                  />
                  {t(budgetOption.titleKey)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Companion Selection */}
        <div className="mb-12 w-full max-w-[600px] flex flex-col items-start gap-4">
          <h2
            className=" text-black dark:text-white"
            style={{
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            {t("companionTitle")}
          </h2>

          <div
            className="w-full flex flex-wrap gap-2"
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              }}
          >
            {[
              {
                id: "couple",
                titleKey: "companionCouple",
                icon: "/assets/planner/Step2/group-line.svg",
              },
              {
                id: "family",
                titleKey: "companionFamily",
                icon: "/assets/planner/Step2/team-line.svg",
              },
              {
                id: "solo",
                titleKey: "companionSolo",
                icon: "/assets/planner/Step2/user-3-line.svg",
              },
              {
                id: "friends",
                titleKey: "companionFriends",
                icon: "/assets/planner/Step2/emotion-happy-line.svg",
              },
              {
                id: "group",
                titleKey: "companionGroup",
                icon: "/assets/planner/Step2/bus-2-line.svg",
              },
            ].map((companionOption) => {
              const isSelected = plannerData.companion === companionOption.id;
              return (
                <button
                  key={companionOption.id}
                  onClick={() =>
                    updatePlannerData({ companion: companionOption.id })
                  }
                  className={`cursor-pointer transition-colors flex items-center ${isSelected ? "bg-[#CEEEEE] text-black" : "bg-white dark:bg-[#1C0F2A] text-black dark:text-white"}`}
                  style={{
                    padding: "8px 16px",
                    gap: "6px",
                    borderRadius: "55px",
                    border: isSelected
                      ? "2px solid #00BBB4"
                      : "1px solid rgba(0, 0, 0, 0.10)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <Image
                    src={companionOption.icon}
                    alt={t(companionOption.titleKey)}
                    width={20}
                    height={20}
                    className={
                      !isSelected ? "dark:brightness-0 dark:invert" : ""
                    }
                  />
                  {t(companionOption.titleKey)}
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
              console.log("Collected Planner Data after Step 2:", plannerData);
              onNext();
            }}
            className={`cursor-pointer border border-[rgba(40,0,72,0.16)] dark:border-white/20 bg-[#F3E4FF] text-[#7300CD] dark:bg-[#F3E4FF] dark:text-[#7300CD]`}
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
