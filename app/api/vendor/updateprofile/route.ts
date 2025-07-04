// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/dbConnect";
// import { verifyVendor } from "@/lib/verifyVendor/auth";
// import UserModel from "@/models/User";

// export async function PUT(req: Request) {
//   try {
//     await connectToDatabase();
//     const { phone, whatsapp, website, email } = await req.json();

//     // Verify vendor authentication
//     const vendorId = verifyVendor(req);
//     if (!vendorId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//     }

//     // Update vendor profile
//     const updatedVendor = await UserModel.findByIdAndUpdate(
//       vendorId,
//       {
//         email,
//         whatsapp,
//         website,
//         phone,
//       },
//       { new: true }
//     ).select("-password");

//     return NextResponse.json(
//       { message: "Profile updated", vendor: updatedVendor },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";
import UserModel from "@/models/User";
import { z } from "zod";

// Define validation schema
const profileSchema = z.object({
  phone: z.string().min(10).max(15).optional(),
  whatsapp: z.string().min(10).max(15).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
});

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validate the request body
    const validation = profileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validation.error.errors },
        { status: 400 }
      );
    }

    // Verify vendor authentication
    const vendorId = await verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Check if vendor exists
    const vendor = await UserModel.findById(vendorId);
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    // Update vendor profile
    const updatedVendor = await UserModel.findByIdAndUpdate(
      vendorId,
      { $set: validation.data },
      { new: true, select: "-password" }
    );

    return NextResponse.json(
      { message: "Profile updated", vendor: updatedVendor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
