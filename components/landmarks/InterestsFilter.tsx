"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HeartIcon, ChevronDownIcon } from "./Icons";
import { interestOptions } from "./filterOptions";

interface FilterOption {
  id: string;
  label: string;
}

interface InterestsFilterProps {
  selectedInterests: string[];
  onToggle: (interestId: string) => void;
  onClear: () => void;
  label?: string;
  options?: FilterOption[];
  icon?: React.ReactNode;
}

const InterestsFilter = ({
  selectedInterests,
  onToggle,
  onClear,
  label = "الاهتمامات",
  options = interestOptions,
  icon = <HeartIcon />,
}: InterestsFilterProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        type="button"
        className="flex cursor-pointer flex-row-reverse items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 sm:px-6 sm:py-2 sm:text-sm"
      >
        <ChevronDownIcon />
        <span>
          {selectedInterests.length > 0
            ? `${label} (${selectedInterests.length})`
            : label}
        </span>
        {icon}
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
        <Menu.Items className="absolute right-0 z-50 mt-2 max-h-80 w-64 origin-top-right overflow-y-auto rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = selectedInterests.includes(option.id);
              return (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => onToggle(option.id)}
                      className={`${
                        active ? "bg-primary/10 text-primary" : ""
                      } ${
                        isSelected
                          ? "bg-primary/5 font-semibold text-primary"
                          : "text-foreground"
                      } flex items-center justify-between w-full text-right px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="font-bold text-primary">✓</span>
                      )}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
            {selectedInterests.length > 0 && (
              <Menu.Item>
                <button
                  type="button"
                  onClick={onClear}
                  className="mt-1 block w-full cursor-pointer border-t border-border px-4 py-2 text-right text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                >
                  إزالة التصفية
                </button>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default InterestsFilter;
