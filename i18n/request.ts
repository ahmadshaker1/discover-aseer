import {getRequestConfig} from "next-intl/server";
import {hasLocale} from "next-intl";
import {routing} from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const mainMessages = (await import(`../messages/${locale}.json`)).default;
  let plannerMessages = {};
  try {
    plannerMessages = (await import(`../messages/planner/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Could not load planner messages for locale: ${locale}`);
  }

  return {
    locale,
    messages: {
      ...mainMessages,
      Planner: plannerMessages
    },
  };
});

