import ImageGrid from "./ImageGrid";
import data from "./data";

const DiscoverAseer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen max-w-screen-2xl px-24 space-y-16 overflow-hidden">
      <div className="relative py-8 px-12 space-y-8">
        <h1 className="text-6xl font-bold ">
          اكتشف<span className="text-primary"> عسير</span>
        </h1>
        <p className="text-xl font-bold">
          في سيمفونية آسرة من الجمال ، تندمج قمم الجبال مع الشواطئ البكر ، حيث
          تلتف الرمال الذهبية حول الهضاب المورقة. تجري الطبيعة رقصة رشيقة ، حيث
          يدور دفء السهول مع المطر ، وينجرف الضباب بأناقة عبر روعة المناظر
          الطبيعية.
        </p>
      </div>
      <ImageGrid data={data} />
    </div>
  );
};

export default DiscoverAseer;
