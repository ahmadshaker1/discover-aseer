import ExperiencesBanner from "@/components/experiences/ExperiencesBanner/ExperiencesBanner";
import ExperiencesFilter from "@/components/experiences/ExperiencesFilter/ExperiencesFilter";
import ExperienceCard, {
  ExperienceCardProps,
} from "@/components/experiences/ExperienceCard/ExperienceCard";

const ExperiencesPage = () => {
  // Sample experiences data - replace with actual data from API
  const experiences: ExperienceCardProps[] = [
    {
      id: 1,
      imageUrl: "/assets/experiences/experiences.png",
      category: "منتزهات طبيعية",
      title: "جوله سياحيه في شمال عسير",
      duration: "لمدة 12 ساعه",
      description:
        "اغمر نفسك في عبق تقاليد محافظة رجال ألمع العريقة، واستمتع بزيارة كوخ العسل، حيث تعيش تجربة فريدة من نوعها في قلب الطبيعة الخلابة.",
      provider: "شركة الشرق المحدودة",
      price: 1500,
      currency: "إ.ر",
      groupSize: 4,
      bookUrl: "https://example.com/book/1",
    },
    {
      id: 2,
      imageUrl: "/assets/experiences/experiences.png",
      category: "مغامرات",
      title: "تجربة تسلق الجبال",
      duration: "لمدة 6 ساعات",
      description:
        "استمتع بتجربة تسلق الجبال في أجمل المناطق الطبيعية في عسير مع مرشدين محترفين.",
      provider: "شركة المغامرات العسيرية",
      price: 800,
      currency: "إ.ر",
      groupSize: 2,
      bookUrl: "https://example.com/book/2",
    },
    {
      id: 3,
      imageUrl: "/assets/experiences/experiences.png",
      category: "تراث و فنون",
      title: "جولة في القرى التراثية",
      duration: "لمدة 8 ساعات",
      description:
        "اكتشف القرى التراثية القديمة وتعرّف على الفنون والحرف التقليدية في المنطقة.",
      provider: "مؤسسة التراث العسيري",
      price: 600,
      currency: "إ.ر",
      groupSize: 6,
      bookUrl: "https://example.com/book/3",
    },
    // Add more experiences as needed
    ...Array.from({ length: 6 }, (_, i) => ({
      id: i + 4,
      imageUrl: "/assets/experiences/experiences.png",
      category: "طبيعة",
      title: `تجربة ${i + 4}`,
      duration: "لمدة 4 ساعات",
      description:
        "تجربة رائعة في قلب الطبيعة الخلابة مع مرشدين محترفين وخدمات مميزة.",
      provider: "شركة السياحة العسيرية",
      price: 500 + i * 100,
      currency: "إ.ر",
      groupSize: 4,
      bookUrl: `https://example.com/book/${i + 4}`,
    })),
  ];

  return (
    <div className="flex flex-col w-full">
      <ExperiencesBanner />
      <div className="container mx-auto  py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="flex-shrink-0">
            <ExperiencesFilter />
          </aside>

          {/* Experiences Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} {...experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;
