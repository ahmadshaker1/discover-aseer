import AccommodationBanner from "@/components/accommodation/AccommodationBanner";
import AccommodationGrid from "@/components/accommodation/AccommodationGrid";
import { fetchAccommodations } from "@/components/accommodation/data";

const AccommodationPage = async () => {
  const accommodations = await fetchAccommodations();

  return (
    <div className="flex flex-col w-full">
      <AccommodationBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <AccommodationGrid accommodations={accommodations} />
      </div>
    </div>
  );
};

export default AccommodationPage;
