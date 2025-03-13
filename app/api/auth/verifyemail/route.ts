import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Invalid or missing token" }, { status: 400 });
    }

    // Find user with the token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json({ message: "Email successfully verified!" }, { status: 200 });
  } catch (error) {
    console.error("Error in email verification:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
