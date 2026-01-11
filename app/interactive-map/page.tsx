import InteractiveMap from "@/components/interactive-map/InteractiveMap";

const InteractiveMapPage = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-40 bg-white">
      <InteractiveMap />
    </div>
  );
};

export default InteractiveMapPage;