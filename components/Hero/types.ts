export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  largeTitle: boolean;
  logo?: string;
  /** When set, the CTA opens this YouTube URL in a modal instead of navigating. */
  filmUrl?: string;
};
