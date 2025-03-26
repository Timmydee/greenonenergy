// app/api/vendor/product/add/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase()

    // Parse the request body
    const body = await req.json();
    const { name, description, price, category, imageUrls } = body;

    const vendorId = await verifyVendor(req)

    if(!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Validate required fields
    if (!name || !description || !price || !category || !imageUrls) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new product
    const product = new Product({
      vendorId,
      name,
      description,
      price,
      category,
      imageUrls,
    });

    // Save the product to the database
    await product.save();

    // Return success response
    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}