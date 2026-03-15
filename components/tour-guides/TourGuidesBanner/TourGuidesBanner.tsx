import Link from "next/link";

const TourGuidesBanner = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-[75vh] w-screen overflow-hidden"
      style={{
        backgroundImage: `url('/assets/experiences/experiences.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
      ></div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-48">
        <div className="flex items-center space-x-2 text-white text-base font-medium">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            الصفحة الرئيسية
          </Link>
          <span className="mx-2">{" > "}</span>
          <span>المرشدون</span>
        </div>

        {/* Main title */}
        <h1 className="text-7xl font-bold text-white mb-6">
          المرشدون السياحيون
        </h1>

        {/* Subtitle */}
        <p className="text-2xl font-medium text-white max-w-4xl leading-relaxed">
          اكتشف عسير مع مرشدين محترفين يقدمون لك تجربة سياحية لا تُنسى
        </p>
      </div>
    </div>
  );
};

export default TourGuidesBanner;

