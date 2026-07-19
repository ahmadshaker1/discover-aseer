"use client";

import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { HamburgerIcon, LocationPinIcon } from "./Icons";
import {
  getNavbarDropdownLinks,
  navigationLinks,
  iconButtons,
} from "./navbarData";
import { toggleTheme } from "@/lib/theme/client";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCALE_OPTIONS = [
  { code: "ar", labelKey: "nav.localeArabic" as const },
  { code: "en", labelKey: "nav.localeEnglish" as const },
  { code: "zh", labelKey: "nav.localeChinese" as const, comingSoon: true },
] as const;

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === "zh" || nextLocale === locale) {
      setLangOpen(false);
      return;
    }
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);
    window.location.href = newPath + window.location.search;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="lg:hidden relative z-50" onClose={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <Dialog.Panel className="w-full h-full min-h-screen bg-linear-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95 backdrop-blur-xl">
              <div className="flex flex-col h-full min-h-screen">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                  <Image
                    src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                    alt=""
                    width={120}
                    height={55}
                  />
                  <button
                    type="button"
                    className="p-2 rounded-lg transition-colors"
                    onClick={onClose}
                    aria-label={t("nav.closeMenu")}
                  >
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col py-6 sm:py-8 px-4 sm:px-6 space-y-4 sm:space-y-6 overflow-y-auto">
                  {navigationLinks.map((link) => {
                    if (link.isDropdown) {
                      return (
                        <Disclosure key={link.labelKey} as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="w-full flex items-center justify-between text-white text-lg sm:text-xl font-medium py-3 border-b border-white/10 hover:opacity-80 transition-opacity">
                                <span>{t(link.labelKey)}</span>
                                <svg
                                  className={`w-5 h-5 transition-transform duration-200 ${
                                    open ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 max-h-0"
                                enterTo="opacity-100 max-h-96"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 max-h-96"
                                leaveTo="opacity-0 max-h-0"
                              >
                                <Disclosure.Panel className="pl-4 space-y-2 overflow-hidden rtl:pl-0 rtl:pr-4">
                                  {getNavbarDropdownLinks(link.labelKey).map(
                                    (item) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className="block text-white/80 text-base sm:text-lg font-medium hover:opacity-80 transition-opacity py-2"
                                      >
                                        {t(item.labelKey)}
                                      </Link>
                                    ),
                                  )}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      );
                    }

                    if ("isMap" in link && link.isMap) {
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-2 text-white text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity py-3 border-b border-white/10"
                        >
                          <LocationPinIcon />
                          <span>{t(link.labelKey)}</span>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="text-white text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity py-3 border-b border-white/10"
                      >
                        {t(link.labelKey)}
                      </Link>
                    );
                  })}

                  <div className="flex flex-wrap items-center justify-start gap-4 pt-6 border-t border-white/10">
                    {iconButtons.map((item, index) => {
                      const Icon = item.icon;

                      if (item.action === "locale") {
                        return (
                          <div key={index} className="relative">
                            <button
                              type="button"
                              onClick={() => setLangOpen((open) => !open)}
                              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                              aria-label={t("nav.languageSwitchLabel")}
                              aria-expanded={langOpen}
                            >
                              <Icon />
                            </button>
                            {langOpen ? (
                              <ul className="absolute start-0 top-full z-10 mt-2 min-w-[10.5rem] overflow-hidden rounded-2xl border border-white/20 bg-[#191919]/95 py-1 shadow-xl backdrop-blur-xl">
                                {LOCALE_OPTIONS.map((option) => {
                                  const selected = option.code === locale;
                                  const disabled =
                                    "comingSoon" in option && option.comingSoon;
                                  return (
                                    <li key={option.code}>
                                      <button
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => switchLocale(option.code)}
                                        className={[
                                          "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm font-medium",
                                          disabled
                                            ? "cursor-not-allowed text-white/35"
                                            : selected
                                              ? "bg-white/15 text-white"
                                              : "text-white/85 hover:bg-white/10",
                                        ].join(" ")}
                                      >
                                        <span>{t(option.labelKey)}</span>
                                        {disabled ? (
                                          <span className="text-[10px] uppercase">
                                            {t("nav.localeComingSoon")}
                                          </span>
                                        ) : null}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </div>
                        );
                      }

                      if (item.action === "booklet") {
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(
                                "/booklet",
                                "_blank",
                                "noopener,noreferrer",
                              );
                              onClose();
                            }}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                            aria-label={t("nav.downloadGuide")}
                          >
                            <Icon />
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleTheme();
                            onClose();
                          }}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                          aria-label={t("nav.themeSwitchLabel")}
                        >
                          <Icon />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileMenu;
