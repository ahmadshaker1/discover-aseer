import CommunityHero, {
  type CommunityHeroData,
} from "@/components/community/CommunityHero";
import CommunityMainSlider, {
  type CommunityMainSliderContent,
} from "@/components/community/CommunityMainSlider";

/**
 * Backend handoff:
 * - Keep components unchanged; only replace this object with API/CMS payload mapping.
 * - `hero.backgroundImage` controls the full hero photo.
 * - `hero.ribbonPatternImage` controls the right ribbon tile image.
 * - `slider.slides[].image` controls all main slider images.
 */
const communityPageData: {
  hero: CommunityHeroData;
  slider: CommunityMainSliderContent;
} = {
  hero: {
    // Requested breadcrumb: الرئيسية > الخدمات المساندة
    breadcrumbs: [
      { label: "الخدمات المساندة" },
      { label: "الرئيسية", href: "/" },
    ],
    title: "مجتمع عسير",
    // Backend: hero image + pattern from media/CMS.
    backgroundImage: "/assets/community/hero-comunity-bg.png",
    ribbonPatternImage: "/hero-pattern/ribbon.jpg",
    // Backend: update only URLs/platform values here (or from API); no component edits needed.
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/" },
      { platform: "x", url: "https://x.com/" },
      { platform: "youtube", url: "https://www.youtube.com/" },
      { platform: "instagram", url: "https://www.instagram.com/" },
      { platform: "facebook", url: "https://www.facebook.com/" },
    ],
  },
  slider: {
    // Backend: restore/replace body title + sub text from CMS.
    sectionTitle: "سُكان عسير",
    sectionSubtitle:
      "تمتد عسير على مساحة جعرافية واسعة يرافقها كثافة سكانية تعد الأعلى بين مناطق المملكة الأخرى حيث يفوق عدد السكان المليوني نسمة.",
    prevLabel: "السابق",
    nextLabel: "التالي",
    // Backend: add/remove/reorder slides freely from API response.
    // Required fields per slide: id, image, title, description.
    slides: [
      {
        id: "community-1",
        image: "/assets/community/hero-comunity-bg.png",
        title: "شيم عسير",
        description:
          "اتساع النطاق السكني في عسير بين بيئات جبلية وساحلية وبدوية وحضرية لم يؤثر في المساس بالعادات والتقاليد العريقة وأصالة الطبائع الإنسانية التي تميز سكان هذه المنطقة، ولم يعارض انفتاحها على التطور والحداثة في مزيج متجانس تميز بخصال الشهامة والوفاء والطيبة مع التحضر والتطور المعرفي والمهني.",
      },
      {
        id: "community-2",
        image: "/assets/community/hero-comunity-bg.png",
        title: "مجتمع مترابط",
        description:
          "تُمثل العائلة نواة العلاقات الإنسانية في عسير، فالأسرة هي محضن التربية الأول الذي توليه اهتمامها بحُسن التنشئة على الأصالة والتطور، وتمتد هذه العلاقة الأصيلة للمجتمع من أقارب وأصدقاء تجمعهم الألفة والوفاء كما تجمعهم القهوة في ساعات الراحة وليالي السمر.",
      },
      {
        id: "community-3",
        image: "/assets/community/hero-comunity-bg.png",
        title: "حياة مزدهرة",
        description:
          "فُطر مجتمع عسير على محبة الفن وتمثّله في كافة نواحي الحياة من مظاهر اللبس والعمارة، وأصناف الأكل، أو فنون الطرب أو الجزالة في الشعر والانفتاح على المعرفة والثقافة، أو في وسائل العيش وطرق كسب الرزق من تجارة أو فلاحة. وساهم تنوعها الجغرافي في تنوع هذه الفنون وتميزها بالحفاظ على الموروث والاعتزاز بالتراث.",
      },
    ],
  },
};

const AseerCommunityPage = () => {
  return (
    <div className="flex w-full flex-col">
      <CommunityHero data={communityPageData.hero} />
      <section className="bg-[#f6f6f6]">
        <CommunityMainSlider content={communityPageData.slider} />
      </section>
    </div>
  );
};

export default AseerCommunityPage;
