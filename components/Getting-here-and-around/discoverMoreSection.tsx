import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function DiscoverMoreSection() {
  const t = useTranslations("gettingHere.land");

  return (
    <div className="container mx-auto px-6 mb-12">
      <div className="relative z-10 mb-10 flex items-end justify-start border-b border-border pb-4">
        <h1
          className="text-foreground"
          style={{
            textAlign: "right",
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 700,
          }}
        >
          {t("discoverMoreTitle")}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Experiences */}
        <div
          className="bg-[#F8F8F8] dark:bg-surface border-[rgba(204,204,204,0.37)] dark:border-border"
          style={{
            display: "flex",
            padding: "32px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div className="flex flex-col gap-2 w-full items-start">
            <h3
              className="text-[#280048] dark:text-foreground"
              style={{
                textAlign: "right",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {t("discoverMoreExperiencesTitle")}
            </h3>
            <p
              className="text-black dark:text-foreground"
              style={{
                textAlign: "right",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {t("discoverMoreExperiencesDesc")}
            </p>
          </div>
          <Link
            href="/experiences"
            className="border-[rgba(40,0,72,0.16)] dark:border-border text-[#7300CD] dark:text-[#d39aff]"
            style={{
              display: "flex",
              height: "36px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              borderRadius: "86px",
              borderWidth: "1px",
              borderStyle: "solid",
              marginTop: "24px",
            }}
          >
            {t("discoverMoreExperiencesBtn")}
          </Link>
        </div>

        {/* Card 2: Interactive map */}
        <div
          className="bg-[#F8F8F8] dark:bg-surface border-[rgba(204,204,204,0.37)] dark:border-border"
          style={{
            display: "flex",
            padding: "32px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div className="flex flex-col gap-2 w-full items-start">
            <h3
              className="text-[#280048] dark:text-foreground"
              style={{
                textAlign: "right",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {t("discoverMoreMapTitle")}
            </h3>
            <p
              className="text-black dark:text-foreground"
              style={{
                textAlign: "right",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {t("discoverMoreMapDesc")}
            </p>
          </div>
          <Link
            href="/interactive-map"
            className="border-[rgba(40,0,72,0.16)] dark:border-border text-[#7300CD] dark:text-[#d39aff]"
            style={{
              display: "flex",
              height: "36px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              borderRadius: "86px",
              borderWidth: "1px",
              borderStyle: "solid",
              marginTop: "24px",
            }}
          >
            {t("discoverMoreMapBtn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
