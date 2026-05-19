"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavbarDropdownLink } from "./navbarData";

interface DiscoverAseerDropdownProps {
  label: string;
  links: NavbarDropdownLink[];
}

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiscoverAseerDropdown = ({
  label,
  links,
}: DiscoverAseerDropdownProps) => {
  const t = useTranslations();

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={({ hover, active, open }) =>
          [
            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-white text-base font-medium whitespace-nowrap transition-colors cursor-pointer",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            hover || active || open ? "bg-white/15 text-white" : "",
          ].join(" ")
        }
      >
        {({ open }) => (
          <>
            <ChevronIcon
              className={`shrink-0 opacity-90 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
            <span>{label}</span>
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-2xl border border-white/20 bg-linear-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95 shadow-xl backdrop-blur-xl z-50">
          <div className="hide-scrollbar max-h-[70vh] overflow-y-auto overscroll-contain py-2 scroll-smooth">
            {links.map((item) => (
              <Menu.Item key={item.href}>
                {({ focus }) => (
                  <Link
                    href={item.href}
                    className={`${
                      focus ? "bg-white/10 text-white" : "text-white/90"
                    } block px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-white`}
                  >
                    {t(item.labelKey)}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DiscoverAseerDropdown;
