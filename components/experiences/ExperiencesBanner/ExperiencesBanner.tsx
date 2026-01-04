import Link from "next/link";

const ExperiencesBanner = () => {
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
      {/* Overlay pattern - similar to the geometric pattern in the image */}
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

      {/* Breadcrumb navigation - top right */}

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-48">
        <div className="flex items-center space-x-2 text-white text-base font-medium">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            الصفحة الرئيسية
          </Link>
          <span className="mx-2">{" > "}</span>
          <span>التجارب</span>
        </div>

        {/* Main title */}
        <h1 className="text-7xl font-bold text-white mb-6">
          تجارب تنتظرك في عسير
        </h1>

        {/* Subtitle */}
        <p className="text-2xl font-medium text-white max-w-4xl leading-relaxed">
          زيارة واحدة لا تكفى مع وفرة الخيارات من الانشطة والتجارب.
        </p>
      </div>

      {/* Decorative blur effect */}
      {/* <div
        className="absolute bg-black/10 backdrop-blur-xs"
        style={{
          borderRadius: "50%",
          width: "1800px",
          height: "1200px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
        }}
      ></div> */}
    </div>
  );
};

export default ExperiencesBanner;
