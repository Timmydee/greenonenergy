import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyAdmin } from "@/lib/VerifyAdmin/auth";

connectToDatabase();

// ✅ PATCH (Edit Product)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;

  try {
    const body = await req.json();
    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Find and update the product
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: body },
      { new: true } // Return the updated document
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE (Remove Product)

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;
  try {
    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Find and delete the product
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product", error },
      { status: 500 }
    );
  }
}
