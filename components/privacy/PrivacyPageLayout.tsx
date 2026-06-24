import SafeHtml from "@/components/common/SafeHtml";
import PageBanner from "@/components/PageBanner/PageBanner";
import PrivacyStaticContent from "@/components/privacy/PrivacyStaticContent";
import type { PrivacyContentData } from "@/components/privacy/PrivacyStaticContent";

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

type PrivacyPageLayoutProps = {
  breadcrumbHome: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  cmsHtml?: string | null;
  staticData?: PrivacyContentData;
  isArabic: boolean;
};

export default function PrivacyPageLayout({
  breadcrumbHome,
  title,
  subtitle,
  lastUpdated,
  cmsHtml,
  staticData,
  isArabic,
}: PrivacyPageLayoutProps) {
  const bannerSubtitle = subtitle || lastUpdated;

  return (
    <div className="flex w-full flex-col">
      <PageBanner
        breadcrumbs={[
          { label: breadcrumbHome, href: "/" },
          { label: title },
        ]}
        title={title}
        subtitle={bannerSubtitle}
        backgroundImage="/assets/experiences/experiences.png"
      />

      <section className="bg-background text-foreground">
        <div className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-8 md:px-[62px] pb-16">
          {subtitle && lastUpdated ? (
            <p
              className="mb-10 text-sm text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {lastUpdated}
            </p>
          ) : null}

          {cmsHtml ? (
            <div style={{ fontFamily: ibm }}>
              <SafeHtml
                html={cmsHtml}
                className="space-y-4 text-[18px] font-light leading-7.5 text-muted-foreground text-justify"
              />
            </div>
          ) : staticData ? (
            <PrivacyStaticContent data={staticData} isArabic={isArabic} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
