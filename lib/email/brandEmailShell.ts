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

export type BrandEmailShellOptions = {
  previewText: string;
  headlineAr: string;
  headlineEn: string;
  bodyArHtml: string;
  bodyEnHtml: string;
  ctaLabelAr?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
};

/** Shared Discover Aseer branded HTML shell (purple primary / deep purple headings). */
export function brandEmailShell(options: BrandEmailShellOptions): string {
  const primary = brandPrimary;
  const hasCta =
    Boolean(options.ctaHref?.trim()) &&
    Boolean(options.ctaLabelAr?.trim() || options.ctaLabelEn?.trim());

  const ctaLabelAr = (options.ctaLabelAr || "").trim();
  const ctaLabelEn = (options.ctaLabelEn || "").trim();
  const ctaLabel =
    ctaLabelAr && ctaLabelEn
      ? `${escapeHtml(ctaLabelAr)} · ${escapeHtml(ctaLabelEn)}`
      : escapeHtml(ctaLabelAr || ctaLabelEn);

  const ctaHtml = hasCta
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 8px;">
                <tr>
                  <td align="center" style="border-radius:999px;background:${primary};">
                    <a href="${escapeHtml(options.ctaHref!.trim())}" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;">
                      ${ctaLabel}
                    </a>
                  </td>
                </tr>
              </table>`
    : "";

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
              ${ctaHtml}
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
