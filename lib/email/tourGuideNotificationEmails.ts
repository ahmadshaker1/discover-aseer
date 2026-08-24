import {
  brandEmailShell,
  escapeHtml,
} from "@/lib/email/brandEmailShell";

function displayNames(nameAr?: string | null, nameEn?: string | null) {
  const ar = (nameAr || nameEn || "المرشد السياحي").trim();
  const en = (nameEn || nameAr || "Tour guide").trim();
  return {
    nameAr: ar,
    nameEn: en,
    safeNameAr: escapeHtml(ar),
    safeNameEn: escapeHtml(en),
  };
}

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function parseIsoDateParts(value: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (!y || m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m, d };
}

function formatLicenseDateAr(value: string): string {
  const parts = parseIsoDateParts(value);
  if (!parts) return value;
  return `${String(parts.d).padStart(2, "0")}-${String(parts.m).padStart(2, "0")}-${parts.y}`;
}

function formatLicenseDateEn(value: string): string {
  const parts = parseIsoDateParts(value);
  if (!parts) return value;
  return `${parts.d} ${EN_MONTHS[parts.m - 1]} ${parts.y}`;
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
  /** Verification link — required so the guide proves email ownership. */
  verifyUrl: string;
}): { subject: string; html: string } {
  const { safeNameAr, safeNameEn } = displayNames(options.nameAr, options.nameEn);

  return {
    subject:
      "تأكيد البريد الإلكتروني — اكتشف عسير | Verify Your Email Address — Discover Aseer",
    html: brandEmailShell({
      previewText: "يرجى تأكيد بريدك الإلكتروني لإكمال حساب بوابة المرشدين",
      headlineAr: "تأكيد البريد الإلكتروني",
      headlineEn: "Verify Your Email Address",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحبًا ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">تم إنشاء حسابك في بوابة المرشدين. يرجى تأكيد بريدك الإلكتروني بالضغط على الزر أدناه، ثم تسجيل الدخول واستكمال ملفك.</p>
        <p style="margin:0;">يرجى إتمام التأكيد خلال 48 ساعة</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Your Tour Guide Portal account has been created. Please verify your email address by clicking the button below, then sign in to complete your profile.</p>
        <p style="margin:0;">Please complete the verification within 48 hours.</p>
      `,
      ctaLabelAr: "تأكيد البريد الإلكتروني",
      ctaLabelEn: "Verify email address",
      ctaHref: options.verifyUrl,
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
      "طلبك قيد المراجعة — اكتشف عسير | Your Application Is Under Review — Discover Aseer",
    html: brandEmailShell({
      previewText: "تم استلام طلبك، ويعمل فريقنا على مراجعته",
      headlineAr: "طلبك قيد المراجعة",
      headlineEn: "Your Application Is Under Review",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحبًا ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">نشكر لك اهتمامك بالانضمام مرشداً سياحياً إلى منصة اكتشف عسير. تم استلام طلبك، ويعمل فريقنا على مراجعته.</p>
        <p style="margin:0;">سنُشعرك بالنتيجة عبر البريد الإلكتروني، ويمكنك متابعة حالة طلبك من خلال بوابة المرشدين.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Thank you for your interest in joining the Discover Aseer platform as a tour guide. We have received your application, and our team is currently reviewing it.</p>
        <p style="margin:0;">We’ll notify you of the outcome by email. You can also track the status of your application through the Tour Guide Portal.</p>
      `,
      ctaLabelAr: "فتح بوابة المرشدين",
      ctaLabelEn: "Open Tour Guide Portal",
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
  const safeDateAr = escapeHtml(formatLicenseDateAr(options.expiryDate));
  const safeDateEn = escapeHtml(formatLicenseDateEn(options.expiryDate));
  const days = options.daysUntilExpiry;

  if (options.kind === "expiring") {
    const daysAr =
      typeof days === "number"
        ? days === 1
          ? "أي بعد يوم واحد"
          : `أي بعد ${days} أيام`
        : "قريباً";
    const daysEn =
      typeof days === "number"
        ? `in ${days} day${days === 1 ? "" : "s"}`
        : "soon";

    return {
      subject:
        "رخصتك قاربت على الانتهاء — اكتشف عسير | Your License Is Expiring Soon — Discover Aseer",
      html: brandEmailShell({
        previewText: "رخصة الإرشاد السياحي الخاصة بك قاربت على الانتهاء",
        headlineAr: "رخصتك قاربت على الانتهاء",
        headlineEn: "Your License Is Expiring Soon",
        bodyArHtml: `
          <p style="margin:0 0 12px;">مرحبًا ${safeNameAr}،</p>
          <p style="margin:0 0 12px;">نود تذكيرك بأن رخصة الإرشاد السياحي الخاصة بك ستنتهي بتاريخ <strong>${safeDateAr}</strong>، ${daysAr}.</p>
          <p style="margin:0;">يرجى تجديد الرخصة وتحديث بياناتها عبر بوابة المرشدين؛ لضمان استمرار ظهور ملفك في منصة اكتشف عسير.</p>
        `,
        bodyEnHtml: `
          <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
          <p style="margin:0 0 12px;">This is a reminder that your tour guide license will expire on <strong>${safeDateEn}</strong>, ${daysEn}.</p>
          <p style="margin:0;">Please renew your license and update its details through the Tour Guide Portal to ensure your profile remains visible on the Discover Aseer platform.</p>
        `,
        ctaLabelAr: "فتح بوابة المرشدين",
        ctaLabelEn: "Open Tour Guide Portal",
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
        <p style="margin:0 0 12px;">نود إبلاغك بأن رخصة الإرشاد السياحي المسجّلة لدينا انتهت بتاريخ <strong>${safeDateAr}</strong>.</p>
        <p style="margin:0;">يرجى تجديد الرخصة وتحديث ملفك في بوابة المرشدين في أقرب وقت.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Your tour guide license on file expired on <strong>${safeDateEn}</strong>.</p>
        <p style="margin:0;">Please renew your license and update your portal profile as soon as possible.</p>
      `,
      ctaLabelAr: "تحديث الرخصة",
      ctaLabelEn: "Update license",
      ctaHref: portalUrl,
    }),
  };
}

export function buildPasswordResetEmail(options: {
  resetUrl: string;
}): { subject: string; html: string } {
  return {
    subject:
      "إعادة تعيين كلمة المرور — اكتشف عسير | Reset your password — Discover Aseer",
    html: brandEmailShell({
      previewText: "طلب إعادة تعيين كلمة المرور لحساب المرشد السياحي",
      headlineAr: "إعادة تعيين كلمة المرور",
      headlineEn: "Reset your password",
      bodyArHtml: `
        <p style="margin:0 0 12px;">لقد استلمنا طلباً لإعادة تعيين كلمة المرور لحسابك في بوابة المرشدين.</p>
        <p style="margin:0 0 12px;">إذا لم تطلب ذلك، يمكنك تجاهل هذه الرسالة بأمان.</p>
        <p style="margin:0;">اضغط على الزر أدناه لتعيين كلمة مرور جديدة. الرابط صالح لمدة <strong>15 دقيقة</strong> فقط.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">We received a request to reset the password for your tour guide portal account.</p>
        <p style="margin:0 0 12px;">If you didn’t request this, you can safely ignore this email.</p>
        <p style="margin:0;">Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.</p>
      `,
      ctaLabelAr: "تعيين كلمة مرور جديدة",
      ctaLabelEn: "Set new password",
      ctaHref: options.resetUrl,
    }),
  };
}
