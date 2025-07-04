import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email: string, verificationUrl: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"GreenOn Energy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h3>Verify Your Email</h3>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationUrl}" style="display:inline-block;padding:10px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">Verify Email</a>
      <p>If you didn’t request this, please ignore this email.</p>
    `,
  });
}
