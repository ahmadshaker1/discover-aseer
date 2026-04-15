import PageBanner from "@/components/PageBanner/PageBanner";
import TravelTipsEmergencySection from "@/components/travel-tips/TravelTipsEmergencySection";
import TravelTipsFaq, {
  type TravelFaqItem,
} from "@/components/travel-tips/TravelTipsFaq";

const DEFAULT_FAQ_ITEMS: TravelFaqItem[] = [
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

type ApiFaqQuestion = {
  question_ar?: string | null;
  answer_ar?: string | null;
  question_en?: string | null;
  answer_en?: string | null;
};

type ApiFaqItem = {
  id?: string | number;
  questions?: ApiFaqQuestion[];
};

type ApiFaqResponse = {
  data?: ApiFaqItem[] | ApiFaqItem;
};

const FAQ_API_BASE_URL = "https://tool-portal.discoveraseer.com";

async function fetchFaqItems(): Promise<TravelFaqItem[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() || FAQ_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/items/faq`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return DEFAULT_FAQ_ITEMS;
    }

    const payload = (await response.json()) as ApiFaqResponse;
    const records = Array.isArray(payload.data)
      ? payload.data
      : payload.data
        ? [payload.data]
        : [];

    const mapped: TravelFaqItem[] = records.flatMap((record, recordIndex) => {
      const questions = Array.isArray(record.questions) ? record.questions : [];

      return questions
        .map((item, questionIndex) => {
          const question =
            item.question_ar?.trim() || item.question_en?.trim() || "";
          const answer = item.answer_ar?.trim() || item.answer_en?.trim() || "";

          if (!question || !answer) {
            return null;
          }

          return {
            id: `${record.id ?? recordIndex}-${questionIndex}`,
            question,
            answer,
          };
        })
        .filter((item): item is TravelFaqItem => item !== null);
    });

    return mapped.length > 0 ? mapped : DEFAULT_FAQ_ITEMS;
  } catch {
    return DEFAULT_FAQ_ITEMS;
  }
}

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

const TravelTipsPage = async () => {
  const faqItems = await fetchFaqItems();

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
