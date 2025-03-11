import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { productId } = await req.json();

    // Verify vendor authentication
    const vendorId = verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Delete product
    const product = await Product.findOneAndDelete({ _id: productId, vendorId });

    if (!product) {
      return NextResponse.json({ message: "Product not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
