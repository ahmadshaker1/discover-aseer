"use client";

import type { EventListingItem } from "./types";
import EventListingCard from "./EventListingCard/EventListingCard";

interface EventsListingGridProps {
  events: EventListingItem[];
}

const EventsListingGrid = ({ events }: EventsListingGridProps) => {
  if (events.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1009px] py-12 text-right text-gray-600" dir="rtl">
        لا توجد فعاليات مطابقة للتصفية.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1009px]">
      <div className="grid grid-cols-1 items-start justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventListingCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsListingGrid;
