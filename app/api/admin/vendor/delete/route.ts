import { NextResponse } from "next/server";
import Vendor from "@/models/Vendor";
import { connectToDatabase } from "@/lib/dbConnect";
// import { verifyAdmin } from "@/lib/verifyAdmin/auth";

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { vendorId } = await req.json();

    // Verify if the request is from an admin
    // const isAdmin = verifyAdmin(req);
    // if (!isAdmin) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    // }

    // Delete vendor
    await Vendor.findByIdAndDelete(vendorId);

    return NextResponse.json({ message: "Vendor deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
