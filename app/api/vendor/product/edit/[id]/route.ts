import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
// export async function PUT(req: Request, context: { params: { id: string } }) {
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = context.params;
    // const { id } = params;
    const { name, description, price, category, imageUrls } = await req.json();

    // Verify vendor authentication
    const vendorId = verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Ensure vendor owns the product
    if (product.vendorId.toString() !== vendorId) {
      return NextResponse.json(
        { message: "You can only edit your own products" },
        { status: 403 }
      );
    }

    // Validate image count
    if (
      !Array.isArray(imageUrls) ||
      imageUrls.length < 1 ||
      imageUrls.length > 3
    ) {
      return NextResponse.json(
        { message: "You must upload between 1 and 3 images." },
        { status: 400 }
      );
    }

    // Update the product
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imageUrls = imageUrls || product.imageUrls;

    await product.save();

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
