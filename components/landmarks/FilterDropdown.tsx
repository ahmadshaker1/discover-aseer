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
      <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:border-[#6027D2] hover:bg-[#6027D2]/5 transition-all duration-200 cursor-pointer">
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
          className={`absolute right-0 mt-2 ${width} origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200`}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    onClick={() => onSelect(option.id)}
                    className={`${
                      active ? "bg-[#6027D2]/10 text-[#6027D2]" : ""
                    } ${
                      selectedValue === option.id
                        ? "bg-[#6027D2]/5 text-[#6027D2] font-semibold"
                        : "text-black"
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
                  onClick={onClear}
                  className="block w-full text-right px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-t border-gray-200 mt-1 cursor-pointer transition-colors duration-150"
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
