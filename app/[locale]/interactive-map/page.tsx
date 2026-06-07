import InteractiveMap from "@/components/interactive-map/InteractiveMap";

interface InteractiveMapPageProps {
  searchParams: Promise<{ lat?: string; lon?: string; title?: string }>;
}

const InteractiveMapPage = async ({
  searchParams,
}: InteractiveMapPageProps) => {
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
    <div className="relative z-40 h-dvh w-full overflow-hidden bg-background pt-16 text-foreground md:pt-24">
      <div className="h-full w-full">
        <InteractiveMap initialFocus={initialFocus} />
      </div>
    </div>
  );
};

export default InteractiveMapPage;
