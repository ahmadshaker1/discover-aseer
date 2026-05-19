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
  { href: "/about-aseer", labelKey: "navLinks.aboutAseer" },
  { href: "/destinations", labelKey: "navLinks.destinations" },
  { href: "/attractions", labelKey: "navLinks.attractions" },
  { href: "/experiences", labelKey: "navLinks.experiences" },
  { href: "/aseer-cuisine", labelKey: "navLinks.cuisine" },
  { href: "/aseer-community", labelKey: "navLinks.community" },
  { href: "/film", labelKey: "navLinks.film" },
];

/** LTR: left → right in the nav bar */
export const navigationLinks = [
  { href: "#", labelKey: "common.discoverAseer", isDropdown: true },
  { href: "/planner", labelKey: "nav.planTrip" },
  { href: "/event-seasons", labelKey: "nav.events" },
];

export const iconButtons = [
  { icon: GlobeIcon, href: "#" },
  { icon: CrescentMoonIcon, href: "#" },
  { icon: BookletIcon, href: "#", isBooklet: true },
];
