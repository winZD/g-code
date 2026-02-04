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
    subject: "👋 Hello from Node.js 🚀",
    text: `
      You have a new contact form submission!

      Name: ${data.name}
      Email: ${data.email}
      Query: ${data.query}
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
