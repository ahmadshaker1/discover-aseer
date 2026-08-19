import InteractiveMap from "@/components/interactive-map/InteractiveMap";

interface MapPageProps {
  searchParams: Promise<{ lat?: string; lon?: string; title?: string }>;
}

const MapPage = async ({ searchParams }: MapPageProps) => {
  const params = await searchParams;
  const lat = params.lat ? Number(params.lat) : undefined;
  const lon = params.lon ? Number(params.lon) : undefined;
  const title = params.title?.trim() || undefined;

  const initialFocus =
    typeof lat === "number" &&
    Number.isFinite(lat) &&
    typeof lon === "number" &&
    Number.isFinite(lon)
      ? { latitude: lat, longitude: lon, title }
      : undefined;

  return (
    <div className="flex h-dvh w-full flex-col bg-[#1C0F2A]">
      <div className="h-[76px] w-full shrink-0 lg:h-[108px]"></div>
      <div className="relative z-40 w-full flex-1 overflow-hidden bg-background text-foreground">
        <div className="h-full w-full">
          <InteractiveMap initialFocus={initialFocus} />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
