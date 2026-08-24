import {
  brandEmailShell,
  escapeHtml,
} from "@/lib/email/brandEmailShell";

export type TourGuideStatusEmailKind = "published" | "rejected";

export function buildTourGuideStatusEmail(options: {
  kind: TourGuideStatusEmailKind;
  nameAr?: string | null;
  nameEn?: string | null;
  portalUrl: string;
}): { subject: string; html: string } {
  const nameAr = (options.nameAr || options.nameEn || "المرشد السياحي").trim();
  const nameEn = (options.nameEn || options.nameAr || "Tour guide").trim();
  const safeNameAr = escapeHtml(nameAr);
  const safeNameEn = escapeHtml(nameEn);

  if (options.kind === "published") {
    return {
      subject:
        "تم قبول طلبك — اكتشف عسير | Your Application Has Been Approved — Discover Aseer",
      html: brandEmailShell({
        previewText: "تم قبول طلب انضمامك مرشداً سياحياً إلى منصة اكتشف عسير",
        headlineAr: "تم قبول طلبك",
        headlineEn: "Your Application Has Been Approved",
        bodyArHtml: `
          <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
          <p style="margin:0 0 12px;">يسرّنا إبلاغك بقبول طلب انضمامك مرشداً سياحياً إلى منصة اكتشف عسير، وتفعيل ملفك الشخصي بنجاح.</p>
          <p style="margin:0;">يمكنك الآن إدارة ملفك وتحديث بياناتك عبر بوابة المرشدين.</p>
        `,
        bodyEnHtml: `
          <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
          <p style="margin:0 0 12px;">We’re pleased to inform you that your application to join the Discover Aseer platform as a tour guide has been approved, and your profile has been successfully activated.</p>
          <p style="margin:0;">You can now manage your profile and update your information through the Tour Guide Portal.</p>
        `,
        ctaLabelAr: "فتح بوابة المرشدين",
        ctaLabelEn: "Open Tour Guide Portal",
        ctaHref: options.portalUrl,
      }),
    };
  }

  return {
    subject:
      "تم رفض طلبك — اكتشف عسير | Your Application Has Been Rejected — Discover Aseer",
    html: brandEmailShell({
      previewText: "تم رفض طلب انضمامك مرشداً سياحياً إلى منصة اكتشف عسير",
      headlineAr: "تم رفض طلبك",
      headlineEn: "Your Application Has Been Rejected",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحبًا ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">نأسف لإبلاغك برفض طلب انضمامك مرشداً سياحياً إلى منصة اكتشف عسير.</p>
        <p style="margin:0;">يمكنك تحديث بياناتك وإعادة تقديم الطلب عبر بوابة المرشدين، أو التواصل مع فريق الدعم للمساعدة.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">We regret to inform you that your application to join the Discover Aseer platform as a tour guide has been rejected.</p>
        <p style="margin:0;">You can update your information and resubmit your application through the Tour Guide Portal, or contact our support team for assistance.</p>
      `,
      ctaLabelAr: "فتح بوابة المرشدين",
      ctaLabelEn: "Open Tour Guide Portal",
      ctaHref: options.portalUrl,
    }),
  };
}
