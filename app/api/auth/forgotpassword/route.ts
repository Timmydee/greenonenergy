import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token expiration (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    // Send email
    const resetUrl = `https://localhost:3000/auth/resetpassword?token=${resetToken}`;
    await sendResetEmail(user.email, resetUrl);

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Function to send email
async function sendResetEmail(email: string, resetUrl: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
}
