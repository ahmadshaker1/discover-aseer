"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { CalendarIcon, ChevronDownIcon } from "./icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface SeasonYearFilterProps {
  years: readonly number[];
  selectedYear: number | null;
  onSelect: (year: number) => void;
  onClear: () => void;
}

export default function SeasonYearFilter({
  years,
  selectedYear,
  onSelect,
  onClear,
}: SeasonYearFilterProps) {
  const t = useTranslations("eventSeasons");

  const displayLabel = selectedYear
    ? t("yearFilterSelected", { year: selectedYear })
    : t("yearFilterPlaceholder");

  return (
    <Menu as="div" className="relative w-full max-w-[532px]">
      <Menu.Button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-6 rounded-xl border border-border bg-surface px-4 text-foreground transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        style={{ fontFamily: ara }}
      >
        <span className="text-start text-[20px] font-bold leading-[119%]">
          {displayLabel}
        </span>
        <span className="flex shrink-0 items-center gap-6">

          <CalendarIcon className="text-foreground" />
        </span>
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
        <Menu.Items className="absolute end-0 z-50 mt-2 w-full origin-top-end rounded-xl border border-border bg-surface py-1 shadow-xl ring-1 ring-border focus:outline-none">
          {years.map((year) => (
            <Menu.Item key={year}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onSelect(year)}
                  className={`block w-full cursor-pointer px-4 py-2.5 text-end text-[18px] font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground"
                    } ${selectedYear === year ? "bg-primary/5 font-bold text-primary" : ""}`}
                  style={{ fontFamily: ibm }}
                >
                  {year}
                </button>
              )}
            </Menu.Item>
          ))}
          {selectedYear !== null ? (
            <Menu.Item>
              <button
                type="button"
                onClick={onClear}
                className="mt-1 block w-full cursor-pointer border-t border-border px-4 py-2.5 text-end text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                style={{ fontFamily: ibm }}
              >
                {t("yearFilterClear")}
              </button>
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
