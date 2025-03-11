import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

  // Remove the 'authToken' cookie by setting its maxAge to 0 and path to '/'
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire the cookie
  });

  return response;
}
