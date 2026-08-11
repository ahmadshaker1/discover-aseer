"use server";

import { brandEmailShell, escapeHtml } from "@/lib/email/brandEmailShell";
import { sendBrandEmail } from "@/lib/email/sendgrid";

export type ContactUsSubmitResponse = {
  success: boolean;
  message?: string;
};

export async function submitContactUsForm(data: {
  name: string;
  phone: string;
  email: string;
  fromAseer: boolean | null;
  description: string;
}): Promise<ContactUsSubmitResponse> {
  try {
    const safeName = escapeHtml(data.name);
    const safePhone = escapeHtml(data.phone);
    const safeEmail = escapeHtml(data.email);
    const fromAseer = data.fromAseer ? "Yes" : "No";
    const safeDescription = escapeHtml(data.description).replace(
      /\n/g,
      "<br/>",
    );

    const detailsHtml = `
      <p style="margin:0 0 8px;"><strong>الاسم / Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px;"><strong>الهاتف / Phone:</strong> ${safePhone}</p>
      <p style="margin:0 0 8px;"><strong>البريد / Email:</strong> ${safeEmail}</p>
      <p style="margin:0 0 8px;"><strong>من عسير؟ / From Aseer?:</strong> ${fromAseer}</p>
      <p style="margin:16px 0 8px;"><strong>الرسالة / Message:</strong></p>
      <p style="margin:0;">${safeDescription}</p>
    `;

    const html = brandEmailShell({
      previewText: `New contact form: ${data.name}`,
      headlineAr: "رسالة تواصل جديدة",
      headlineEn: "New contact us submission",
      bodyArHtml: detailsHtml,
      bodyEnHtml: detailsHtml,
    });

    await sendBrandEmail({
      to: "info@discoveraseer.com",
      subject: `New Contact Us Submission - ${data.name}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending contact us email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
