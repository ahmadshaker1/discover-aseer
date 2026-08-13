/**
 * Navbar content configuration.
 *
 * Layout (via `dir` on `<html>`):
 * - Start side: logo + text links (Discover, Plan trip, Seasons & Events, Interactive map)
 * - End side: language, booklets, theme
 */
import { GlobeIcon, CrescentMoonIcon, BookletIcon } from "./Icons";

export type NavbarBadge = "pdf" | "new" | "beta";

export type NavbarDropdownLink = {
  href: string;
  labelKey: string;
  /** Side / featured image for this link */
  image: string;
  /** Localized subtitle for featured cards */
  subKey: string;
  /** Optional badge shown next to the label */
  badge?: NavbarBadge;
  /** Open in a new tab (e.g. PDF booklet) */
  external?: boolean;
};

export type NavbarMegaMenu = {
  labelKey: string;
  links: NavbarDropdownLink[];
  /** Indices into `links` used as the two featured cards (preview order). */
  featuredIndices: [number, number];
};

/** Preview order: About → Experiences → Attractions → Destinations → Cuisine → Community → Film → Outdoor PDF */
export const discoverAseerLinks: NavbarDropdownLink[] = [
  {
    href: "/about-aseer",
    labelKey: "navLinks.aboutAseer",
    image: "/assets/aboutAseer/about_banner.webp",
    subKey: "navMega.discover.aboutAseer",
  },
  {
    href: "/experiences",
    labelKey: "navLinks.experiences",
    image: "/assets/navbar/experiences.png",
    subKey: "navMega.discover.experiences",
  },
  {
    href: "/attractions",
    labelKey: "navLinks.attractions",
    image: "/assets/attractions/attractions-hero.png",
    subKey: "navMega.discover.attractions",
  },
  {
    href: "/destinations",
    labelKey: "navLinks.destinations",
    image: "/assets/destinations/hero-destinations.jpg",
    subKey: "navMega.discover.destinations",
  },
  {
    href: "/aseer-cuisine",
    labelKey: "navLinks.cuisine",
    image: "/assets/navbar/cuisine.png",
    subKey: "navMega.discover.cuisine",
  },
  {
    href: "/aseer-community",
    labelKey: "navLinks.community",
    image: "/assets/community/hero.webp",
    subKey: "navMega.discover.community",
  },
  {
    href: "/film",
    labelKey: "navLinks.film",
    image: "/assets/film/film-hero.png",
    subKey: "navMega.discover.film",
  },
  {
    href: "/booklet",
    labelKey: "navLinks.outdoorGuide",
    image: "/assets/landing/welcome-experiences-hiking.jpg",
    subKey: "navMega.discover.outdoorGuide",
    badge: "pdf",
    external: true,
  },
];

/**
 * Preview order: Planner → Getting here → Accommodation → Restaurants →
 * Agencies → Tour guides → Support services
 *
 * Getting here reuses the former Accommodation featured image.
 */
export const planTripLinks: NavbarDropdownLink[] = [
  {
    href: "/new-planner",
    labelKey: "navPlanTripLinks.aiPlanner",
    image: "/assets/navbar/planner.png",
    subKey: "navMega.plan.aiPlanner",
    badge: "beta",
  },
  {
    href: "/getting-here-and-around",
    labelKey: "navPlanTripLinks.gettingAround",
    image: "/assets/navbar/accommodation.png",
    subKey: "navMega.plan.gettingAround",
  },
  {
    href: "/accommodation",
    labelKey: "navPlanTripLinks.accommodation",
    image: "/assets/landing/accommodation-card.png",
    subKey: "navMega.plan.accommodation",
  },
  {
    href: "/restaurants",
    labelKey: "navPlanTripLinks.restaurants",
    image: "/assets/restaurant/restaurant-banner.webp",
    subKey: "navMega.plan.restaurants",
  },
  {
    href: "/tourism-companies",
    labelKey: "navPlanTripLinks.tourismCompanies",
    image: "/assets/tourism-companies/MAN_0983.JPG",
    subKey: "navMega.plan.tourismCompanies",
  },
  {
    href: "/tour-guides",
    labelKey: "navPlanTripLinks.tourGuides",
    image: "/assets/tourist-guides/tourist-guide-banner.webp",
    subKey: "navMega.plan.tourGuides",
  },
  {
    href: "/services-support",
    labelKey: "navPlanTripLinks.sopportingServices",
    image:
      "/assets/services-support/f125fee16e0267a3d14ee285efd5f272ad21108c.png",
    subKey: "navMega.plan.sopportingServices",
  },
];

export const megaMenus: Record<string, NavbarMegaMenu> = {
  "common.discoverAseer": {
    labelKey: "common.discoverAseer",
    links: discoverAseerLinks,
    /** Cuisine + Experiences — matches Immersive Preview indices [4, 1]. */
    featuredIndices: [4, 1],
  },
  "nav.planTrip": {
    labelKey: "nav.planTrip",
    links: planTripLinks,
    /** Planner + Getting here — matches Immersive Preview indices [0, 1]. */
    featuredIndices: [0, 1],
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
