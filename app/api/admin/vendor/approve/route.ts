import { NextResponse } from "next/server";
import Vendor from "@/models/Vendor";
import { connectToDatabase } from "@/lib/dbConnect";
// import { verifyAdmin } from "@/lib/verifyAdmin/auth";
import UserModel from "@/models/User";

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { vendorId } = await req.json();

    // Verify if the request is from an admin
    // const isAdmin = verifyAdmin(req);
    // if (!isAdmin) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    // }

    // Find and update vendor approval status
    const vendor = await UserModel.findByIdAndUpdate(vendorId, {isApproved: true}, {new: true});
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    // vendor.isApproved = true;
    await vendor.save();

    return NextResponse.json({ message: "Vendor approved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error approving vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
