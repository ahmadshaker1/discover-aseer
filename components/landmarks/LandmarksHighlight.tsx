import LandmarksHeader from "./LandmarksHeader";
import LandmarksFilters from "./LandmarksFilters";
import LandmarksCards from "./LandmarksCards";
import ShowMoreButton from "./ShowMoreButton";
import { fetchLandmarks } from "./data";

const LandmarksHighlight = async () => {
  const landmarks = await fetchLandmarks();

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-24 space-y-6 sm:space-y-8 md:space-y-10">
        <LandmarksHeader />
        <LandmarksFilters />
        <LandmarksCards landmarks={landmarks} />
      </div>

      <ShowMoreButton />
    </section>
  );
};

export default LandmarksHighlight;
