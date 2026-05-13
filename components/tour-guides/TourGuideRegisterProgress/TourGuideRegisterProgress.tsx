import { useTranslations } from "next-intl";

const araBold = "var(--font-ara-hamah-1964), sans-serif";
const TOTAL_STEPS = 3;

export function segmentsFilledFromInputs(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(TOTAL_STEPS, Math.ceil((completed / total) * TOTAL_STEPS));
}

interface TourGuideRegisterProgressProps {
  /** Number of required controls satisfied (e.g. filled selects + file). */
  completedCount: number;
  /** Total tracked inputs (e.g. 7 = six dropdowns + upload). */
  totalCount: number;
  /** Wizard step shown in “الخطوة X من 3” (default 1 until more steps exist). */
  currentStep?: number;
}

/**
 * Three-segment progress (RTL: fills from the right). Spec: 1026×40 block, 5px bars, gap 5px, #7300CD / #9DA1A54D.
 */
const TourGuideRegisterProgress = ({
  completedCount,
  totalCount,
  currentStep = 1,
}: TourGuideRegisterProgressProps) => {
  const t = useTranslations("tourGuidesRegister");
  const filled = segmentsFilledFromInputs(completedCount, totalCount);
  const stepLabel = Math.min(TOTAL_STEPS, Math.max(1, currentStep));

  return (
    <div className="mx-auto flex w-full max-w-[1026px] flex-col gap-2">
      <p
        className={`w-full text-[18px] font-bold leading-[150%] text-[#292D30] text-start`}
        style={{ fontFamily: araBold }}
      >
        {t("stepProgress", { step: stepLabel, total: TOTAL_STEPS })}
      </p>
      <div
        className="flex h-[5px] w-full max-w-[1026px] gap-[5px]"
        role="progressbar"
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-label={t("formProgressAria")}
      >
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-[5px] min-w-0 flex-1 rounded-[2px] sm:max-w-[339px] ${
              idx < filled ? "bg-[#7300CD]" : "bg-[#9DA1A54D]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TourGuideRegisterProgress;
