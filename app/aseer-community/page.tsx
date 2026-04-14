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
      { label: "الرئيسية", href: "/" },
      { label: "الخدمات المساندة" },
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
    sectionTitle: "شكلان عسير",
    sectionSubtitle:
      "لكل قرية ومجتمع في عسير طابعه الخاص، لكن يجمعهم تراث غني وروح الضيافة الأصيلة.",
    prevLabel: "السابق",
    nextLabel: "التالي",
    // Backend: add/remove/reorder slides freely from API response.
    // Required fields per slide: id, image, title, description.
    slides: [
      {
        id: "community-1",
        image: "/assets/community/hero-comunity-bg.png",
        title: "زراعة متوارثة بين الأجيال",
        description:
          "تعكس المزارع العسيرية علاقة المجتمع بالأرض، حيث تنتقل المعرفة الزراعية من جيل إلى آخر بروح التعاون والاعتزاز بالهوية المحلية.",
      },
      {
        id: "community-2",
        image: "/assets/community/hero-comunity-bg.png",
        title: "مجالس عامرة بالضيافة",
        description:
          "تجسد المجالس في عسير قيم الكرم والتواصل الاجتماعي، وتبقى مساحة حية لتبادل القصص والعادات والموروث الثقافي.",
      },
      {
        id: "community-3",
        image: "/assets/community/hero-comunity-bg.png",
        title: "حرف أصيلة بروح حديثة",
        description:
          "لا تزال الحرف اليدوية جزءاً أساسياً من المجتمع العسيري، مع حضور متجدد يربط بين الأصالة والابتكار في تفاصيل الحياة اليومية.",
      },
      {
        id: "community-4",
        image: "/assets/community/hero-comunity-bg.png",
        title: "فعاليات تجمع المجتمع",
        description:
          "تمنح الفعاليات المحلية مساحة للاحتفاء بالتراث والفنون، وتؤكد على تماسك المجتمع وتنوع تجاربه في مختلف المواسم.",
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
