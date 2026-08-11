"use server";

import { brandEmailShell, escapeHtml } from "@/lib/email/brandEmailShell";
import { isSendGridConfigured, sendBrandEmail } from "@/lib/email/sendgrid";
import sgMail from "@sendgrid/mail";

export type ExperienceSubmitResponse = {
  success: boolean;
  message?: string;
};

export async function submitExperienceForm(
  formData: FormData,
): Promise<ExperienceSubmitResponse> {
  try {
    if (!isSendGridConfigured()) {
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    const data: Record<string, string> = {};
    const attachments: {
      content: string;
      filename: string;
      type: string;
      disposition: string;
    }[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) {
          data[key] = (data[key] ? data[key] + ", " : "") + value.name;

          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({
            content: buffer.toString("base64"),
            filename: value.name,
            type: value.type || "application/octet-stream",
            disposition: "attachment",
          });
        }
      } else {
        data[key] = String(value);
      }
    }

    const rowsHtml = Object.entries(data)
      .map(
        ([k, v]) =>
          `<tr>
             <td style="padding:8px 10px;border:1px solid #E4E4E4;font-weight:700;vertical-align:top;">${escapeHtml(k)}</td>
             <td style="padding:8px 10px;border:1px solid #E4E4E4;vertical-align:top;">${escapeHtml(v)}</td>
           </tr>`,
      )
      .join("");

    const detailsHtml = `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;">
        ${rowsHtml}
      </table>
    `;

    const html = brandEmailShell({
      previewText: "New experience/event submission",
      headlineAr: "إرسال تجربة / فعالية جديدة",
      headlineEn: "New experience/event submission",
      bodyArHtml: detailsHtml,
      bodyEnHtml: detailsHtml,
    });

    const subject = `New Event/Experience Submission - ${data.titleEn || data.titleAr || "Unknown"}`;

    if (attachments.length > 0) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!.trim());
      await sgMail.send({
        to: "aseercalendar@asda.gov.sa",
        from: "noreply@discoveraseer.com",
        subject,
        html,
        attachments,
      });
    } else {
      await sendBrandEmail({
        to: "aseercalendar@asda.gov.sa",
        subject,
        html,
      });
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Error sending experience submit email:", error);
    const sgErr = error as { response?: { body?: unknown } };
    if (sgErr.response) {
      console.error(sgErr.response.body);
    }
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
