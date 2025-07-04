import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import sendVerificationEmail from "@/lib/sendMail";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { companyName, email, password, phone } = await req.json();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create vendor user
    const vendor = new UserModel({
      name: companyName, 
      companyName,
      email,
      password: hashedPassword,
      phone,
      role: "vendor",
      isApproved: false,
      isVerified: false,
      verificationToken,
    });

    await vendor.save();
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyemail?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationUrl);

    return NextResponse.json({ message: "Vendorregister registered. Please verify your email." }, { status: 201 });
  } catch (error) {
    console.error("Error registering vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
