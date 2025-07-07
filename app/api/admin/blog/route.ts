// /app/api/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Post from "@/models/Post";
import { verifyAdmin } from "@/lib/VerifyAdmin/auth";

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { title, slug, content, tags, imageUrl, author, metaDescription } = body;

    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    if (!title || !slug || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const exists = await Post.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const post = new Post({
      title,
      slug,
      content,
      tags,
      imageUrl,
      metaDescription,
      author,
      published: true,
    });
    await post.save();
    return NextResponse.json(post, { status: 201 });
  } catch {
    // console.error("Error in POST /api/admin/blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
