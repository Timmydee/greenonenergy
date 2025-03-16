import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    connectToDatabase();
    const { name, email, password, phone } = await req.json();

    const adminExist = await UserModel.findOne({email, role: "admin"});
    if(adminExist) {
      return NextResponse.json({message: "Admin already exists"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin"
    })

    await admin.save();

    return NextResponse.json({message: "Admin registered successfully"}, {status: 201});

  } catch (error) {
    console.error("Error registering admin:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}