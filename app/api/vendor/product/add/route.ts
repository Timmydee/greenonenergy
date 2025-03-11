import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, description, price, category, imageUrls } = await req.json();

    // Verify vendor authentication
    const vendorId = verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Validate image count
    if (!Array.isArray(imageUrls) || imageUrls.length < 1 || imageUrls.length > 3) {
      return NextResponse.json({ message: "You must upload between 1 and 3 images." }, { status: 400 });
    }

    // Create product
    const product = await Product.create({ vendorId, name, description, price, category, imageUrls });

    return NextResponse.json({ message: "Product added", product }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
