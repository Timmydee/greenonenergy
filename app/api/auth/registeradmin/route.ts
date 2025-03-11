import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  return NextResponse.json({ token });
}
