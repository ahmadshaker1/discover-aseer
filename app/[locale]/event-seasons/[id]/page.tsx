import SeasonDetailHero from "@/components/event-seasons/season-detail/SeasonDetailHero";
import SeasonEventsSection from "@/components/event-seasons/season-detail/SeasonEventsSection";
import { fetchSeasonDetailPage } from "@/components/event-seasons/season-detail-data";
import type { LocaleCode } from "@/lib/i18n/localized";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface SeasonDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function SeasonDetailPage({ params }: SeasonDetailPageProps) {
  const { id } = await params;
  const locale = (await getLocale()) as LocaleCode;
  const data = await fetchSeasonDetailPage(id, locale);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col bg-background">
      <SeasonDetailHero season={data.season} />
      <SeasonEventsSection season={data.season} events={data.events} />
    </div>
  );
}
