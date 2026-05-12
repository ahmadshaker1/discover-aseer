import AccommodationBanner from "@/components/accommodation/AccommodationBanner";
import AccommodationGrid from "@/components/accommodation/AccommodationGrid";
import { fetchAccommodations } from "@/components/accommodation/data";

const AccommodationPage = async () => {
  const accommodations = await fetchAccommodations();

  return (
    <div className="flex flex-col w-full">
      <AccommodationBanner />
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <AccommodationGrid accommodations={accommodations} />
      </div>
    </div>
  );
};

export default AccommodationPage;
