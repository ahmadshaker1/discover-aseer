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
      "أكّد بريدك الإلكتروني — اكتشف عسير | Verify your email — Discover Aseer",
    html: brandEmailShell({
      previewText: "أكد بريدك الإلكتروني لإكمال تسجيل حساب المرشد السياحي",
      headlineAr: "أكّد بريدك الإلكتروني",
      headlineEn: "Verify your email address",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">تم إنشاء حسابك في بوابة المرشدين. للمتابعة، يرجى <strong>تأكيد أن هذا البريد ملكك</strong> بالضغط على الزر أدناه.</p>
        <p style="margin:0;">بعد التأكيد ستتمكن من تسجيل الدخول وإكمال ملفك. رابط التأكيد صالح لمدة 48 ساعة.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">Your tour guide portal account was created. To continue, please <strong>confirm you own this email</strong> by clicking the button below.</p>
        <p style="margin:0;">After verifying, you can sign in and complete your profile. This link expires in 48 hours.</p>
      `,
      ctaLabelAr: "تأكيد البريد",
      ctaLabelEn: "Verify email",
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
