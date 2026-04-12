import EventsBanner from "@/components/events/EventsBanner/EventsBanner";
import EventsCatalog from "@/components/events/EventsCatalog";
import { DUMMY_EVENTS } from "@/components/events/dummyEvents";

/** Swap `DUMMY_EVENTS` for API data mapped to `EventListingItem[]` — see `components/events/BACKEND.md`. */
const EventsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <EventsBanner />
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <EventsCatalog events={DUMMY_EVENTS} />
      </div>
    </div>
  );
};

export default EventsPage;
