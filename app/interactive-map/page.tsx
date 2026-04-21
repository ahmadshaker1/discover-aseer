import InteractiveMap from "@/components/interactive-map/InteractiveMap";

const InteractiveMapPage = () => {
  return (
    <div className="relative z-40 h-screen w-full overflow-y-auto bg-white pt-20 md:pt-24">
      <div className="h-[calc(100vh-5rem)] min-h-[720px] w-full md:h-[calc(100vh-6rem)]">
        <InteractiveMap />
      </div>
    </div>
  );
};

export default InteractiveMapPage;