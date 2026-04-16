import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsIntroSectionProps {
  imageUrl: string;
}

const AttractionsIntroSection = ({ imageUrl }: AttractionsIntroSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:h-[441px] lg:flex-row lg:items-start">
        <div className="flex h-full w-full max-w-[704px] flex-col gap-6 text-right">
          <h2
            className="w-full text-right text-[44px] font-bold leading-[180%] text-black"
            style={{ fontFamily: ara }}
          >
            قصور آل أبو سراح
          </h2>

          <div className="flex h-8 w-full max-w-[218px] items-center justify-start gap-[15px]">
            <div className="flex items-center gap-2 text-black/70">
              <a href="#" aria-label="Instagram" className="hover:opacity-80">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-80">
                <YouTubeIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Facebook" className="hover:opacity-80">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X" className="hover:opacity-80">
                <XIcon />
              </a>
            </div>
            <span
              className="text-right text-[18px] font-bold leading-[180%] text-black"
              style={{ fontFamily: ara }}
            >
              شارك
            </span>
          </div>

          <div className="w-full text-right text-[15px] font-light leading-[119%] text-[#252525]" style={{ fontFamily: ibm }}>
            <p>
              تقف قصور آل أبو سراح بشموخ مهيب في وسط قرية العزيزة الوادعة في أحد قُرى
              السودة، وتمثل تآلفاَ مميزا بين الحضارة العريقة في منطقة عسير، والتاريخ
              بتراثه ومزاياه التي لا توجد في مكان آخر. تتكون قصور آل أبو سراح من
              ثلاثة قصور منيعة متجاورة، يحمل كل واحد منها اسم خاص له دلالاته ومعناه
              كأسماء حجراته الكثيرة التي يصل عددها لـ 32 حجرة في ارتباط أصيل بين
              الاسم والمعنى لكل شيء في عسير. يربط بين قصري &quot;وازع&quot; و
              &quot;عزيز&quot; شرفة شرقية من الدور الرابع تُطل على المزارع الخضراء
              والجبال العالية حول القصر، ويستطيع أن يشاهد الزائر من خلالها أرجاء
              القرية المحيطة. خُصصت في القصر منذ بنائه غرفة تحمل اسم &quot;المستحي&quot;،
              وهي معدة للضيوف الذين عادة ما يكونون على قدر من الحياء من مضيفيهم، كما
              يمكن للزائر أن يتعرف على رمزية بقية الأسماء للغرف مثل &quot;السفلي&quot; في
              اسفل القصر المخصصة للمواشي، أو غرفة &quot;صُمان&quot; المصمتة والمعزولة عن
              الهواء والمخصصة لتخزين الحبوب والأغذية.
            </p>
            <p className="mt-4">
              شُيّدت القصور من حجار جبال منطقة عسير بجدران ذات سماكة عالية تحافظ على
              متانتها عند وقوع أي هجوم أو ظروف مناخية قاسية، وصممت أجزاءها بطرق
              هندسية غاية في الذكاء لتكون مقرا للسلام وقت السلم، وحصنا منيعا وقت
              الحروب، مع باب جامع يضم جميع أجزائها ويمنحها مهابة وجلالا.
            </p>
            <p className="mt-4">
              قصور آل أبو سراح وجهة تراثية وثقافية فريدة ينبغي أن تكون ضمن قائمة
              السائح في منطقة عسير، فيها يتمكن من متعة اكتشاف رمزية الأسماء
              ودلالاتها ويستمع للتاريخ عند المسح على رمز الاستجابة السريع على مداخل
              الغرف. ويتعرف على ثقافة وفنون عسير عند مشاهدة الفيديوهات المخصصة لهذا
              في صالة العرض، أو بين جنبات القصر بالمعروضات الحية، أو أن يتفاعل بحماس
              مع الفعاليات الفنية والأدائية التي تُقام في ساحاته وتجذب آلاف الزوار
              سنويا. ثم يسترخي بين الحضارة والتاريخ لتناول كوب قهوة في المقهى الخاص
              بجانب القصور، وتناول وجبة مميزة من المطاعم الموجودة وسط أجواء طبيعية
              ساحرة.
            </p>
          </div>
        </div>

        <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
          <img src={imageUrl} alt="قصور آل أبو سراح" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default AttractionsIntroSection;
