import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  // Use Arabic for first visits; `/en` and the language switcher still work.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

