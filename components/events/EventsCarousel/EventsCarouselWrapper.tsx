import EventsCarousel, {
  EventsCarouselItem,
} from "./EventsCarousel";

interface EventsCarouselWrapperProps {
  items: EventsCarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Server component wrapper - can fetch data here
const EventsCarouselWrapper = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
}: EventsCarouselWrapperProps) => {
  return (
    <EventsCarousel
      items={items}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
    />
  );
};

export default EventsCarouselWrapper;


