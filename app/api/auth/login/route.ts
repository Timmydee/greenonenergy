// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Vendor from "@/models/Vendor";
// import { connectToDatabase } from "@/lib/dbConnect";

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const { email, password } = await req.json();

//     // Check if the vendor exists
//     const vendor = await Vendor.findOne({ email });
//     if (!vendor) {
//       return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
//     }

//     // Check if the vendor is approved
//     if (!vendor.isApproved) {
//       return NextResponse.json({ message: "Vendor not approved by admin" }, { status: 403 });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ id: vendor._id, email: vendor.email }, process.env.JWT_SECRET!, {
//       expiresIn: "7d",
//     });

//     // return NextResponse.json({ token, message: "Login successful" }, { status: 200 });

//     // Create response with success message
//     const response = NextResponse.json(
//       { message: "Login successful" },
//       { status: 200 }
//     );

//     // Set the authToken cookie in the response with HTTP-only flag
//     response.cookies.set("authToken", token, {
//       httpOnly: true, // Prevents JavaScript from accessing the cookie
//       secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development",
//       sameSite: "strict", // Prevents cross-site request forgery (CSRF)
//       path: "/", // Available on all paths in the app
//       maxAge: 60 * 60 * 24 * 7, // 7 days expiration
//     });

//     return response;

//   } catch (error) {
//     console.error("Error logging in vendor:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { message: "Login successful", role: user.role },
      { status: 200 }
    );

    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      path: "/", // Available for all routes
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;

    // return NextResponse.json({ message: "Login successful", token, role: user.role }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
