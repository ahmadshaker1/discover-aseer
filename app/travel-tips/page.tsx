import PageBanner from "@/components/PageBanner/PageBanner";
import TravelTipsEmergencySection from "@/components/travel-tips/TravelTipsEmergencySection";
import TravelTipsFaq, { type TravelFaqItem } from "@/components/travel-tips/TravelTipsFaq";

// Backend: replace static arrays with API data, e.g. `const [faq, emergency] = await Promise.all([fetchFaqs(), fetchEmergencyNumbers()]);`
const faqItems: TravelFaqItem[] = [
  {
    id: "1",
    question: 'بماذا تعدني "عسير" كوجهة سياحية؟',
    answer:
      "تُعتبر عسير من أهم الوجهات السياحية في المملكة العربية السعودية والمنطقة بأكملها، وذلك نظراً لما تمتلكه من تنوعٍ كبير في التضاريس من جبال، وسهول، ووديان، وشواطئ تتباين معه درجات الحرارة في مختلف المواسم. كما أن عسير تشتهر بمعالمها التاريخية، وأنماطها العمرانية التراثية، ومهرجاناتها المتنوعة، والمواقع الحضرية الحديثة بها، والتجارب الثقافية في الفنون والطعام والأزياء. كما يوجد بها أماكن الإقامة المتنوعة التي تناسب جميع الأذواق وتتوافق مع مختلف الميزانيات، ناهيك عن الأنشطة المتنوعة التي يمكنك القيام بها كسائح في مجتمع يُدهشك بكرم ضيافته وترحابه، وتقاليده الفريدة، وأصالة قيمة مع طموحه للمستقبل الذي يشارك منطقته في السباق إليه.",
  },
  {
    id: "2",
    question: "ما هو أفضل وقت للسياحة في عسير؟",
    answer:
      "الربيع والصيف يمنحان عسير طقساً معتدلاً في المرتفعات، مع تنوع في الفعاليات والمهرجانات. الشتاء يجلب جواً باردًا في الجبال مع مشاهد ضبابية مميزة، بينما الخريف يوفر أجواء هادئة للتنزه.",
  },
  {
    id: "3",
    question: "ما الذي يجب اصطحابه معي خلال رحلتي إلى عسير؟",
    answer:
      "يُفضّل إحضار ملابس مناسبة لتقلبات الطقس بين الساحل والمرتفعات، وأحذية مريحة للمشي، وواقٍ من الشمس، والهوية الشخصية، مع التحقق من أي متطلبات خاصة بالفعاليات أو المواقع التي تنوي زيارتها.",
  },
];

// Backend: 8 rows { id?, title, number }; icons resolve from `title` in TravelTipsEmergencySection.
const emergency = [
  { id: "e1", title: "شرطة", number: "911" },
  { id: "e2", title: "الدفاع المدني", number: "998" },
  { id: "e3", title: "الإسعاف", number: "997" },
  { id: "e4", title: "أمن الطرق", number: "996" },
  { id: "e5", title: "المرور", number: "993" },
  { id: "e6", title: "السياحة", number: "930" },
  { id: "e7", title: "الإطفاء", number: "998" },
  { id: "e8", title: "الأمن العام", number: "911" },
];

const TravelTipsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <PageBanner
        breadcrumbs={[
          { label: "معلومات أساسية" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title="معلومات أساسية"
        subtitle="كل ما تحتاجه لتخطيط رحلة مريحة في عسير."
        backgroundImage="/assets/experiences/experiences.png"
      />

      <section className="bg-[#f6f6f6]">
        <TravelTipsFaq items={faqItems} />
        <TravelTipsEmergencySection contacts={emergency} />
      </section>
    </div>
  );
};

export default TravelTipsPage;
