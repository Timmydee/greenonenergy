import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { token, newPassword } = await req.json();

    // Hash token to match stored hash
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with matching token
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in reset password:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
