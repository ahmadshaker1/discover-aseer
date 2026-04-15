"use client";

import Image from "next/image";

interface FilterOption {
  value: string;
  count: number;
}

interface ServicesSupportFilterSidebarProps {
  cityOptions: FilterOption[];
  categoryOptions: FilterOption[];
  typeOptions: FilterOption[];
  selectedCities: string[];
  selectedCategories: string[];
  selectedTypes: string[];
  onToggleCity: (value: string) => void;
  onToggleCategory: (value: string) => void;
  onToggleType: (value: string) => void;
  onReset: () => void;
}

interface CheckboxRowProps {
  option: FilterOption;
  checked: boolean;
  onToggle: (value: string) => void;
}

const CheckboxRow = ({ option, checked, onToggle }: CheckboxRowProps) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-1 py-1 transition-colors hover:bg-gray-100/70">
      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#E9EAEE] px-2 text-[20px] font-semibold leading-none text-[#2C2E33]">
        {option.count}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-[16px] font-semibold text-[#1F2128]">
          {option.value}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(option.value)}
          className="h-6 w-6 cursor-pointer rounded-lg border-2 border-[#D3D4D8] bg-white text-[#7A39E0] focus:ring-[#7A39E0]"
        />
      </div>
    </label>
  );
};

const ServicesSupportFilterSidebar = ({
  cityOptions,
  categoryOptions,
  typeOptions,
  selectedCities,
  selectedCategories,
  selectedTypes,
  onToggleCity,
  onToggleCategory,
  onToggleType,
  onReset,
}: ServicesSupportFilterSidebarProps) => {
  const useCategoryFilter = categoryOptions.length > 0;
  const serviceTypeOptions = useCategoryFilter ? categoryOptions : typeOptions;
  const selectedServiceTypes = useCategoryFilter
    ? selectedCategories
    : selectedTypes;
  const onToggleServiceType = useCategoryFilter
    ? onToggleCategory
    : onToggleType;

  return (
    <aside
      className="w-full max-w-[300px] rounded-2xl bg-[#FFFFFF] p-4 sm:p-5"
      dir="rtl"
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <h2 className="text-[14px] font-bold leading-tight text-[#14151A]">
          تصفية الخدمات
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-black/75 underline-offset-2 transition hover:text-black hover:underline"
        >
          إعادة تعيين النتائج
        </button>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-end gap-2">
          <Image
            src="/assets/services-support/Vector.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain opacity-70"
          />
          <h3 className="text-[14px] font-bold leading-tight text-[#1B1D23]">
            اختر نوع الخدمة المساندة
          </h3>
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

      {cityOptions.length > 0 ? (
        <section className="mt-5">
          <h3 className="mb-2 text-sm font-bold text-[#1B1D23]">
            اختر المدينة
          </h3>
          <div className="space-y-2">
            {cityOptions.map((option) => (
              <CheckboxRow
                key={option.value}
                option={option}
                checked={selectedCities.includes(option.value)}
                onToggle={onToggleCity}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="my-5 h-px w-full bg-[#D5D5D8]" />

      <section>
        <h3 className="mb-3 text-[15px] font-bold text-[#111318]">
          مركز الاتصال الدولي:
        </h3>
        <a
          href="tel:+966920000890"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E7D8F3] px-3 text-[18px] font-semibold text-[#6D1FE0] transition hover:brightness-95"
          dir="ltr"
        >
          <span aria-hidden className="text-base leading-none">
            ☏
          </span>
          <span className="leading-none">+966920000890</span>
        </a>
      </section>
    </aside>
  );
};

export default ServicesSupportFilterSidebar;
