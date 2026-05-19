import type { SupportService } from "./types";

interface ServicesSupportCardProps {
  service: SupportService;
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10.5 5C10.5 8.5 6 11.5 6 11.5C6 11.5 1.5 8.5 1.5 5C1.5 3.80653 1.97411 2.66193 2.81802 1.81802C3.66193 0.974106 4.80653 0.5 6 0.5C7.19347 0.5 8.33807 0.974106 9.18198 1.81802C10.0259 2.66193 10.5 3.80653 10.5 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M3.183 3.841C3.65217 4.66524 4.33476 5.34783 5.159 5.817L5.601 5.198C5.67208 5.09847 5.77717 5.02844 5.8964 5.00117C6.01563 4.97389 6.14072 4.99127 6.248 5.05C6.95516 5.43646 7.7361 5.66889 8.5395 5.732C8.66489 5.74194 8.78192 5.79877 8.86727 5.89116C8.95262 5.98355 9.00002 6.10472 9 6.2305V8.4615C9.00003 8.5853 8.95413 8.7047 8.87118 8.79661C8.78824 8.88851 8.67415 8.94637 8.551 8.959C8.286 8.9865 8.019 9 7.75 9C3.47 9 0 5.53 0 1.25C0 0.981 0.0135 0.714 0.041 0.449C0.0536273 0.325849 0.111492 0.21176 0.203395 0.128817C0.295298 0.0458736 0.414703 -2.66789e-05 0.5385 1.16336e-08H2.7695C2.89528 -1.57593e-05 3.01645 0.0473758 3.10884 0.132725C3.20123 0.218075 3.25806 0.335112 3.268 0.4605C3.33111 1.2639 3.56354 2.04484 3.95 2.752C4.00873 2.85928 4.02611 2.98437 3.99883 3.1036C3.97156 3.22282 3.90153 3.32792 3.802 3.399L3.183 3.841ZM1.922 3.5125L2.872 2.834C2.60239 2.25205 2.41768 1.63442 2.3235 1H1.005C1.002 1.083 1.0005 1.1665 1.0005 1.25C1 4.978 4.022 8 7.75 8C7.8335 8 7.917 7.9985 8 7.995V6.6765C7.36558 6.58232 6.74795 6.39761 6.166 6.128L5.4875 7.078C5.21433 6.97186 4.949 6.84655 4.6935 6.703L4.6645 6.6865C3.68379 6.12836 2.87164 5.31621 2.3135 4.3355L2.297 4.3065C2.15345 4.051 2.02814 3.78567 1.922 3.5125Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ServiceTagIcon({ categoryKey }: { categoryKey: string }) {
  const key = categoryKey.toLowerCase();
  if (categoryKey.includes("مستشف") || key.includes("hospital")) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M4.66732 11.6667V8.16669H9.33398V11.6667H11.084V2.33335H2.91732V11.6667H4.66732ZM5.83398 11.6667H8.16732V9.33335H5.83398V11.6667ZM12.2507 11.6667H13.4173V12.8334H0.583984V11.6667H1.75065V1.75002C1.75065 1.59531 1.81211 1.44694 1.92151 1.33754C2.0309 1.22815 2.17927 1.16669 2.33398 1.16669H11.6673C11.822 1.16669 11.9704 1.22815 12.0798 1.33754C12.1892 1.44694 12.2507 1.59531 12.2507 1.75002V11.6667Z"
          fill="white"
        />
      </svg>
    );
  }
  if (categoryKey.includes("شرطة") || key.includes("police")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 3L4 7V12C4 17 7.4 21.7 12 23C16.6 21.7 20 17 20 12V7L12 3Z" fill="white" />
      </svg>
    );
  }
  if (categoryKey.includes("مطار") || key.includes("airport")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="white" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="7" cy="7" r="5" fill="white" />
    </svg>
  );
}

const ServicesSupportCard = ({ service }: ServicesSupportCardProps) => {
  return (
    <article
      className="flex h-full min-h-[155px] w-full min-w-0 flex-col justify-between rounded-[12px] border border-border bg-surface p-4 text-start text-foreground"
    >
      <div className="mb-2 flex shrink-0 items-center justify-start">
        <span className="inline-flex h-7 min-w-[95px] max-w-full items-center justify-center gap-1 rounded-[20px] bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          <span className="min-w-0 truncate text-start">{service.category}</span>
          <span className="shrink-0" aria-hidden>
            <ServiceTagIcon categoryKey={service.filterCategory} />
          </span>
        </span>
      </div>

      <h3
        className="mb-2 line-clamp-1 text-start text-[24px] font-bold leading-[119%] text-foreground"
        style={{ fontFamily: "var(--font-ara-hamah-1964), sans-serif" }}
      >
        {service.title}
      </h3>

      <div className="mt-auto flex min-w-0 flex-col items-stretch gap-2">
        <a
          href={service.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 max-w-full flex-row items-center justify-start gap-2 text-start text-[12px] font-bold leading-[100%] text-primary underline underline-offset-[20.5%]"
          style={{ fontFamily: "var(--font-ibm-plex-sans-arabic), sans-serif" }}
        >
          <span className="min-w-0 wrap-break-word">{service.city}</span>
          <span className="shrink-0" aria-hidden>
            <LocationIcon />
          </span>
        </a>

        <a
          href={`tel:${service.supportNumber}`}
          className="flex min-w-0 max-w-full flex-row items-center justify-start gap-2 text-start text-[12px] font-bold leading-[100%] text-muted-foreground"
          style={{ fontFamily: "var(--font-ibm-plex-sans-arabic), sans-serif" }}
        >
          <span className="min-w-0 truncate" dir="ltr">
            {service.supportNumber}
          </span>
          <span className="shrink-0" aria-hidden>
            <PhoneIcon />
          </span>
        </a>
      </div>
    </article>
  );
};

export default ServicesSupportCard;
