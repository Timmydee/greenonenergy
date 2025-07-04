// app/api/blog/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Post from "@/models/Post";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Dynamic imports
    const { connectToDatabase } = await import("@/lib/dbConnect");
    const Post = (await import("@/models/Post")).default;
    
    await connectToDatabase();
    const { slug } = await params;
    const post = await Post.findOne({ slug: slug, published: true });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}