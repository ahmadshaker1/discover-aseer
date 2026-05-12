const LandmarksHeader = () => {
  return (
    <div className="flex w-full flex-col items-start space-y-4 text-right text-foreground">
      <h2 className="w-full text-right text-3xl font-bold text-foreground md:text-7xl">
        أشهر المعالم في عسير
      </h2>
      <span className="h-px w-24 bg-linear-to-l from-transparent via-foreground/40 to-transparent" />
      <p className="max-w-2xl text-right text-base text-muted-foreground md:text-lg">
        اكتشف أبرز المعالم في عسير واستمتع بتجارب متنوعة بين الطبيعة والتراث
        والأسواق الشعبية. استخدم الفلاتر أدناه للعثور على المعالم التي تناسبك.
      </p>
    </div>
  );
};

export default LandmarksHeader;
