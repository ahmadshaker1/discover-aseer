import EventsBanner from "@/components/events/EventsBanner/EventsBanner";
import EventsList from "@/components/events/EventsList/EventsList";
import EventsCarouselWrapper from "@/components/events/EventsCarousel/EventsCarouselWrapper";
import type { EventsCarouselItem } from "@/components/events/EventsCarousel/EventsCarousel";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";

// Dummy data for carousel
const carouselItems: EventsCarouselItem[] = [
  {
    id: 1,
    imageUrl: "/assets/events/banner/image.png",
    dateRange: "11 مارس - 11 ابريل",
    title: "مهرجان صيف",
    subtitle: "مهرجان الصيف 2022",
    eventYear: "فعاليات رمضان 2025",
    detailsUrl: "/events/1",
  },
  {
    id: 2,
    imageUrl: "/assets/events/banner/image.png",
    dateRange: "11 مارس - 11 ابريل",
    title: "أبها",
    subtitle: "مهرجان الصيف 2022",
    detailsUrl: "/events/2",
  },
  {
    id: 3,
    imageUrl: "/assets/events/banner/image.png",
    dateRange: "11 مارس - 11 ابريل",
    title: "رمضان",
    subtitle: "رمضان الخير",
    eventYear: "فعاليات رمضان 2025",
    detailsUrl: "/events/3",
  },
  {
    id: 4,
    imageUrl: "/assets/events/banner/image.png",
    dateRange: "11 مارس - 11 ابريل",
    title: "رمضان",
    subtitle: "رمضان الخير",
    eventYear: "فعاليات رمضان 2024",
    detailsUrl: "/events/4",
  },
];

const EventsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <EventsBanner />
      <div className="relative">
        <EventsList />
      </div>
      <EventsCarouselWrapper items={carouselItems} autoPlay={true} />
      <EventsInfo />
    </div>
  );
};

export default EventsPage;
