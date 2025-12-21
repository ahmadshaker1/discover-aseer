import { Button } from "@headlessui/react";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-start justify-center h-screen w-screen px-24 space-y-24"
      style={{
        backgroundImage: `url('/assets/landing/discover-aseer-hero.jpg')`,
        backgroundSize: "fill",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-8xl font-bold text-white">ألف مرحبا بكم في عسير</h1>
      <h3 className="text-2xl font-bold text-white">
        حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا من
        الثقافة والمغامرة والجمال الذي لا مثيل له.
      </h3>
      <Button className="border-2 border-white text-white px-8 py-4 cursor-pointer rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg">
        شاهد الفيلم
      </Button>
    </div>
  );
};

export default Hero;
