import EventsBanner from "@/components/events/EventsBanner/EventsBanner";
import EventsCatalog from "@/components/events/EventsCatalog";
import { fetchEvents } from "@/components/events/data";

/** Swap `DUMMY_EVENTS` for API data mapped to `EventListingItem[]` — see `components/events/BACKEND.md`. */
const EventsPage = async () => {
  const events = await fetchEvents();

  return (
    <div className="flex w-full flex-col">
      <EventsBanner />
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <EventsCatalog events={events} />
      </div>
    </div>
  );
};

export default EventsPage;
