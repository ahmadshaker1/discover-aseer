"use client";
import { useLocale, useTranslations } from "next-intl";

interface FilterOption {
  value: string;
  count: number;
}

interface ServicesSupportFilterSidebarProps {
  cityOptions: FilterOption[];
  categoryOptions: FilterOption[];
  typeOptions: FilterOption[];
  selectedCity: string | null;
  selectedCategories: string[];
  selectedTypes: string[];
  onCityChange: (value: string | null) => void;
  onToggleCategory: (value: string) => void;
  onToggleType: (value: string) => void;
  onReset: () => void;
}

interface TypeRowOption {
  value: string;
  count: number;
}

interface CheckboxRowProps {
  option: TypeRowOption;
  checked: boolean;
  onToggle: (value: string) => void;
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 10L12 15L17 10"
        stroke="#535353"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
        stroke="#535353"
        strokeWidth="1.5"
      />
      <path
        d="M19.5 10.5C19.5 16.5 12 21 12 21C12 21 4.5 16.5 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5Z"
        stroke="#535353"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const CheckboxRow = ({ option, checked, onToggle }: CheckboxRowProps) => {
  return (
    <label className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 py-1.5 sm:gap-3">
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-[8px] border border-black bg-[#ECEEF2] px-2 py-[2px] text-[12px] font-bold leading-none text-[#2C2E33]">
          {option.count}
        </span>
      </div>
      <div
        className="min-w-0 flex-1 text-right text-[clamp(15px,3.6vw,18px)] font-bold leading-[119%] text-[#1B1D23]"
        style={{ fontFamily: ara }}
        dir="rtl"
      >
        {option.value}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(option.value)}
          className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-[#0000001A] bg-[#F3F3F5] shadow-[0px_1px_2px_0px_#0000000D] checked:border-[#6027D2] checked:bg-[#6027D2]"
        />
        <svg
          className="pointer-events-none absolute left-0 top-0 hidden h-4 w-4 peer-checked:block"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M4 8.3L6.7 11L12 5.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
};

const ServicesSupportFilterSidebar = ({
  cityOptions,
  categoryOptions,
  typeOptions,
  selectedCity,
  selectedCategories,
  selectedTypes,
  onCityChange,
  onToggleCategory,
  onToggleType,
  onReset,
}: ServicesSupportFilterSidebarProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const tCommon = useTranslations("common");
  const useCategoryFilter = categoryOptions.length > 0;
  const allTypeOptions = useCategoryFilter ? categoryOptions : typeOptions;
  const serviceTypesOrder = ["مراكز الشرطة", "مستشفيات", "المطارات"];
  const serviceTypeOptions: TypeRowOption[] = serviceTypesOrder.map((label) => ({
    value: label,
    count: allTypeOptions.find((o) => o.value === label)?.count ?? 0,
  }));
  const selectedServiceTypes = useCategoryFilter
    ? selectedCategories
    : selectedTypes;
  const onToggleServiceType = useCategoryFilter
    ? onToggleCategory
    : onToggleType;

  return (
    <aside className="w-full max-w-full rounded-2xl bg-[#FFFFFF] p-4 sm:p-5 lg:max-w-[320px]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mb-6 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-2">
        <h2
          className="min-w-0 flex-1 text-right text-[clamp(18px,4vw,24px)] font-bold leading-6 tracking-[-0.31px] text-[#0A0A0A]"
          style={{ fontFamily: "Ara Hamah 1964 B" }}
        >
          {isRtl ? "تصفية الخدمات" : "Filter services"}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-t border-[#0000001A] bg-white px-2 text-center text-[clamp(14px,3.5vw,18px)] font-bold leading-5 tracking-[-0.15px] text-[#0A0A0A] hover:opacity-80 sm:min-w-[156px] sm:px-3"
          style={{ fontFamily: ara }}
        >
          {tCommon("resetFilters")}
        </button>
      </div>

      <section className="mb-6">
        <div className="relative h-12 w-full overflow-hidden rounded-[55px] border border-[#9B9B9C] px-6 py-3">
          <select
            style={{ fontFamily: "Ara Hamah 1964 B" }}
            aria-label={isRtl ? "اختر وجهتك" : "Choose destination"}
            value={selectedCity ?? ""}
            onChange={(e) => onCityChange(e.target.value || null)}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          >
            <option value="">{isRtl ? "اختر وجهتك" : "Choose destination"}</option>
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <div className="flex h-full min-w-0 items-center justify-between gap-2" dir={isRtl ? "rtl" : "ltr"}>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0">
                <LocationIcon />
              </span>
              <span className="truncate text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#0A0A0A]">
                {selectedCity ?? (isRtl ? "اختر وجهتك" : "Choose destination")}
              </span>
            </div>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="#1D1B20" />
            </svg>

          </div>
        </div>
      </section>
      <div className="my-5 h-px w-full bg-[#D5D5D8]" />
      <section dir={isRtl ? "rtl" : "ltr"}>
        <div className="mb-4 flex items-center justify-end gap-2 ">
          <h3 className="text-right text-[20px] font-bold leading-[119%] text-[#1B1D23]" style={{ fontFamily: ara }}>
            {isRtl ? "اختر نوع الخدمة المساندة" : "Choose support service type"}
          </h3>

          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 18H22V20H0V18H2V1C2 0.734784 2.10536 0.48043 2.29289 0.292893C2.48043 0.105357 2.73478 0 3 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V18ZM18 18V2H4V18H18ZM7 9H10V11H7V9ZM7 5H10V7H7V5ZM7 13H10V15H7V13ZM12 13H15V15H12V13ZM12 9H15V11H12V9ZM12 5H15V7H12V5Z" fill="#9B9B9C" />
          </svg>

        </div>

        <div className="space-y-2">
          {serviceTypeOptions.map((option) => (
            <CheckboxRow
              key={option.value}
              option={option}
              checked={selectedServiceTypes.includes(option.value)}
              onToggle={onToggleServiceType}
            />
          ))}
        </div>
      </section>

      <div className="my-5 h-px w-full bg-[#D5D5D8]" />

      <section>
        <h3 className="mb-3 text-[15px] font-bold text-[#111318] text-right">
          <span dir="ltr">{isRtl ? " : مركز الاتصال الدولي " : "International call center: "}</span>
        </h3>
        <a
          href="tel:+966920000890"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E7D8F3] px-3 text-[18px] font-semibold text-[#6D1FE0] transition hover:brightness-95"
          dir="ltr"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3.183 3.841C3.65217 4.66524 4.33476 5.34783 5.159 5.817L5.601 5.198C5.67208 5.09847 5.77717 5.02844 5.8964 5.00117C6.01563 4.97389 6.14072 4.99127 6.248 5.05C6.95516 5.43646 7.7361 5.66889 8.5395 5.732C8.66489 5.74194 8.78192 5.79877 8.86727 5.89116C8.95262 5.98355 9.00002 6.10472 9 6.2305V8.4615C9.00003 8.5853 8.95413 8.7047 8.87118 8.79661C8.78824 8.88851 8.67415 8.94637 8.551 8.959C8.286 8.9865 8.019 9 7.75 9C3.47 9 0 5.53 0 1.25C0 0.981 0.0135 0.714 0.041 0.449C0.0536273 0.325849 0.111492 0.21176 0.203395 0.128817C0.295298 0.0458736 0.414703 -2.66789e-05 0.5385 1.16336e-08H2.7695C2.89528 -1.57593e-05 3.01645 0.0473758 3.10884 0.132725C3.20123 0.218075 3.25806 0.335112 3.268 0.4605C3.33111 1.2639 3.56354 2.04484 3.95 2.752C4.00873 2.85928 4.02611 2.98437 3.99883 3.1036C3.97156 3.22282 3.90153 3.32792 3.802 3.399L3.183 3.841ZM1.922 3.5125L2.872 2.834C2.60239 2.25205 2.41768 1.63442 2.3235 1H1.005C1.002 1.083 1.0005 1.1665 1.0005 1.25C1 4.978 4.022 8 7.75 8C7.8335 8 7.917 7.9985 8 7.995V6.6765C7.36558 6.58232 6.74795 6.39761 6.166 6.128L5.4875 7.078C5.21433 6.97186 4.949 6.84655 4.6935 6.703L4.6645 6.6865C3.68379 6.12836 2.87164 5.31621 2.3135 4.3355L2.297 4.3065C2.15345 4.051 2.02814 3.78567 1.922 3.5125Z"
              fill="#6D1FE0"
            />
          </svg>
          <div className="text-sm">+966920000890</div>
        </a>
      </section>
    </aside>
  );
};

export default ServicesSupportFilterSidebar;
