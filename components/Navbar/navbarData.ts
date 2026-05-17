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
  { href: "/destinations", labelKey: "common.destinations" },
  { href: "/attractions", labelKey: "common.attractions" },
  { href: "/about-aseer", labelKey: "aboutAseer.title" },
  { href: "/aseer-cuisine", labelKey: "aseerCuisine.title" },
  { href: "/aseer-community", labelKey: "aseerCommunity.title" },
  { href: "/restaurants", labelKey: "common.restaurants" },
  { href: "/experiences", labelKey: "common.experiences" },
  { href: "/film", labelKey: "nav.film" },
  { href: "/tour-guides", labelKey: "tourGuides.title" },
  { href: "/tour-guides/register", labelKey: "tourGuidesRegister.title" },
  { href: "/accommodation", labelKey: "common.accommodation" },
  { href: "/getting-here-and-around", labelKey: "gettingHere.banner.title" },
  { href: "/services-support", labelKey: "servicesSupport.title" },
  { href: "/travel-tips", labelKey: "travelTips.title" },
  { href: "/igcat", labelKey: "nav.igcat" },
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
