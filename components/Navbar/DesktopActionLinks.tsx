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

const DesktopActionLinks = () => {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

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
              className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="تحميل الدليل"
            >
              <Icon />
            </button>
          );
        }
        return (
          <Link
            key={index}
            href={item.href}
            onClick={index === 0 ? (e) => {
              e.preventDefault();
              handleLocaleSwitch();
            } : undefined}
            className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label={index === 0 ? t("nav.languageSwitchLabel") : undefined}
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopActionLinks;
