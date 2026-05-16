import EventSeasonsCurrentSection from "@/components/event-seasons/EventSeasonsCurrentSection/EventSeasonsCurrentSection";
import EventSeasonsHero from "@/components/event-seasons/EventSeasonsHero/EventSeasonsHero";
import EventSeasonsPreviousSection from "@/components/event-seasons/EventSeasonsPreviousSection/EventSeasonsPreviousSection";
import { fetchEventSeasonsPageData } from "@/components/event-seasons/data";
import { getLocale } from "next-intl/server";
import type { LocaleCode } from "@/lib/i18n/localized";

export default async function EventSeasonsPage() {
  const locale = (await getLocale()) as LocaleCode;
  const { currentSeasons, previousSeasons } = await fetchEventSeasonsPageData(locale);

  return (
    <div className="flex w-full flex-col gap-4 pb-12">
      <EventSeasonsHero />
      {currentSeasons.length > 0 ? (
        <EventSeasonsCurrentSection seasons={currentSeasons} />
      ) : null}
      {previousSeasons.length > 0 ? (
        <EventSeasonsPreviousSection seasons={previousSeasons} />
      ) : null}
    </div>
  );
}
