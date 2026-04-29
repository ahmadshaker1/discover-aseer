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
 * - `slider.slides[].image` controls all main slider images.
 */
const communityPageData: {
  hero: CommunityHeroData;
  slider: CommunityMainSliderContent;
} = {
  hero: {
    // Requested breadcrumb flipped to match Figma.
    breadcrumbs: [
      { label: "الخدمات المساندة", href: "/services-support" },
      { label: "الرئيسية", href: "/" },
    ],
    title: "مجتمع عسير",
    // Backend: hero image from media/CMS.
    backgroundImage: "/assets/community/hero-comunity-bg.png",
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
    sectionTitle: "سكان عسير",
    sectionSubtitle:
      "تمتد عسير على مساحة جغرافية واسعة يرافقها كثافة سكانية تعد الأعلى بين مناطق المملكة الأخرى حيث يفوق عدد السكان المليوني نسمة.",
    // Backend: add/remove/reorder slides freely from API response.
    // Required fields per slide: id, image, title, description.
    slides: [
      {
        id: "community-1",
        image: "/assets/community/community-life.png",
        title: "حياة مزدهرة",
        description:
          "فُطر مجتمع عسير على محبة الفن وتمثّله في كافة نواحي الحياة من مظاهر اللبس والعمارة، وأصناف الأكل، أو فنون الطرب أو الجزالة في الشعر والانفتاح على المعرفة والثقافة، أو في وسائل العيش وطرق كسب الرزق من تجارة أو فلاحة. وساهم تنوعها الجغرافي في تنوع هذه الفنون وتميزها بالحفاظ على الموروث والاعتزاز بالتراث.",
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
