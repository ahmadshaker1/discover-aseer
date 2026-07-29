import { brandPrimary } from "@/lib/theme/palette";

const LOGO_URL =
  "https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg";

export type TourGuideStatusEmailKind = "published" | "rejected";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function brandEmailShell(options: {
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
      subject: "تمت الموافقة على طلبك — اكتشف عسير | Application approved — Discover Aseer",
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
    subject: "تم رفض طلبك — اكتشف عسير | Application rejected — Discover Aseer",
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
