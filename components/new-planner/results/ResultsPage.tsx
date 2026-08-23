/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { PlannerData } from "../types";
import PlanItinerary from "./PlanItinerary";

interface ResultsPageProps {
  data: any;
  plannerData: PlannerData;
  onRestart: () => void;
}

const BUDGET_OPTIONS: Record<string, { key: string; icon: string }> = {
  economy: {
    key: "budgetEconomy",
    icon: "/assets/planner/Step2/bank-card-line.svg",
  },
  medium: {
    key: "budgetMedium",
    icon: "/assets/planner/Step2/refund-2-fill.svg",
  },
  premium: {
    key: "budgetPremium",
    icon: "/assets/planner/Step2/vip-crown-line.svg",
  },
};

const COMPANION_OPTIONS: Record<string, { key: string; icon: string }> = {
  couple: {
    key: "companionCouple",
    icon: "/assets/planner/Step2/group-line.svg",
  },
  family: {
    key: "companionFamily",
    icon: "/assets/planner/Step2/team-line.svg",
  },
  solo: { key: "companionSolo", icon: "/assets/planner/Step2/user-3-line.svg" },
  friends: {
    key: "companionFriends",
    icon: "/assets/planner/Step2/emotion-happy-line.svg",
  },
  group: {
    key: "companionGroup",
    icon: "/assets/planner/Step2/bus-2-line.svg",
  },
};

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

export default function ResultsPage({
  data,
  plannerData,
  onRestart,
}: ResultsPageProps) {
  const t = useTranslations("Planner");

  const selectedDays = plannerData.selectedDays || 1;
  const companionOpt = plannerData.companion
    ? COMPANION_OPTIONS[plannerData.companion]
    : null;
  const budgetOpt = plannerData.budget
    ? BUDGET_OPTIONS[plannerData.budget]
    : null;

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-white dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start ">
        {/* Breadcrumb */}
        <div className="mb-10 flex w-full items-center gap-2 text-sm md:text-base text-gray-500 justify-start dark:text-white">
          <Link href="/" className="hover:underline">
            {t("homePage")}
          </Link>
          <span aria-hidden>
            <BreadcrumbChevron />
          </span>
          <p>{t("crumbPlanner")}</p>
        </div>

        {/* Title and Restart Button */}
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-black dark:text-white text-[24px] md:text-[36px] font-bold">
            {t("yourTripInAseer")} · {t("daysFormat", { count: selectedDays })}
          </h3>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 cursor-pointer text-black dark:text-white bg-white dark:bg-[#1C0F2A]"
            style={{
              borderRadius: "86px",
              border: "1px solid #E5E5E5",
              padding: "10px 16px",
              fontSize: "16px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <Image
              src="/assets/planner/Refresh.svg"
              alt="Refresh"
              width={20}
              height={20}
              className="dark:invert"
            />
            {t("replanTrip")}
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 w-full mb-8">
          {/* Days Badge */}
          <div
            className="text-black dark:text-white bg-[#F4F4F4] dark:bg-white/10"
            style={{
              display: "flex",
              padding: "8px 16px",
              alignItems: "flex-start",
              gap: "6px",
              borderRadius: "55px",
            }}
          >
            <Image
              src="/assets/planner/calendar-line.svg"
              alt="Days"
              width={20}
              height={20}
              className="dark:invert"
            />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              {t("daysFormat", { count: selectedDays })}
            </span>
          </div>

          {/* Date Badge */}
          {plannerData.selectedDate && (
            <div
              className="text-black dark:text-white bg-[#F4F4F4] dark:bg-white/10"
              style={{
                display: "flex",
                padding: "8px 16px",
                alignItems: "flex-start",
                gap: "6px",
                borderRadius: "55px",
              }}
            >
              <Image
                src="/assets/planner/flight-land-fill.svg"
                alt="Date"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                {new Date(plannerData.selectedDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </span>
            </div>
          )}

          {/* Companion Badge */}
          {companionOpt && (
            <div
              className="text-black dark:text-white bg-[#F4F4F4] dark:bg-white/10"
              style={{
                display: "flex",
                padding: "8px 16px",
                alignItems: "flex-start",
                gap: "6px",
                borderRadius: "55px",
              }}
            >
              <Image
                src={companionOpt.icon}
                alt="Companion"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                {t(companionOpt.key)}
              </span>
            </div>
          )}

          {/* Budget Badge */}
          {budgetOpt && (
            <div
              className="text-black dark:text-white bg-[#F4F4F4] dark:bg-white/10"
              style={{
                display: "flex",
                padding: "8px 16px",
                alignItems: "flex-start",
                gap: "6px",
                borderRadius: "55px",
              }}
            >
              <Image
                src={budgetOpt.icon}
                alt="Budget"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                {t(budgetOpt.key)}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-[rgba(0,0,0,0.1)] dark:border-white/10 my-8" />

        {/* AI Plan Data */}
        <PlanItinerary data={data} />
      </div>
    </div>
  );
}
