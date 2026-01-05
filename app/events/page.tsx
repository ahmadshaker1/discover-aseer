import EventsBanner from "@/components/events/EventsBanner/EventsBanner";
import EventsList from "@/components/events/EventsList/EventsList";

const EventsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <EventsBanner />
      <div className="relative">
        <EventsList />
      </div>
    </div>
  );
};

export default EventsPage;
