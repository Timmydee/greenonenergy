import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "@/models/Vendor";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Check if the vendor exists
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    // Check if the vendor is approved
    if (!vendor.isApproved) {
      return NextResponse.json({ message: "Vendor not approved by admin" }, { status: 403 });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: vendor._id, email: vendor.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging in vendor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { Jwt } from "jsonwebtoken";
// import Vendor from "@/models/Vendor";
// import { connectToDatabase } from "@/lib/dbConnect";



// export async function POST(req: Request) {
//     try {
//         await connectToDatabase()

//         const {email, password} = await req.json()

//         const vendor = await Vendor.findOne({email})
//         if(!vendor) {
//             return NextResponse({message: "Vendor not found"}, {status: 404})
//         }

//         if(!vendor.isApproved) {
//             return NextResponse({message: "Vendor not approved yet"}, {status: 403})
//         }

//         const isMatch = await bcrypt.compare(password, vendor.password)
//         if(!isMatch) {
//             return NextResponse.json({message: "Invalid Credentials"}, {status: 401})
//         }

//         const token = jwt.sign({id: vendor_id, email: vendor.email}, process.env.JWT_SECRET!, {
//             expiresIn: '7d'
//         })



//     } catch (error) {
        
//     }
// }