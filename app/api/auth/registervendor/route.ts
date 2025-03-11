import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";

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

    // Create vendor user
    const vendor = new UserModel({
      name: companyName,  // You can modify this if needed
      companyName,
      email,
      password: hashedPassword,
      phone,
      role: "vendor",
      isApproved: false, // Requires admin approval
    });

    await vendor.save();
    return NextResponse.json({ message: "Vendor registered. Awaiting approval." }, { status: 201 });
  } catch (error) {
    console.error("Error registering vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
