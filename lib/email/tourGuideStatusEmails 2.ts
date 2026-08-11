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
        "تمت الموافقة على طلبك — اكتشف عسير | Application approved — Discover Aseer",
      html: brandEmailShell({
        previewText: "تمت الموافقة على طلبك كمرشد سياحي في اكتشف عسير",
        headlineAr: "تمت الموافقة على طلبك",
        headlineEn: "Your application was approved",
        bodyArHtml: `
          <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
          <p style="margin:0 0 12px;">يسعدنا إبلاغك بأنه تمت <strong>الموافقة</strong> على طلب انضمامك كمرشد سياحي في منصة اكتشف عسير، وأصبح ملفك منشوراً الآن.</p>
          <p style="margin:0;">يمكنك الدخول إلى بوابة المرشدين لمراجعة ملفك أو تحديث بياناتك في أي وقت.</p>
        `,
        bodyEnHtml: `
          <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
          <p style="margin:0 0 12px;">We’re happy to let you know your tour guide application on Discover Aseer has been <strong>approved</strong>, and your profile is now published.</p>
          <p style="margin:0;">You can sign in to the tour guide portal anytime to review or update your profile.</p>
        `,
        ctaLabelAr: "فتح بوابة المرشدين",
        ctaLabelEn: "Open portal",
        ctaHref: options.portalUrl,
      }),
    };
  }

  return {
    subject:
      "تم رفض طلبك — اكتشف عسير | Application rejected — Discover Aseer",
    html: brandEmailShell({
      previewText: "تم رفض طلبك كمرشد سياحي في اكتشف عسير",
      headlineAr: "تم رفض طلبك",
      headlineEn: "Your application was rejected",
      bodyArHtml: `
        <p style="margin:0 0 12px;">مرحباً ${safeNameAr}،</p>
        <p style="margin:0 0 12px;">نأسف لإبلاغك بأنه تم <strong>رفض</strong> طلب انضمامك كمرشد سياحي في منصة اكتشف عسير في الوقت الحالي.</p>
        <p style="margin:0;">يمكنك تحديث بياناتك وإعادة إرسال الطلب عبر بوابة المرشدين، أو التواصل مع فريق الدعم للمساعدة.</p>
      `,
      bodyEnHtml: `
        <p style="margin:0 0 12px;">Hello ${safeNameEn},</p>
        <p style="margin:0 0 12px;">We’re sorry to let you know your tour guide application on Discover Aseer was <strong>rejected</strong> at this time.</p>
        <p style="margin:0;">You can update your details and resubmit via the tour guide portal, or contact support for help.</p>
      `,
      ctaLabelAr: "فتح بوابة المرشدين",
      ctaLabelEn: "Open portal",
      ctaHref: options.portalUrl,
    }),
  };
}
