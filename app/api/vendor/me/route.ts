import { connectToDatabase } from "@/lib/dbConnect";
import { verifyVendor } from "@/lib/verifyVendor/auth";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";


export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const vendorId = await verifyVendor(req);

        if(!vendorId) {
            return NextResponse.json({message: "Unauthorized"}, {status: 403});
        }

        const vendor = await UserModel.findById(vendorId).select("-password");

        return NextResponse.json({message: "Vendor profile", vendor}, {status: 200});
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}