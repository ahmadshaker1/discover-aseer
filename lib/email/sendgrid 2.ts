import sgMail from "@sendgrid/mail";

const FROM_EMAIL = "noreply@discoveraseer.com";

let configured = false;

function ensureSendGrid(): boolean {
  const key = process.env.SENDGRID_API_KEY?.trim();
  if (!key) return false;
  if (!configured) {
    sgMail.setApiKey(key);
    configured = true;
  }
  return true;
}

export function isSendGridConfigured(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY?.trim());
}

export async function sendBrandEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  if (!ensureSendGrid()) {
    throw new Error("SENDGRID_API_KEY is not configured.");
  }

  await sgMail.send({
    to: options.to.trim().toLowerCase(),
    from: FROM_EMAIL,
    subject: options.subject,
    html: options.html,
  });
}
