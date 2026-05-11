"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { ChevronDownIcon } from "./Icons";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  icon: ReactNode;
  label: string;
  selectedValue: string | null;
  options: FilterOption[];
  onSelect: (value: string) => void;
  onClear: () => void;
  width?: string;
}

const FilterDropdown = ({
  icon,
  label,
  selectedValue,
  options,
  onSelect,
  onClear,
  width = "w-56",
}: FilterDropdownProps) => {
  const selectedOption = options.find((opt) => opt.id === selectedValue);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        type="button"
        className="flex cursor-pointer flex-row-reverse items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 sm:px-6 sm:py-2 sm:text-sm"
      >
        <ChevronDownIcon />
        <span>{selectedOption?.label || label}</span>
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
        <Menu.Items
          className={`absolute right-0 z-50 mt-2 ${width} origin-top-right rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none`}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => onSelect(option.id)}
                    className={`${
                      active ? "bg-primary/10 text-primary" : ""
                    } ${
                      selectedValue === option.id
                        ? "bg-primary/5 font-semibold text-primary"
                        : "text-foreground"
                    } block w-full text-right px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
            {selectedValue && (
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

export default FilterDropdown;
