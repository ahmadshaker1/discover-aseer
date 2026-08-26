import Link from "next/link";
import { useTranslations } from "next-intl";

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

interface StepHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepHeader({
  currentStep,
  totalSteps = 4,
}: StepHeaderProps) {
  const t = useTranslations("Planner");

  return (
    <>
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

      {/* Progress Bar Container */}
      <div className="w-full flex flex-col items-start gap-3 mb-5">
        <p
          className="text-[#292D30] dark:text-white"
          style={{
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
          }}
        >
          {t("stepXofY", { step: currentStep, total: totalSteps })}
        </p>
        <div className="flex gap-2 w-full">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              style={{
                height: "5px",
                flex: "1 0 0",
                borderRadius: "2px",
                background: index < currentStep ? "#7300CD" : "#D8D3E0",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
