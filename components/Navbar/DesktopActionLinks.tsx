"use client";

/**
 * Left-side circular actions next to the logo.
 *
 * TODO
 * ----
 * - Globe: locale switcher wired; moon toggles light/dark via `toggleTheme`.
 * - Booklet: opens `/api/booklet` in a new tab (inline PDF viewer).
 */
import { Link } from "@/i18n/navigation";
import { LocationPinIcon } from "./Icons";
import { iconButtons } from "./navbarData";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { toggleTheme } from "@/lib/theme/client";

const DesktopActionLinks = () => {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleBookletOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/api/booklet", "_blank", "noopener,noreferrer");
  };

  const handleLocaleSwitch = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);
    window.location.href = newPath + window.location.search;
  };

  return (
    <div className="hidden lg:flex flex-row items-center gap-6">
      <Link
        href="/interactive-map"
        className="inline-flex items-center gap-2 text-base font-medium text-white transition-opacity hover:opacity-80"
      >
        <LocationPinIcon />
        <span className="whitespace-nowrap">{t("interactiveMap.title")}</span>
      </Link>

      {iconButtons.map((item, index) => {
        const Icon = item.icon;
        if ("isBooklet" in item && item.isBooklet) {
          return (
            <button
              key={index}
              type="button"
              onClick={handleBookletOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
              aria-label="تحميل الدليل"
            >
              <Icon />
            </button>
          );
        }
        const isLocaleButton = index === 0;
        const isThemeButton = index === 1;
        return (
          <Link
            key={index}
            href={item.href}
            onClick={
              isLocaleButton
                ? (e) => {
                    e.preventDefault();
                    handleLocaleSwitch();
                  }
                : isThemeButton
                  ? (e) => {
                      e.preventDefault();
                      toggleTheme();
                    }
                  : undefined
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
            aria-label={
              isLocaleButton
                ? t("nav.languageSwitchLabel")
                : isThemeButton
                  ? t("nav.themeSwitchLabel")
                  : undefined
            }
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopActionLinks;
