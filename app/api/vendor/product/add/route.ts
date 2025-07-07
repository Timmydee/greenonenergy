// app/api/vendor/product/add/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be greater than zero"),
  category: z.enum(["Inverter", "Solar Panel"]),
  imageUrls: z.array(z.string()).min(1, "At least one image is required"),
  capacity: z.string().optional(),
  wattage: z.string().optional(),
});


export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const body = await req.json();
    // const { name, description, price, category, imageUrls } = body;

    const vendorId = await verifyVendor(req)

    if(!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const parsedBody = ProductSchema.safeParse(body)
    if(!parsedBody.success) {
      return NextResponse.json({ message: parsedBody.error.flatten().fieldErrors}, {status: 400})
    }

    const { name, description, price, category, imageUrls, capacity, wattage } = parsedBody.data;
 
    if (category === "Inverter" && !capacity) {
      return NextResponse.json(
        { error: "Capacity is required for Inverter" },
        { status: 400 }
      );
    }

    if (category === "Solar Panel" && !wattage) {
      return NextResponse.json(
        { error: "Wattage is required for Solar Panel" },
        { status: 400 }
      );
    }

    // Create a new product
    const product = new Product({
      vendorId,
      postedBy: "vendor",
      name,
      description,
      price,
      category,
      imageUrls,
      capacity: category === "Inverter" ? capacity : undefined,
      wattage: category === "Solar Panel" ? wattage : undefined,
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
      { error: "Failed to add product", details: (error as Error).message },
      { status: 500 }
    );
  }
}