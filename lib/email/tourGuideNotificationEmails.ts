import { brandPrimary } from "@/lib/theme/palette";

const LOGO_URL =
  "https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function brandEmailShell(options: {
  previewText: string;
  headlineAr: string;
  headlineEn: string;
  bodyArHtml: string;
  bodyEnHtml: string;
  ctaLabelAr: string;
  ctaLabelEn: string;
  ctaHref: string;
}): string {
  const primary = brandPrimary;
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(options.headlineAr)}</title>
</head>
<body style="margin:0;padding:0;background:#F2F2F2;color:#1D1F1F;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(options.previewText)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F2F2F2;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E4E4E4;">
          <tr>
            <td style="background:${primary};padding:28px 32px;text-align:center;">
              <img src="${LOGO_URL}" alt="اكتشف عسير" width="120" style="display:inline-block;height:auto;max-width:120px;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#280048;text-align:right;">
                ${escapeHtml(options.headlineAr)}
              </h1>
              <div style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#1D1F1F;text-align:right;">
                ${options.bodyArHtml}
              </div>
              <hr style="border:none;border-top:1px solid #E4E4E4;margin:0 0 28px;" />
              <h2 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:#280048;text-align:left;direction:ltr;">
                ${escapeHtml(options.headlineEn)}
              </h2>
              <div style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#1D1F1F;text-align:left;direction:ltr;">
                ${options.bodyEnHtml}
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 8px;">
                <tr>
                  <td align="center" style="border-radius:999px;background:${primary};">
                    <a href="${escapeHtml(options.ctaHref)}" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;">
                      ${escapeHtml(options.ctaLabelAr)} · ${escapeHtml(options.ctaLabelEn)}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#6B7280;text-align:center;">
                اكتشف عسير · Discover Aseer
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function displayNames(nameAr?: string | null, nameEn?: string | null) {
  const ar = (nameAr || nameEn || "المرشد السياحي").trim();
  const en = (nameEn || nameAr || "Tour guide").trim();
  return { nameAr: ar, nameEn: en, safeNameAr: escapeHtml(ar), safeNameEn: escapeHtml(en) };
}

export function getTourGuidePortalUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "https://discoveraseer.com";
  return `${raw.replace(/\/+$/, "")}/ar/tour-guides/portal`;
}

export function buildTourGuideRegistrationEmail(options: {
  nameAr?: string | null;
  nameEn?: string | null;
  portalUrl?: string;
}): { subject: string; html: string } {
  const { safeNameAr, safeNameEn } = displayNames(options.nameAr, options.nameEn);
  const portalUrl = options.portalUrl || getTourGuidePortalUrl();

  return {
    subject:
      "تم إنشاء حسابك — اكتشف عسير | Account created — Discover Aseer",
    html: brandEmailShell({
      previewText: "تم إنشاء حساب المرشد السياحي بنجاح",
      headlineAr: "مرحباً بك في بوابة المرشدين",
      headlineEn: "Welcome to the tour guide portal",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">تم <strong>إنشاء حسابك</strong> بنجاح في منصة اكتشف عسير.</p>
        <p style="margin:0;">الخطوة التالية: سجّل الدخول إلى بوابة المرشدين وأكمل ملفك وأرسل طلب الانضمام للمراجعة.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Your Discover Aseer tour guide <strong>account was created</strong> successfully.</p>
        <p style="margin:0;">Next step: sign in to the portal, complete your profile, and submit your application for review.</p>
      `,
      ctaLabelAr: "فتح بوابة المرشدين",
      ctaLabelEn: "Open portal",
      ctaHref: portalUrl,
    }),
  };
}

export function buildTourGuideUnderReviewEmail(options: {
  nameAr?: string | null;
  nameEn?: string | null;
  portalUrl?: string;
}): { subject: string; html: string } {
  const { safeNameAr, safeNameEn } = displayNames(options.nameAr, options.nameEn);
  const portalUrl = options.portalUrl || getTourGuidePortalUrl();

  return {
    subject:
      "تم استلام طلبك وهو قيد المراجعة — اكتشف عسير | Application under review — Discover Aseer",
    html: brandEmailShell({
      previewText: "طلب انضمامك كمرشد سياحي قيد المراجعة",
      headlineAr: "طلبك قيد المراجعة",
      headlineEn: "Your application is under review",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">تم استلام طلب انضمامك كمرشد سياحي، وهو الآن <strong>قيد المراجعة</strong> من فريق اكتشف عسير.</p>
        <p style="margin:0;">سنراسلك عبر البريد عند اتخاذ القرار. يمكنك متابعة حالة الطلب من بوابة المرشدين.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">We’ve received your tour guide application and it is now <strong>under review</strong> by the Discover Aseer team.</p>
        <p style="margin:0;">We’ll email you when a decision is made. You can check your application status anytime in the portal.</p>
      `,
      ctaLabelAr: "فتح بوابة المرشدين",
      ctaLabelEn: "Open portal",
      ctaHref: portalUrl,
    }),
  };
}

export function buildTourGuideLicenseEmail(options: {
  kind: "expiring" | "expired";
  nameAr?: string | null;
  nameEn?: string | null;
  expiryDate: string;
  daysUntilExpiry?: number;
  portalUrl?: string;
}): { subject: string; html: string } {
  const { safeNameAr, safeNameEn } = displayNames(options.nameAr, options.nameEn);
  const portalUrl = options.portalUrl || getTourGuidePortalUrl();
  const safeDate = escapeHtml(options.expiryDate);
  const days = options.daysUntilExpiry;

  if (options.kind === "expiring") {
    const daysAr =
      typeof days === "number" ? `خلال <strong>${days}</strong> يوماً` : "قريباً";
    const daysEn =
      typeof days === "number"
        ? `in <strong>${days}</strong> day${days === 1 ? "" : "s"}`
        : "soon";

    return {
      subject:
        "تذكير: رخصتك قاربت على الانتهاء — اكتشف عسير | License expiring soon — Discover Aseer",
      html: brandEmailShell({
        previewText: "رخصة الإرشاد السياحي قاربت على الانتهاء",
        headlineAr: "رخصتك قاربت على الانتهاء",
        headlineEn: "Your license is expiring soon",
        bodyArHtml: `
          <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
          <p style="margin:0 0 12px;">تذكير بأن تاريخ انتهاء رخصة الإرشاد السياحي المسجّل لدينا هو <strong>${safeDate}</strong> (${daysAr}).</p>
          <p style="margin:0;">يرجى تجديد الرخصة وتحديث بياناتها من بوابة المرشدين لتجنب إيقاف ظهور ملفك.</p>
        `,
        bodyEnHtml: `
          <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
          <p style="margin:0 0 12px;">This is a reminder that your tour guide license on file expires on <strong>${safeDate}</strong> (${daysEn}).</p>
          <p style="margin:0;">Please renew your license and update your portal details to avoid your profile being taken down.</p>
        `,
        ctaLabelAr: "تحديث الرخصة",
        ctaLabelEn: "Update license",
        ctaHref: portalUrl,
      }),
    };
  }

  return {
    subject:
      "انتهت صلاحية رخصتك — اكتشف عسير | License expired — Discover Aseer",
    html: brandEmailShell({
      previewText: "انتهت صلاحية رخصة الإرشاد السياحي",
      headlineAr: "انتهت صلاحية رخصتك",
      headlineEn: "Your license has expired",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">نود إبلاغك بأن رخصة الإرشاد السياحي المسجّلة لدينا انتهت بتاريخ <strong>${safeDate}</strong>.</p>
        <p style="margin:0;">يرجى تجديد الرخصة وتحديث ملفك في بوابة المرشدين في أقرب وقت.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Your tour guide license on file expired on <strong>${safeDate}</strong>.</p>
        <p style="margin:0;">Please renew your license and update your portal profile as soon as possible.</p>
      `,
      ctaLabelAr: "تحديث الرخصة",
      ctaLabelEn: "Update license",
      ctaHref: portalUrl,
    }),
  };
}
