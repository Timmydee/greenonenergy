// /app/api/blog/[id]/route.ts
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/dbConnect";
import { verifyAdmin } from "@/lib/VerifyAdmin/auth";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch post" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = await params;

  try {
    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const updated = await Post.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const adminId = await verifyAdmin(req);
    if (!adminId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
