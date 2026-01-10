"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HeartIcon, ChevronDownIcon } from "./Icons";
import { interestOptions } from "./filterOptions";

interface InterestsFilterProps {
  selectedInterests: string[];
  onToggle: (interestId: string) => void;
  onClear: () => void;
}

const InterestsFilter = ({
  selectedInterests,
  onToggle,
  onClear,
}: InterestsFilterProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex flex-row-reverse items-center gap-2 rounded-full bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 hover:border-[#6027D2] hover:bg-[#6027D2]/5 transition-all duration-200 cursor-pointer">
        <ChevronDownIcon />
        <span>
          {selectedInterests.length > 0
            ? `الاهتمامات (${selectedInterests.length})`
            : "الاهتمامات"}
        </span>
        <HeartIcon />
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
        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200 max-h-80 overflow-y-auto">
          <div className="py-1">
            {interestOptions.map((option) => {
              const isSelected = selectedInterests.includes(option.id);
              return (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      onClick={() => onToggle(option.id)}
                      className={`${
                        active ? "bg-[#6027D2]/10 text-[#6027D2]" : ""
                      } ${
                        isSelected
                          ? "bg-[#6027D2]/5 text-[#6027D2] font-semibold"
                          : "text-black"
                      } flex items-center justify-between w-full text-right px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="text-[#6027D2] font-bold">✓</span>
                      )}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
            {selectedInterests.length > 0 && (
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

export default InterestsFilter;
