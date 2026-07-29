"use server";

import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export type ExperienceSubmitResponse = {
  success: boolean;
  message?: string;
};

export async function submitExperienceForm(
  formData: FormData,
): Promise<ExperienceSubmitResponse> {
  try {
    const data: Record<string, any> = {};
    const attachments: any[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // If it's a file, we could potentially convert it to base64 and attach it
        // but for now we just record its name to avoid SendGrid size limits (30MB max)
        // If the user wants attachments, we can enable this.
        if (value.size > 0) {
          data[key] = (data[key] ? data[key] + ", " : "") + value.name;

          // Optional: attach files. Be careful with size limits.
          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({
            content: buffer.toString("base64"),
            filename: value.name,
            type: value.type || "application/octet-stream",
            disposition: "attachment",
          });
        }
      } else {
        data[key] = value;
      }
    }

    const htmlContent = `
      <h3>New Experience/Event Submission</h3>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        ${Object.entries(data)
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="font-weight:bold;">${k}</td>
                 <td>${v}</td>
               </tr>`,
          )
          .join("")}
      </table>
    `;

    const textContent = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const msg = {
      to: ["aseercalendar@asda.gov.sa", "m.batais@aqwas.sa"],
      from: "noreply@discoveraseer.com",
      subject: `New Event/Experience Submission - ${data.titleEn || data.titleAr || "Unknown"}`,
      text: textContent,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending experience submit email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
