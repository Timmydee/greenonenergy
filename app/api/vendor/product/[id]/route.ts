import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

  export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {

  try {
    await connectToDatabase();
    const id = (await params).id


    const vendorId = await verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { name, description, price, category, imageUrls, capacity, wattage } = await req.json();

    const product = await Product.findOne({ _id: id, vendorId });

    if (!product) {
      return NextResponse.json({ message: "Product not found or unauthorized" }, { status: 404 });
    }

    if (imageUrls && (!Array.isArray(imageUrls) || imageUrls.length < 1 || imageUrls.length > 3)) {
      return NextResponse.json({ message: "You must upload between 1 and 3 images." }, { status: 400 });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (imageUrls) product.imageUrls = imageUrls;
    if (capacity) product.capacity = capacity;
    if (wattage) product.wattage = wattage;

    await product.save();

    return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



   export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      await connectToDatabase();
  
      const id = (await params).id
      if (!id) {
        return NextResponse.json({ message: "Product ID is required." }, { status: 400 });
      }
  
      const vendorId = await verifyVendor(req);
      if (!vendorId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }
  
      // Ensure ID is a valid ObjectId
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
    //   }
  
      // Find the product
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ message: "Product not found." }, { status: 404 });
      }
  
      if (product.vendorId.toString() !== vendorId) {
        return NextResponse.json({ message: "Unauthorized to delete this product." }, { status: 403 });
      }
  
      await Product.deleteOne({ _id: id });
  
      return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }