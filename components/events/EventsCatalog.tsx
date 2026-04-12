"use client";

import { useCallback, useMemo, useState } from "react";
import type { EventInterestId, EventListingItem } from "./types";
import EventsFilterSidebar from "./EventsFilterSidebar";
import EventsListingGrid from "./EventsListingGrid";

const ZERO_COUNTS: Record<EventInterestId, number> = {
  adventure: 0,
  heritage: 0,
  culinary: 0,
  nature: 0,
};

interface EventsCatalogProps {
  events: EventListingItem[];
}

const EventsCatalog = ({ events }: EventsCatalogProps) => {
  const [selectedInterests, setSelectedInterests] = useState<EventInterestId[]>([]);
  const [costFilter, setCostFilter] = useState<"free" | "paid" | null>(null);
  const [dateText, setDateText] = useState("");

  const interestCounts = useMemo(() => {
    const c = { ...ZERO_COUNTS };
    for (const e of events) {
      for (const id of e.interestIds) {
        c[id]++;
      }
    }
    return c;
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (costFilter === "free" && !e.isFree) return false;
      if (costFilter === "paid" && e.isFree) return false;
      if (selectedInterests.length > 0) {
        const any = selectedInterests.some((id) => e.interestIds.includes(id));
        if (!any) return false;
      }
      return true;
    });
  }, [events, costFilter, selectedInterests]);

  const toggleInterest = useCallback((id: EventInterestId) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const reset = useCallback(() => {
    setSelectedInterests([]);
    setCostFilter(null);
    setDateText("");
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="w-full flex-1">
        <EventsListingGrid events={filtered} />
      </div>
      <aside className="w-full shrink-0 lg:w-auto">
        <EventsFilterSidebar
          interestCounts={interestCounts}
          selectedInterests={selectedInterests}
          onToggleInterest={toggleInterest}
          costFilter={costFilter}
          onCostChange={setCostFilter}
          dateText={dateText}
          onDateTextChange={setDateText}
          onReset={reset}
        />
      </aside>
    </div>
  );
};

export default EventsCatalog;
