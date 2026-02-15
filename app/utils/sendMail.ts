import nodemailer from "nodemailer";

// Define the structure of the email data
interface EmailData {
  to: string;
  name: string;
  email: string;
  query: string;
}

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send an email
export async function sendEmail(data: EmailData): Promise<void> {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.to,
    subject: "New Contact Form Submission",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background-color: #0f172a; border-radius: 8px;">
        <p style="margin: 0 0 20px; font-size: 16px; color: #ffffff; font-weight: 600;">New message from your website</p>
        <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <p style="margin: 0 0 12px; font-size: 14px; color: #94a3b8;"><strong style="color: #ffffff;">Name:</strong> <span style="color: #e2e8f0;">${data.name}</span></p>
          <p style="margin: 0 0 12px; font-size: 14px; color: #94a3b8;"><strong style="color: #ffffff;">Email:</strong> <a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a></p>
          <p style="margin: 0; font-size: 14px; color: #94a3b8;"><strong style="color: #ffffff;">Message:</strong> <span style="color: #e2e8f0;">${data.query}</span></p>
        </div>
        <p style="margin: 0; font-size: 11px; color: #64748b;">Sent from your contact form</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message);
    } else {
      console.error("❌ Unknown error occurred while sending email.");
    }
  }
}
