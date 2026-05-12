"use client";

/**
 * Left-side circular actions next to the logo.
 *
 * TODO
 * ----
 * - Globe + moon: still `href="#"` placeholders from navbarData — replace with real handlers
 *   (locale + theme). See comment block in `navbarData.ts`.
 * - Booklet: replace hardcoded `/assets/booklet/booklet.pdf` if CMS or CDN URL differs;
 *   consider env e.g. NEXT_PUBLIC_BOOKLET_PDF_URL.
 */
import { Link } from "@/i18n/navigation";
import { iconButtons } from "./navbarData";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";

const DesktopActionLinks = () => {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleTheme } = useTheme();

  const handleBookletDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/booklet/booklet.pdf";
    link.download = "booklet.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLocaleSwitch = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const normalizedPathname = pathname.replace(/^\/(ar|en)(?=\/|$)/, "") || "/";
    router.replace(normalizedPathname, { locale: nextLocale });
    router.refresh();
  };

  return (
    <div className="hidden lg:flex flex-row items-center space-x-6">
      {iconButtons.map((item, index) => {
        const Icon = item.icon;
        if ("isBooklet" in item && item.isBooklet) {
          return (
            <button
              key={index}
              type="button"
              onClick={handleBookletDownload}
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
            onClick={isLocaleButton
              ? (e) => {
                e.preventDefault();
                handleLocaleSwitch();
              }
              : isThemeButton
                ? (e) => {
                  e.preventDefault();
                  toggleTheme();
                }
                : undefined}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
            aria-label={isLocaleButton ? t("nav.languageSwitchLabel") : isThemeButton ? "Toggle theme" : undefined}
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopActionLinks;
