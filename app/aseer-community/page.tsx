import { getLocale } from "next-intl/server";
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
const AseerCommunityPage = async () => {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const communityPageData: {
    hero: CommunityHeroData;
    slider: CommunityMainSliderContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: isRtl ? "الخدمات المساندة" : "Support services", href: "/services-support" },
        { label: isRtl ? "الرئيسية" : "Home", href: "/" },
      ],
      title: isRtl ? "مجتمع عسير" : "Aseer community",
      backgroundImage: "/assets/community/hero-comunity-bg.png",
      socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/" },
      { platform: "x", url: "https://x.com/" },
      { platform: "youtube", url: "https://www.youtube.com/" },
      { platform: "instagram", url: "https://www.instagram.com/" },
      { platform: "facebook", url: "https://www.facebook.com/" },
      ],
    },
    slider: {
      sectionTitle: isRtl ? "سكان عسير" : "People of Aseer",
      sectionSubtitle: isRtl
        ? "تمتد عسير على مساحة جغرافية واسعة يرافقها كثافة سكانية تعد الأعلى بين مناطق المملكة الأخرى حيث يفوق عدد السكان المليوني نسمة."
        : "Aseer spans a wide geography and has one of the highest population densities among Saudi regions, exceeding two million residents.",
      slides: [
      {
        id: "community-1",
        image: "/assets/community/community-life.png",
        title: isRtl ? "حياة مزدهرة" : "A thriving life",
        description: isRtl
          ? "فُطر مجتمع عسير على محبة الفن وتمثّله في كافة نواحي الحياة من مظاهر اللبس والعمارة، وأصناف الأكل، أو فنون الطرب أو الجزالة في الشعر والانفتاح على المعرفة والثقافة، أو في وسائل العيش وطرق كسب الرزق من تجارة أو فلاحة. وساهم تنوعها الجغرافي في تنوع هذه الفنون وتميزها بالحفاظ على الموروث والاعتزاز بالتراث."
          : "The Aseer community is rooted in art across daily life: attire, architecture, cuisine, music, poetry, knowledge, and livelihoods such as trade and farming.",
      },
      {
        id: "community-2",
        image: "/assets/community/hero-comunity-bg.png",
        title: isRtl ? "مجالس عامرة بالضيافة" : "Hospitality-rich gatherings",
        description: isRtl
          ? "تجسد المجالس في عسير قيم الكرم والتواصل الاجتماعي، وتبقى مساحة حية لتبادل القصص والعادات والموروث الثقافي."
          : "Gatherings in Aseer embody generosity and social connection, preserving stories, customs and heritage.",
      },
      {
        id: "community-3",
        image: "/assets/community/hero-comunity-bg.png",
        title: isRtl ? "حرف أصيلة بروح حديثة" : "Authentic crafts with a modern spirit",
        description: isRtl
          ? "لا تزال الحرف اليدوية جزءاً أساسياً من المجتمع العسيري، مع حضور متجدد يربط بين الأصالة والابتكار في تفاصيل الحياة اليومية."
          : "Handcrafts remain central in Aseer, blending authenticity with modern innovation in daily life.",
      },
      {
        id: "community-4",
        image: "/assets/community/hero-comunity-bg.png",
        title: isRtl ? "فعاليات تجمع المجتمع" : "Community-connecting events",
        description: isRtl
          ? "تمنح الفعاليات المحلية مساحة للاحتفاء بالتراث والفنون، وتؤكد على تماسك المجتمع وتنوع تجاربه في مختلف المواسم."
          : "Local events celebrate heritage and arts while reflecting community cohesion across seasons.",
      },
      ],
    },
  };
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
