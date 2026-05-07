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
  { href: "/destinations", labelAr: "الوجهات", labelEn: "Destinations" },
  { href: "/destinations/browse", labelAr: "تصفح الوجهات", labelEn: "Browse destinations" },
  { href: "/attractions", labelAr: "المعالم السياحية", labelEn: "Attractions" },
  { href: "/attractions/inner", labelAr: "المعالم السياحية الداخلية", labelEn: "Indoor attractions" },
  { href: "/about-aseer", labelAr: "عن عسير", labelEn: "About Aseer" },
  { href: "/aseer-cuisine", labelAr: "المطبخ العسيري", labelEn: "Aseer cuisine" },
  { href: "/aseer-community", labelAr: "مجتمع عسير", labelEn: "Aseer community" },
  { href: "/restaurants", labelAr: "المطاعم", labelEn: "Restaurants" },
  { href: "/experiences", labelAr: "التجارب", labelEn: "Experiences" },
  { href: "/film", labelAr: "الأفلام", labelEn: "Film" },
  { href: "/tour-guides", labelAr: "المرشدين السياحيين", labelEn: "Tour guides" },
  { href: "/tour-guides/register", labelAr: "تسجيل المرشدين السياحيين", labelEn: "Tour guide registration" },
  { href: "/accommodation", labelAr: "الإقامة", labelEn: "Accommodation" },
  { href: "/Getting-here-and-around", labelAr: "الوصول و التنقل", labelEn: "Getting here and around" },
  { href: "/services-support", labelAr: "الخدمات المساندة", labelEn: "Support services" },
  { href: "/travel-tips", labelAr: "معلومات أساسية", labelEn: "Travel tips" },
  { href: "/event-seasons", labelAr: "المواسم والفعاليات", labelEn: "Seasons and events" },
  { href: "/interactive-map", labelAr: "الخريطة التفاعلية", labelEn: "Interactive map" },
];

/** LTR: left → right in the nav bar */
export const navigationLinks = [
  { href: "/", labelKey: "common.home" },
  { href: "#", labelKey: "common.discoverAseer", isDropdown: true },
  { href: "/planner", labelKey: "nav.planTrip" },
  { href: "/events", labelKey: "nav.events" },
];

export const iconButtons = [
  { icon: GlobeIcon, href: "#" },
  { icon: CrescentMoonIcon, href: "#" },
  { icon: BookletIcon, href: "#", isBooklet: true },
];
