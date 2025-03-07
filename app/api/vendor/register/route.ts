import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Vendor from "@/models/Vendor";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { companyName, email, password } = await req.json();

    // Check if the vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return NextResponse.json({ message: "Vendor already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      companyName,
      email,
      password: hashedPassword,
      isApproved: false, // Admin approval needed
    });

    await newVendor.save();
    return NextResponse.json({ message: "Vendor registered. Awaiting approval." }, { status: 201 });
  } catch (error) {
    console.error("Error registering vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}