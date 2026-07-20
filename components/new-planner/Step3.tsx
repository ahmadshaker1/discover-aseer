import { useTranslations } from "next-intl";
import { PlannerData } from "./types";

interface Step3Props {
  onPrev: () => void;
  plannerData: PlannerData;
}

export default function Step3({ onPrev, plannerData }: Step3Props) {
  const t = useTranslations("Planner");

  return (
    <div className="min-h-screen w-full flex justify-center pt-32 pb-12 md:pt-40 md:pb-20 bg-[linear-gradient(180deg,#E5D6F2,rgba(255,255,255,0.25)_50%)] dark:bg-none dark:bg-[#14091F] relative z-20">
      <div className="container mx-auto px-6 max-w-[800px] flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
          Step 3 - Review Current Data
        </h1>
        <div className="bg-white dark:bg-[#1C0F2A] p-6 rounded-xl shadow-md w-full mb-8 border border-[rgba(0,0,0,0.1)] dark:border-white/20">
          <pre className="text-sm text-black dark:text-white whitespace-pre-wrap">
            {JSON.stringify(plannerData, null, 2)}
          </pre>
        </div>

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
            borderRadius: "86px",
            background: "rgba(248, 248, 248, 0.00)",
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
      </div>
    </div>
  );
}
