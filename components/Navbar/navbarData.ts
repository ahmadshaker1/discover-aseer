import {
  GlobeIcon,
  CrescentMoonIcon,
  LocationPinIcon,
} from "./Icons";

export const discoverAseerLinks = [
  { href: "/restaurants", label: "المطاعم" },
  { href: "/experiences", label: "التجارب" },
  { href: "/events", label: "الفعاليات" },
  { href: "/tour-guides", label: "المرشدين السياحيين" },
  { href: "/planner", label: "خطط لرحلتك" },
];

export const navigationLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "#", label: "اكتشف عسير", isDropdown: true },
  { href: "/events", label: "المواسم والفعاليات" },
];

export const actionLinks = [
  {
    href: "#",
    label: "دليل الانشطة الخارجية",
    variant: "button" as const,
    isBooklet: true,
  },
  {
    href: "/interactive-map",
    label: "الخريطة التفاعلية",
    variant: "link" as const,
    icon: LocationPinIcon,
  },
];

export const iconButtons = [
  { icon: GlobeIcon, href: "#" },
  { icon: CrescentMoonIcon, href: "#" },
  { icon: LocationPinIcon, href: "#" },
];
