import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import User from "@/models/User";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, phone } = await req.json();

    // Check if client already exists
    const existingClient = await UserModel.findOne({ email, role: "client" });
    if (existingClient) {
      return NextResponse.json({ message: "Client already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const client = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "client",
    });

    await client.save();

    return NextResponse.json({ message: "Client registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error registering client:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
