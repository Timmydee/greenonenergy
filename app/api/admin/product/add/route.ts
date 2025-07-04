import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyAdmin } from "@/lib/VerifyAdmin/auth";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be greater than zero"),
  category: z.enum(["Inverter", "Solar Panel"]),
  imageUrls: z.array(z.string()).min(1, "At least one image is required"),
  capacity: z.string().optional(),
  wattage: z.string().optional(),
  companyInfo: z.object({
    companyName: z.string().nonempty("Company name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().nonempty("Phone number is required"),
    website: z.string().optional()
  })
});

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Verify Admin
    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Parse the request body
    const body = await req.json();
    const parsedBody = ProductSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const dummyVendorId = "64f00e72c88e4f19921d6e91";

    const {
      name,
      description,
      price,
      category,
      imageUrls,
      capacity,
      wattage,
      companyInfo
    } = parsedBody.data;

    // Validate conditional fields
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
      vendorId: dummyVendorId,
      postedBy: "admin", // Set postedBy as admin
      name,
      description,
      price,
      category,
      imageUrls,
      capacity: category === "Inverter" ? capacity : undefined,
      wattage: category === "Solar Panel" ? wattage : undefined,
      companyInfo
    });

    // Save the product to the database
    await product.save();

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
