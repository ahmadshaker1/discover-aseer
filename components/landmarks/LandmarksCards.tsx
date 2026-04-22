import { Landmark } from "./data";
import SafeHtml from "@/components/common/SafeHtml";

interface LandmarksCardsProps {
  landmarks: Landmark[];
}

const LandmarksCards = ({ landmarks }: LandmarksCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {landmarks.slice(0, 4).map((landmark) => (
        <div
          key={landmark.id}
          className="group w-full h-[380px] sm:h-[420px] md:h-[440px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90 shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="relative h-full w-full">
            <img
              src={landmark.image}
              alt={landmark.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-0 right-0 px-6 text-right space-y-2 text-white">
              <div className="text-xs opacity-80">{landmark.location}</div>
              <h3 className="text-lg md:text-xl font-bold">{landmark.title}</h3>
              <SafeHtml html={landmark.description} className="text-sm opacity-90 line-clamp-2" />
              <div className="text-xs opacity-80">{landmark.guideName}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandmarksCards;
