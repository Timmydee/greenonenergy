import { NextResponse } from "next/server";
import Vendor from "@/models/Vendor";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";

export async function PUT(req: Request) {
  console.log("API Route Hit: /api/vendors/update");
  try {
    await connectToDatabase();
    const { phone, whatsapp, website, email } = await req.json();

    // Verify vendor authentication
    const vendorId = verifyVendor(req);
    if (!vendorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Update vendor profile
    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        email,
        contact: { phone, whatsapp, website },
      },
      { new: true }
    ).select("-password");

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
