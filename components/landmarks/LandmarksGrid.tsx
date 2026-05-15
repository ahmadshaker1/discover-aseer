import { fetchLandmarks } from "./data";
import SafeHtml from "@/components/common/SafeHtml";

const LandmarksGrid = async () => {
  const landmarks = await fetchLandmarks();

  return (
    <div className="container mx-auto py-16 px-6 md:px-12 lg:px-24">
      <div className="mb-10 flex flex-col items-end text-right space-y-3">
        <span className="h-px w-24 bg-linear-to-l from-transparent via-foreground/40 to-transparent" />
        <h1 className="text-4xl font-bold text-foreground">المعالم في عسير</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
          اكتشف أبرز المعالم في عسير واستمتع بتجارب متنوعة بين الطبيعة والتراث
          والأسواق الشعبية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {landmarks.map((landmark) => (
          <div
            key={landmark.id}
            className="group w-full h-[380px] md:h-[400px] lg:h-[420px] rounded-3xl overflow-hidden bg-black/90 shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
          >
            <div className="relative h-full w-full">
              <img
                src={landmark.image}
                alt={landmark.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-0 right-0 px-6 text-right space-y-2 text-white">
                <div className="text-xs opacity-80">{landmark.location}</div>
                <h3 className="text-lg md:text-xl font-bold">
                  {landmark.title}
                </h3>
                <SafeHtml html={landmark.description} className="text-sm opacity-90 line-clamp-2" />
                <div className="text-xs opacity-80">{landmark.guideName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandmarksGrid;


