import Image from "next/image";
export default function TravelLandSection() {
  return (
    <section dir="rtl" className="py-12 text-right">
      <div
        className="mt-12 h-[300px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(102, 102, 102, 0.5) 100%), url('/assets/Getting-here-and-around/b508a57eb99cf2e6f865588877b7c2da00e3ec1b.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "70% 65%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto px-6 mb-12">
        <h2 className="travel-section-title">السفر برا</h2>
        <p className="text-[16px] leading-[1.5] text-[#333]">
          اكتشف أفضل خيارات السفر البري في المنطقة
        </p>
      </div>
    </section>
  );
}
