import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

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

interface WelcomePageProps {
  onStartPlanning?: () => void;
}

export default function WelcomePage({ onStartPlanning }: WelcomePageProps) {
  const t = useTranslations("Planner");
  const locale = useLocale();

  return (
    <div className="min-h-screen w-full flex items-center bg-[linear-gradient(180deg,rgba(21,21,131,0.25)_0%,rgba(255,255,255,0.25)_100%)] dark:bg-none dark:bg-[#14091F] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between relative z-10 w-full gap-8">
        {/* Text Section */}
        <div className="flex w-full md:w-1/2 max-w-[650px] flex-col items-start pt-20 md:pt-0">
          {/* Breadcrumb */}
          <div className="mb-6 flex w-full items-center gap-2 text-sm md:text-base text-gray-500 dark:text-gray-400 justify-start">
            <a href="/" className="hover:underline">
              {t("homePage")}
            </a>
            <span aria-hidden>
              <BreadcrumbChevron />
            </span>
            <p>{t("crumbPlanner")}</p>
          </div>

          {/* Title */}
          <h1
            className="mb-4 text-black dark:text-white"
            style={{
              fontSize: "74px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "1.1",
            }}
          >
            {t("heroTitle")}
          </h1>

          {/* Subtitle */}
          <p
            className="mb-8 text-start text-[#535353] dark:text-gray-300"
            style={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.32px",
            }}
          >
            {t("heroSubtitle")}
          </p>

          {/* Button */}
          <button
            onClick={onStartPlanning}
            className="hover:opacity-90 transition-opacity cursor-pointer"
            style={{
              display: "flex",
              height: "44px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
              background: "var(--Pramiry-Colors-Purple, #7300CD)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("startPlanning")}
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Section */}
        <div className="flex w-full md:w-1/2 justify-center mt-5 md:mt-0 pointer-events-none">
          <Image
            src={`/assets/planner/PlannerHero.jpg`}
            alt="Planner Map"
            width={1000}
            height={1000}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
