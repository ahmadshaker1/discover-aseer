const LandmarksHeader = () => {
  return (
    <div className="flex flex-col items-start space-y-4 text-right w-full">
      <h2 className="text-3xl md:text-7xl font-bold text-right w-full text-black">
        أشهر المعالم في عسير
      </h2>
      <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
      <p className="text-base md:text-lg text-gray-700 text-right max-w-2xl">
        اكتشف أبرز المعالم في عسير واستمتع بتجارب متنوعة بين الطبيعة والتراث
        والأسواق الشعبية. استخدم الفلاتر أدناه للعثور على المعالم التي تناسبك.
      </p>
    </div>
  );
};

export default LandmarksHeader;
