/**
 * Navbar content configuration (LTR layout: logo + icon tools on the left, text links on the right).
 *
 * TODO / product follow-ups
 * -------------------------
 * - discoverAseerLinks: Confirm final routes and add any missing sections from Figma/CMS.
 * - navigationLinks: "اكتشف عسير" uses href "#" only as a Menu trigger; no navigation.
 * - Top-level hrefs must match real app routes when new pages ship.
 *
 * Icon row (see also DesktopActionLinks.tsx)
 * -------------------------------------------
 * - Globe: wire to language/locale switcher when i18n strategy exists (e.g. next-intl, cookie, /en route).
 * - Crescent moon: wire to theme toggle when dark mode tokens and persistence are defined.
 * - Booklet: currently downloads a static PDF path; confirm asset URL and analytics if required.
 */
import { GlobeIcon, CrescentMoonIcon, BookletIcon } from "./Icons";

export const discoverAseerLinks = [
  { href: "/restaurants", label: "المطاعم" },
  { href: "/experiences", label: "التجارب" },
  { href: "/tour-guides", label: "المرشدين السياحيين" },
  { href: "/accommodation", label: "الإقامة" },
  { href: "/services-support", label: "الخدمات المساندة" },
  { href: "/interactive-map", label: "الخريطة التفاعلية" },
];

/** LTR: left → right in the nav bar */
export const navigationLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "#", label: "اكتشف عسير", isDropdown: true },
  { href: "/planner", label: "خطط رحلتك" },
  { href: "/events", label: "الفعاليات" },
];

export const iconButtons = [
  { icon: GlobeIcon, href: "#" },
  { icon: CrescentMoonIcon, href: "#" },
  { icon: BookletIcon, href: "#", isBooklet: true },
];
