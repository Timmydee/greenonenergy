import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { SignJWT } from "jose";

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

    // if(!user.isVerified) {
    //   return NextResponse.json( { message: "Please verify your email first" }, { status: 401 });
    // }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // // Generate JWT Token
    // const token = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.JWT_SECRET!,
    //   { expiresIn: "7d" }
    // );

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

    const token = await new SignJWT({ id: user._id.toString(), role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secretKey);

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { message: "Login successful", role: user.role },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax", // More relaxed for development
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
