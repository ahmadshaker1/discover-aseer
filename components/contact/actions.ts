"use server";

import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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
    const msg = {
      to: ["info@discoveraseer.com"],
      from: "noreply@discoveraseer.com",
      subject: `New Contact Us Submission - ${data.name}`,
      text: `
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Are you from Aseer?: ${data.fromAseer ? "Yes" : "No"}

Description:
${data.description}
      `,
      html: `
        <h3>New Contact Us Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Are you from Aseer?:</strong> ${data.fromAseer ? "Yes" : "No"}</p>
        <br/>
        <p><strong>Description:</strong></p>
        <p>${data.description.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact us email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
