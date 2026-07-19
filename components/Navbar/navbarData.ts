/**
 * Navbar content configuration.
 *
 * Layout (via `dir` on `<html>`):
 * - Start side: logo + text links (Discover, Plan trip, Seasons & Events, Interactive map)
 * - End side: language, booklets, theme
 */
import { GlobeIcon, CrescentMoonIcon, BookletIcon } from "./Icons";

export type NavbarDropdownLink = {
  href: string;
  labelKey: string;
  /** Side image shown while this link is hovered in the mega menu */
  image: string;
};

export type NavbarMegaMenu = {
  labelKey: string;
  links: NavbarDropdownLink[];
  /** Fallback image before any link is hovered */
  defaultImage: string;
};

/** PDF order: Film → Community → Cuisine → Experiences → Attractions → Destinations → About */
export const discoverAseerLinks: NavbarDropdownLink[] = [
  {
    href: "/film",
    labelKey: "navLinks.film",
    image: "/assets/film/film-hero.png",
  },
  {
    href: "/aseer-community",
    labelKey: "navLinks.community",
    image: "/assets/community/hero.webp",
  },
  {
    href: "/aseer-cuisine",
    labelKey: "navLinks.cuisine",
    image: "/assets/landing/hero-slide-cuisine.png",
  },
  {
    href: "/experiences",
    labelKey: "navLinks.experiences",
    image: "/assets/experiences/experiences.png",
  },
  {
    href: "/attractions",
    labelKey: "navLinks.attractions",
    image: "/assets/attractions/attractions-hero.png",
  },
  {
    href: "/destinations",
    labelKey: "navLinks.destinations",
    image: "/assets/destinations/hero-destinations.jpg",
  },
  {
    href: "/about-aseer",
    labelKey: "navLinks.aboutAseer",
    image: "/assets/aboutAseer/about_banner.webp",
  },
];

/**
 * PDF order: Supporting services → Getting here → Tour guides → DMCs →
 * Restaurants & cafes → Accommodations → AI trip planner
 */
export const planTripLinks: NavbarDropdownLink[] = [
  {
    href: "/services-support",
    labelKey: "navPlanTripLinks.sopportingServices",
    image:
      "/assets/services-support/f125fee16e0267a3d14ee285efd5f272ad21108c.png",
  },
  {
    href: "/getting-here-and-around",
    labelKey: "navPlanTripLinks.gettingAround",
    image: "/assets/Getting-here-and-around/hero.JPG",
  },
  {
    href: "/tour-guides",
    labelKey: "navPlanTripLinks.tourGuides",
    image: "/assets/tourist-guides/tourist-guide-banner.webp",
  },
  {
    href: "/tourism-companies",
    labelKey: "navPlanTripLinks.tourismCompanies",
    image: "/assets/tourism-companies/MAN_0983.JPG",
  },
  {
    href: "/restaurants",
    labelKey: "navPlanTripLinks.restaurants",
    image: "/assets/restaurant/restaurant-banner.webp",
  },
  {
    href: "/accommodation",
    labelKey: "navPlanTripLinks.accommodation",
    image: "/assets/accommodation/accomodation-banner.webp",
  },
  {
    href: "/planner",
    labelKey: "navPlanTripLinks.aiPlanner",
    image: "/assets/landing/discover-aseer-hero.jpg",
  },
];

export const megaMenus: Record<string, NavbarMegaMenu> = {
  "common.discoverAseer": {
    labelKey: "common.discoverAseer",
    links: discoverAseerLinks,
    defaultImage: discoverAseerLinks[0]?.image ?? "/assets/attractions/hero.jpg",
  },
  "nav.planTrip": {
    labelKey: "nav.planTrip",
    links: planTripLinks,
    defaultImage:
      planTripLinks[0]?.image ?? "/assets/Getting-here-and-around/hero.JPG",
  },
};

export const getNavbarDropdownLinks = (labelKey: string) => {
  return megaMenus[labelKey]?.links ?? ([] as NavbarDropdownLink[]);
};

export const getNavbarMegaMenu = (labelKey: string) => {
  return megaMenus[labelKey] ?? null;
};

/** Start → end within the text-link group (logo sits before these). */
export const navigationLinks = [
  { href: "#", labelKey: "common.discoverAseer", isDropdown: true },
  { href: "#", labelKey: "nav.planTrip", isDropdown: true },
  { href: "/event-seasons", labelKey: "nav.events", isDropdown: false },
  {
    href: "/interactive-map",
    labelKey: "interactiveMap.title",
    isDropdown: false,
    isMap: true,
  },
];

/** PDF order: language → booklets → dark mode */
export const iconButtons = [
  { icon: GlobeIcon, href: "#", action: "locale" as const },
  { icon: BookletIcon, href: "#", action: "booklet" as const },
  { icon: CrescentMoonIcon, href: "#", action: "theme" as const },
];
