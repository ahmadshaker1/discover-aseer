import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import {
  buildFallbackHeroSlides,
  resolveHomeHeroSlides,
} from "@/components/Hero/banners-data";
import Hero from "@/components/Hero/Hero";

export default async function HeroSection() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("home.heroSlides");
  const fallbacks = buildFallbackHeroSlides(t);
  const slides = await resolveHomeHeroSlides(locale, fallbacks);

  return <Hero slides={slides} />;
}
