import { Button } from "@headlessui/react";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-start justify-center h-screen w-screen px-24 space-y-16 overflow-hidden"
      style={{
        backgroundImage: `url('/assets/landing/discover-aseer-hero.jpg')`,
        backgroundSize: "fill",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative py-8 px-12">
        <div
          className="absolute bg-black/10 backdrop-blur-xs"
          style={{
            borderRadius: "50%",
            width: "1800px",
            height: "1200px",
            right: "-50%",
            top: "-200%",
            filter: "blur(1px)",
          }}
        ></div>
        <h1 className="relative text-8xl font-bold text-white z-10">
          ألف مرحبا بكم في عسير
        </h1>
        <h3 className="relative text-2xl font-bold text-white z-10 mt-4">
          حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا
          من الثقافة والمغامرة والجمال الذي لا مثيل له.
        </h3>
      </div>
      <Button className="border-2 border-white text-white px-8 py-3 cursor-pointer rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg">
        شاهد الفيلم
      </Button>
    </div>
  );
};

export default Hero;
