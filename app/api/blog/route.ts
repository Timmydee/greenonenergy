// /app/api/blog/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Post from "@/models/Post";
// import { verifyAdmin } from "@/lib/VerifyAdmin/auth

export async function GET(req: Request) {
  await connectToDatabase();
  const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

