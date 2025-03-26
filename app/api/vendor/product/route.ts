import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Verify vendor authentication
    const vendorId = await verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Fetch all products for the authenticated vendor
    const products = await Product.find({ vendorId });

    return NextResponse.json({ message: "Products fetched", products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
