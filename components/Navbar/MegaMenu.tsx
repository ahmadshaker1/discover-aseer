"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavbarDropdownLink } from "./navbarData";

interface MegaMenuTriggerProps {
  label: string;
  menuKey: string;
  openMenuKey: string | null;
  onOpenChange: (key: string | null) => void;
  panelId: string;
}

interface MegaMenuPanelProps {
  label: string;
  links: NavbarDropdownLink[];
  defaultImage: string;
  panelId: string;
  isOpen: boolean;
  onNavigate: () => void;
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

/** Trigger button for an editorial mega menu section. */
export function MegaMenuTrigger({
  label,
  menuKey,
  openMenuKey,
  onOpenChange,
  panelId,
}: MegaMenuTriggerProps) {
  const isOpen = openMenuKey === menuKey;

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenChange(menuKey);
    }
  };

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-haspopup="true"
      onClick={() => onOpenChange(isOpen ? null : menuKey)}
      onMouseEnter={() => onOpenChange(menuKey)}
      onFocus={() => onOpenChange(menuKey)}
      onKeyDown={onTriggerKeyDown}
      className={[
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-base font-medium whitespace-nowrap text-white transition-colors cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isOpen ? "bg-white/15" : "hover:bg-white/10",
      ].join(" ")}
    >
      <span>{label}</span>
      <ChevronIcon
        className={`shrink-0 opacity-90 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

/**
 * Full-width editorial mega menu panel (Neimil-inspired).
 * Image sits on the start side: left in English (LTR), right in Arabic (RTL).
 * Side image updates when a nav link is hovered.
 */
export function MegaMenuPanel({
  label,
  links,
  defaultImage,
  panelId,
  isOpen,
  onNavigate,
}: MegaMenuPanelProps) {
  const t = useTranslations();
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) setActiveHref(null);
  }, [isOpen]);

  const activeLink =
    links.find((link) => link.href === activeHref) ?? links[0] ?? null;
  const activeImage = activeLink?.image ?? defaultImage;
  const activeAlt = activeLink ? t(activeLink.labelKey) : label;

  return (
    <div
      id={panelId}
      role="region"
      aria-label={label}
      aria-hidden={!isOpen}
      className={[
        "absolute inset-x-0 top-full z-40 border-t border-white/10",
        "bg-linear-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95",
        "shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        "transition-[opacity,transform] duration-300 ease-out",
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0",
      ].join(" ")}
    >
      <div className="mx-auto flex min-h-[320px] max-h-[min(70vh,560px)] w-full max-w-screen-2xl flex-row overflow-hidden">
        {/* First in DOM → left in English (LTR), right in Arabic (RTL) */}
        <div className="hidden w-[38%] min-w-[280px] max-w-[460px] shrink-0 self-stretch items-center justify-center p-6 md:flex lg:p-8">
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            {links.map((link) => {
              const visible = link.image === activeImage;
              return (
                <Image
                  key={link.href}
                  src={link.image}
                  alt={visible ? activeAlt : ""}
                  fill
                  sizes="420px"
                  className={[
                    "object-cover transition-opacity duration-300",
                    visible ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-hidden={!visible}
                  priority={false}
                />
              );
            })}
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14 xl:px-16">
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-white/45 uppercase md:mb-8">
            {label}
          </p>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
            {links.map((item, index) => {
              const isActive = (activeHref ?? links[0]?.href) === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setActiveHref(item.href)}
                    onFocus={() => setActiveHref(item.href)}
                    tabIndex={isOpen ? 0 : -1}
                    className={[
                      "group flex items-baseline gap-4 border-b py-4 text-white transition-colors",
                      isActive
                        ? "border-white/40"
                        : "border-white/10 hover:border-white/35",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-sm font-medium tabular-nums transition-colors",
                        isActive
                          ? "text-white/70"
                          : "text-white/35 group-hover:text-white/60",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:text-2xl">
                      {t(item.labelKey)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
