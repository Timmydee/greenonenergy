// 📁 /lib/mailer.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, text, html, attachments }: any) => {
  await transporter.sendMail({
    from: `GreenOn Energy <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
    attachments,
  });
};
