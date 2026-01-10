"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { discoverAseerLinks } from "./navbarData";

interface DiscoverAseerDropdownProps {
  label: string;
}

const DiscoverAseerDropdown = ({ label }: DiscoverAseerDropdownProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap focus:outline-none focus:ring-0 cursor-pointer">
        {label}
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-gradient-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden z-50">
          <div className="py-2">
            {discoverAseerLinks.map((item) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/90"
                    } block px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-white`}
                  >
                    {item.label}
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
