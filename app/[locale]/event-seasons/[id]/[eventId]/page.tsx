import EventDetailContent from "@/components/event-seasons/season-detail/EventDetailContent";
import EventDetailHero from "@/components/event-seasons/season-detail/EventDetailHero";
import { fetchSeasonEventDetail } from "@/components/event-seasons/season-detail-data";
import type { LocaleCode } from "@/lib/i18n/localized";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface SeasonEventDetailPageProps {
  params: Promise<{ id: string; eventId: string; locale: string }>;
}

export default async function SeasonEventDetailPage({
  params,
}: SeasonEventDetailPageProps) {
  const { id, eventId } = await params;
  const locale = (await getLocale()) as LocaleCode;
  const data = await fetchSeasonEventDetail(id, eventId, locale);

  if (!data) {
    notFound();
  }

  const bannerImage =
    data.event.listing.images[0] || data.season.imageUrl;

  return (
    <div className="flex w-full flex-col bg-background">
      <EventDetailHero
        season={data.season}
        title={data.event.listing.title}
        imageUrl={bannerImage}
        categoryLabels={data.categoryLabels}
        isOver={data.event.listing.isOver}
      />
      <EventDetailContent
        season={data.season}
        event={data.event}
        description={data.description}
        categoryLabels={data.categoryLabels}
      />
    </div>
  );
}
