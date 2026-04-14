import AboutAseerHero, {
  type AboutAseerHeroData,
} from "@/components/about-aseer/AboutAseerHero";
import AboutAseerStorySection, {
  type AboutStoryContent,
} from "@/components/about-aseer/AboutAseerStorySection";

// Backend: replace this with API response object for the whole page.
const aboutPageData: {
  hero: AboutAseerHeroData;
  story: AboutStoryContent;
} = {
  hero: {
    breadcrumbs: [
      { label: "عن عسير" },
      { label: "الصفحة الرئيسية", href: "/" },
    ],
    title: "عن عسير",
    subtitle: "تعرف على التنوع الطبيعي والثقافي في المنطقة.",
    // Backend: hero image URL from CMS/media API.
    backgroundImage: "/assets/experiences/experiences.png",
    // Backend: social links should come from API in this exact shape.
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/" },
      { platform: "x", url: "https://x.com/" },
      { platform: "youtube", url: "https://www.youtube.com/" },
      { platform: "instagram", url: "https://www.instagram.com/" },
      { platform: "facebook", url: "https://www.facebook.com/" },
    ],
  },
  story: {
    // Backend: body heading + body description + centered caption line.
    sectionTitle: "تحكي عسير قصة مكان",
    sectionSubtitle:
      "من المرتفعات الباردة إلى السهول والسواحل، تجمع عسير بين تنوع الطبيعة وعمق الثقافة في تجربة واحدة.",
    sectionCaption: "اكتشف عسير لتكتشف السعودية من جديد.",
    prevLabel: "السابق",
    nextLabel: "التالي",
    // Backend: send 4 cards for the strip before the main image.
    highlightCards: [
      {
        id: "h-1",
        image: "/assets/experiences/experiences.png",
        title: "جبال السودة",
      },
      {
        id: "h-2",
        image: "/assets/experiences/experiences.png",
        title: "قرية رجال ألمع",
      },
      {
        id: "h-3",
        image: "/assets/experiences/experiences.png",
        title: "ساحل القحمة",
      },
      {
        id: "h-4",
        image: "/assets/experiences/experiences.png",
        title: "غابات تنومة",
      },
    ],
    // Backend: slider images + per-image text. Add/remove freely from API.
    slides: [
      {
        id: "culture-1",
        image: "/assets/experiences/experiences.png",
        title: "أرض الثقافة والفنون",
        description:
          "تزدهر عسير بالفنون الشعبية والحرف المحلية والمهرجانات، ما يجعلها وجهة نابضة بالهوية والإبداع.",
      },
      {
        id: "nature-2",
        image: "/assets/experiences/experiences.png",
        title: "تنوع جغرافي استثنائي",
        description:
          "تتنوع تضاريس عسير بين الجبال والوديان والسواحل لتمنح الزائر طقساً وتجارب مختلفة في كل رحلة.",
      },
      {
        id: "heritage-3",
        image: "/assets/experiences/experiences.png",
        title: "تراث حي ومتجدد",
        description:
          "تعكس القرى التاريخية والأنماط العمرانية في عسير مزيجاً فريداً بين الأصالة والطموح نحو المستقبل.",
      },
    ],
  },
};

const AboutAseerPage = () => {
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
