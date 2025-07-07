import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyAdmin } from "@/lib/VerifyAdmin/auth";

// GET Method
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const products = await Product.find({ postedBy: "admin" });

    return NextResponse.json({ message: "Products fetched", products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST Method (if needed)
export async function POST() {
  return NextResponse.json({ message: "POST endpoint working" });
}
