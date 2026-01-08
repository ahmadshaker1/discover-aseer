import { Button } from "@headlessui/react";
import {
  EventsAndSeasonsIcon,
  ActivitiesIcon,
  PointsOfInterestIcon,
  LivingInAseerIcon,
  AseerCuisineIcon,
  TouristicSitesIcon,
} from "./Icons";

const Hero = () => {
  const gridItems = [
    { text: "وجهات رئيسية", icon: <EventsAndSeasonsIcon /> },
    { text: "التجارب", icon: <ActivitiesIcon /> },
    { text: "الفعاليات و المواسم", icon: <EventsAndSeasonsIcon /> },
    { text: "المعالم السياحية", icon: <TouristicSitesIcon /> },
    { text: "المطبخ العسيري", icon: <AseerCuisineIcon /> },
    { text: "الإقامة في عسير", icon: <LivingInAseerIcon /> },
  ];

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-48 py-20 md:py-24 lg:py-0 overflow-hidden relative"
      style={{
        backgroundImage: `url('/assets/landing/discover-aseer-hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Purple overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(115, 0, 205, 0.85) 0%, rgba(115, 0, 205, 0.85) 10%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      ></div>
      {/* Left side - Text content */}
      <div className="relative py-8 px-4 sm:px-6 md:px-8 lg:px-12 w-full lg:w-1/2 z-10 mb-8 lg:mb-0">
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white z-10 leading-tight">
          ألف مرحبا بكم في عسير
        </h1>
        <h3 className="relative text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white z-10 mt-4 sm:mt-6">
          حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا
          من الثقافة والمغامرة والجمال الذي لا مثيل له.
        </h3>
      </div>

      {/* Right side - Grid of buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-2 sm:gap-3 w-full lg:w-2/5 xl:w-1/3 z-10 justify-items-center items-center">
        {gridItems.map((item, index) => (
          <Button
            key={index}
            className="flex flex-col items-start justify-end p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 text-white cursor-pointer border-[1.5px] border-[#818181] h-28 sm:h-36 md:h-40 lg:h-44 w-full sm:w-28 md:w-32 flex-shrink-0"
          >
            <div className="w-6 h-8 sm:w-8 sm:h-12 mb-2 sm:mb-3 flex items-center justify-center">
              {/* Icon placeholder - user will add icons here */}
              {item.icon || (
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded"></div>
              )}
            </div>
            <span className="text-xs sm:text-sm font-medium text-right">
              {item.text}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
