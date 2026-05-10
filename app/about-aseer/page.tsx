import { getLocale } from "next-intl/server";
import AboutAseerHero, {
  type AboutAseerHeroData,
} from "@/components/about-aseer/AboutAseerHero";
import AboutAseerStorySection, {
  type AboutStoryContent,
} from "@/components/about-aseer/AboutAseerStorySection";

const AboutAseerPage = async () => {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const aboutPageData: {
    hero: AboutAseerHeroData;
    story: AboutStoryContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: isRtl ? "عن عسير" : "About Aseer" },
        { label: isRtl ? "الصفحة الرئيسية" : "Home", href: "/" },
      ],
      title: isRtl ? "عن عسير" : "About Aseer",
      subtitle: isRtl
        ? "تعرف على التنوع الطبيعي والثقافي في المنطقة."
        : "Discover the natural and cultural diversity of the region.",
      backgroundImage: "/assets/experiences/experiences.png",
      socialLinks: [
        { platform: "linkedin", url: "https://www.linkedin.com/" },
        { platform: "x", url: "https://x.com/" },
        { platform: "youtube", url: "https://www.youtube.com/" },
        { platform: "instagram", url: "https://www.instagram.com/" },
        { platform: "facebook", url: "https://www.facebook.com/" },
      ],
    },
    story: {
      sectionTitle: isRtl ? "تحكي عسير قصة مكان" : "Aseer tells the story of place",
      sectionSubtitle: isRtl
        ? "من المرتفعات الباردة إلى السهول والسواحل، تجمع عسير بين تنوع الطبيعة وعمق الثقافة في تجربة واحدة."
        : "From cool highlands to plains and coastlines, Aseer brings natural diversity and cultural depth into one journey.",
      sectionCaption: isRtl
        ? "اكتشف عسير لتكتشف السعودية من جديد."
        : "Discover Aseer to rediscover Saudi Arabia.",
      prevLabel: isRtl ? "السابق" : "Previous",
      nextLabel: isRtl ? "التالي" : "Next",
      highlightCards: [
      {
        id: "h-1",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "جبال السودة" : "Al Soudah Mountains",
      },
      {
        id: "h-2",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "قرية رجال ألمع" : "Rijal Almaa Village",
      },
      {
        id: "h-3",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "ساحل القحمة" : "Al Qahma Coast",
      },
      {
        id: "h-4",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "غابات تنومة" : "Tanomah Forests",
      },
      ],
      slides: [
      {
        id: "culture-1",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "أرض الثقافة والفنون" : "Land of culture and arts",
        description: isRtl
          ? "تزدهر عسير بالفنون الشعبية والحرف المحلية والمهرجانات، ما يجعلها وجهة نابضة بالهوية والإبداع."
          : "Aseer thrives with folk arts, crafts and festivals, making it a destination full of identity and creativity.",
      },
      {
        id: "nature-2",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "تنوع جغرافي استثنائي" : "Exceptional geographic diversity",
        description: isRtl
          ? "تتنوع تضاريس عسير بين الجبال والوديان والسواحل لتمنح الزائر طقساً وتجارب مختلفة في كل رحلة."
          : "Aseer’s terrain varies between mountains, valleys and coastlines, offering distinct weather and experiences every trip.",
      },
      {
        id: "heritage-3",
        image: "/assets/experiences/experiences.png",
        title: isRtl ? "تراث حي ومتجدد" : "Living and renewed heritage",
        description: isRtl
          ? "تعكس القرى التاريخية والأنماط العمرانية في عسير مزيجاً فريداً بين الأصالة والطموح نحو المستقبل."
          : "Historic villages and architecture in Aseer reflect a unique blend of authenticity and future ambition.",
      },
      ],
    },
  };
  return (
    <div className="flex w-full flex-col">
      <AboutAseerHero data={aboutPageData.hero} />
      <section className="bg-[#f6f6f6]">
        <AboutAseerStorySection content={aboutPageData.story} />
      </section>
    </div>
  );
};

export default AboutAseerPage;
