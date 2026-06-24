import type { ReactNode } from "react";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export type PrivacyContentData = {
  sections: {
    intro: { title: string; content: string[] };
    contact: {
      title: string;
      subtitle: string;
      dept: string;
      phone: string;
      email: string;
      address: string;
    };
    dataCollected: {
      title: string;
      firstPartTitle: string;
      items: { title: string; desc: string }[];
    };
    purpose: { title: string; subtitle: string; points: string[] };
    disclosure: { title: string; content: string[] };
    regulatory: { title: string; subtitle: string; points: string[] };
    storage: { title: string; content: string };
    rights: {
      title: string;
      subtitle: string;
      items: { title: string; desc: string }[];
    };
    acceptance: { title: string; content: string };
    complaints: {
      title: string;
      emailLabel: string;
      email: string;
      content: string;
    };
    authority: {
      title: string;
      country: string;
      websiteLabel: string;
      website: string;
      platformLabel: string;
      platform: string;
    };
  };
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2
        className="text-[28px] font-bold leading-[180%] text-foreground sm:text-[32px]"
        style={{ fontFamily: ara }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[18px] font-light leading-7.5 text-muted-foreground text-justify ${className}`}
      style={{ fontFamily: ibm }}
    >
      {children}
    </div>
  );
}

type PrivacyStaticContentProps = {
  data: PrivacyContentData;
  isArabic: boolean;
};

export default function PrivacyStaticContent({
  data,
  isArabic,
}: PrivacyStaticContentProps) {
  const { sections } = data;

  return (
    <div className="space-y-12">
      <Section title={sections.intro.title}>
        <Prose>
          {sections.intro.content.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </Prose>
      </Section>

      <Section title={sections.contact.title}>
        <Prose>
          <p>{sections.contact.subtitle}</p>
          <ul className="mt-4 list-none space-y-2">
            <li>
              <span className="font-medium text-foreground">
                {isArabic ? "اسم القسم/الفريق المختص: " : "Relevant Department: "}
              </span>
              {sections.contact.dept}
            </li>
            <li>
              <span className="font-medium text-foreground">
                {isArabic ? "رقم الهاتف: " : "Phone: "}
              </span>
              <a
                href={`tel:${sections.contact.phone.replace(/\s+/g, "")}`}
                className="text-primary hover:underline"
                dir="ltr"
              >
                {sections.contact.phone}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">
                {isArabic ? "البريد الإلكتروني: " : "Email: "}
              </span>
              <a
                href={`mailto:${sections.contact.email}`}
                className="text-primary hover:underline break-all"
              >
                {sections.contact.email}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">
                {isArabic ? "العنوان: " : "Address: "}
              </span>
              {sections.contact.address}
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title={sections.dataCollected.title}>
        <Prose>
          <p className="font-medium text-foreground">
            {sections.dataCollected.firstPartTitle}
          </p>
          <div className="mt-4 space-y-4">
            {sections.dataCollected.items.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Prose>
      </Section>

      <Section title={sections.purpose.title}>
        <Prose>
          <p>{sections.purpose.subtitle}</p>
          <ul className="mt-4 list-disc space-y-2 ps-5">
            {sections.purpose.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </Prose>
      </Section>

      <Section title={sections.disclosure.title}>
        <Prose>
          {sections.disclosure.content.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </Prose>
      </Section>

      <Section title={sections.regulatory.title}>
        <Prose>
          <p>{sections.regulatory.subtitle}</p>
          <ol className="mt-4 list-decimal space-y-3 ps-5">
            {sections.regulatory.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ol>
        </Prose>
      </Section>

      <Section title={sections.storage.title}>
        <Prose>
          <p>{sections.storage.content}</p>
        </Prose>
      </Section>

      <Section title={sections.rights.title}>
        <Prose>
          <p>{sections.rights.subtitle}</p>
          <div className="mt-4 space-y-4">
            {sections.rights.items.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Prose>
      </Section>

      <Section title={sections.acceptance.title}>
        <Prose>
          <p>{sections.acceptance.content}</p>
        </Prose>
      </Section>

      <Section title={sections.complaints.title}>
        <Prose>
          <p>{sections.complaints.content}</p>
          <p className="mt-4">
            <span className="font-medium text-foreground">
              {sections.complaints.emailLabel}:{" "}
            </span>
            <a
              href={`mailto:${sections.complaints.email}`}
              className="text-primary hover:underline break-all"
            >
              {sections.complaints.email}
            </a>
          </p>
        </Prose>
      </Section>

      <Section title={sections.authority.title}>
        <Prose>
          <p>{sections.authority.country}</p>
          <p className="mt-4">
            <span className="font-medium text-foreground">
              {sections.authority.websiteLabel}:{" "}
            </span>
            <a
              href={`https://${sections.authority.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {sections.authority.website}
            </a>
          </p>
          <p className="mt-2">
            <span className="font-medium text-foreground">
              {sections.authority.platformLabel}:{" "}
            </span>
            <a
              href={`https://${sections.authority.platform}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {sections.authority.platform}
            </a>
          </p>
        </Prose>
      </Section>
    </div>
  );
}
