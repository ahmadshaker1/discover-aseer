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
      className="flex items-center justify-between h-screen w-screen px-48 overflow-hidden"
      style={{
        backgroundImage: `url('/assets/landing/discover-aseer-hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left side - Text content */}
      <div className="relative py-8 px-12 w-1/2 z-10">
        <div
          className="absolute bg-black/10 backdrop-blur-xs"
          style={{
            borderRadius: "50%",
            width: "1800px",
            height: "1200px",
            right: "-50%",
            top: "-200%",
            filter: "blur(1px)",
          }}
        ></div>
        <h1 className="relative text-8xl font-bold text-white z-10">
          ألف مرحبا بكم في عسير
        </h1>
        <h3 className="relative text-2xl font-bold text-white z-10 mt-4">
          حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا
          من الثقافة والمغامرة والجمال الذي لا مثيل له.
        </h3>
      </div>

      {/* Right side - Grid of buttons */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 w-1/3 z-10 justify-items-center items-center">
        {gridItems.map((item, index) => (
          <Button
            key={index}
            className="flex flex-col items-start justify-end p-6 rounded-3xl bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 text-white cursor-pointer border-[1.5px] border-[#818181] h-48 w-32 flex-shrink-0"
          >
            <div className="w-8 h-12 mb-3 flex items-center justify-center">
              {/* Icon placeholder - user will add icons here */}
              {item.icon || <div className="w-8 h-8 bg-white/20 rounded"></div>}
            </div>
            <span className="text-sm font-medium text-right">{item.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
