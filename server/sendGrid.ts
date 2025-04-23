import { MailService } from '@sendgrid/mail';

// Initialize the SendGrid mail service
export const mailService = new MailService();

// Set the API key if it exists
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string; // Optional reply-to address
}

/**
 * Sends an email using the SendGrid API
 * @param params Email parameters including recipient, sender, subject, and content
 * @returns Promise<boolean> Success status of the email sending operation
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key is not set. Email sending is disabled.');
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
      replyTo: params.replyTo,
    });

    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}