"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import {
  SUPPORT_CATEGORY_FILTER_KEYS,
  translateSupportCity,
  translateSupportLabel,
} from "./supportServiceLocale";
import {
  CheckboxCheckIcon,
  LocationIcon,
  PhoneIcon,
  ServiceTypeIcon,
} from "./Icons";

interface FilterOption {
  value: string;
  count: number;
}

interface ServicesSupportFilterSidebarProps {
  cityOptions: FilterOption[];
  typeOptions: FilterOption[];
  selectedCity: string | null;
  selectedTypes: string[];
  onCityChange: (value: string | null) => void;
  onToggleType: (value: string) => void;
  onReset: () => void;
}

interface TypeRowOption {
  value: string;
  count: number;
}

interface CheckboxRowProps {
  option: TypeRowOption;
  label: string;
  checked: boolean;
  onToggle: (value: string) => void;
}


const CheckboxRow = ({
  option,
  label,
  checked,
  onToggle,
}: CheckboxRowProps) => {
  return (
    <label className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 py-1.5 sm:gap-3">
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-[8px] border border-border bg-muted px-2 py-[2px] text-[12px] font-bold leading-none text-foreground">
          {option.count}
        </span>
      </div>
      <div
        className="min-w-0 flex-1 text-start text-[clamp(15px,3.6vw,18px)] font-bold leading-[119%] text-foreground"
      >
        {label}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(option.value)}
          className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-border bg-muted shadow-[0px_1px_2px_0px_#0000000D] checked:border-primary checked:bg-primary"
        />
        <CheckboxCheckIcon />
      </div>
    </label>
  );
};

const ServicesSupportFilterSidebar = ({
  cityOptions,
  typeOptions,
  selectedCity,
  selectedTypes,
  onCityChange,
  onToggleType,
  onReset,
}: ServicesSupportFilterSidebarProps) => {
  const t = useTranslations("servicesSupport");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "ar" | "en";
  const serviceTypeOptions: TypeRowOption[] = SUPPORT_CATEGORY_FILTER_KEYS.map(
    (filterKey) => ({
      value: filterKey,
      count: typeOptions.find((o) => o.value === filterKey)?.count ?? 0,
    }),
  );
  const selectedCityLabel = selectedCity
    ? translateSupportCity(selectedCity, locale)
    : null;

  return (
    <aside className="font-brando w-full max-w-full rounded-2xl bg-surface p-4 text-foreground sm:p-5 lg:max-w-[320px]">
      <div className="mb-6 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-2">
        <h2
          className="min-w-0 flex-1 text-start text-[clamp(18px,4vw,24px)] font-bold leading-6 tracking-[-0.31px] text-foreground"
        >
          {t("filterServices")}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-border bg-surface px-2 text-center text-[clamp(14px,3.5vw,18px)] font-bold leading-5 tracking-[-0.15px] text-foreground transition-colors hover:bg-muted sm:min-w-[156px] sm:px-3"
        >
          {tCommon("resetFilters")}
        </button>
      </div>

      <section className="mb-6">
        <Menu as="div" className="relative">
          <Menu.Button
            className={`flex w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-foreground transition-all duration-200 hover:border-muted-foreground sm:px-4 sm:py-3 sm:text-sm flex-row`}
          >
            <LocationIcon />
            <span className="flex-1 text-start">
              {selectedCityLabel ?? t("chooseDestination")}
            </span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
                fill="currentColor"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95 translate-y-1"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-1"
          >
            <Menu.Items
              className={`absolute z-50 mt-2 w-full rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none start-0 origin-top-start`}
            >
              <div className="py-1">
                {cityOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onCityChange(
                            selectedCity === option.value ? null : option.value,
                          )
                        }
                        className={`${
                          active ? "bg-primary/10 text-primary" : ""
                        } ${
                          selectedCity === option.value
                            ? "bg-primary/5 font-semibold text-primary"
                            : "text-foreground"
                        } block w-full text-start px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                      >
                        {translateSupportCity(option.value, locale)}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </section>
      <div className="my-5 h-px w-full bg-border" />
      <section>
        <div className="mb-4 flex items-center justify-start gap-2">
          <h3
            className="text-start text-[20px] font-bold leading-[119%] text-foreground"
          >
            {t("chooseServiceType")}
          </h3>

          <ServiceTypeIcon />
        </div>

        <div className="space-y-2">
          {serviceTypeOptions.map((option) => (
            <CheckboxRow
              key={option.value}
              option={option}
              label={translateSupportLabel(option.value, locale)}
              checked={selectedTypes.includes(option.value)}
              onToggle={onToggleType}
            />
          ))}
        </div>
      </section>

      <div className="my-5 h-px w-full bg-border" />

      <section>
        <h3 className="mb-3 text-start text-[15px] font-bold text-foreground">
          <span>{t("internationalCallCenter")} </span>
        </h3>
        <a
          href="tel:+966920000890"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-3 text-[18px] font-semibold text-primary transition hover:bg-primary/15"
          dir="ltr"
        >
          <PhoneIcon />
          <div className="text-sm">+966920000890</div>
        </a>
      </section>
    </aside>
  );
};

export default ServicesSupportFilterSidebar;
