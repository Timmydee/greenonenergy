// // /app/api/blog/[slug]/route.ts
// import { NextResponse } from "next/server";
// import Post from "@/models/Post";
// import { connectToDatabase } from "@/lib/dbConnect";

// export async function GET(req: Request, { params }: { params: { slug: string } }) {
//   await connectToDatabase();

//   try {
//     const post = await Post.findOne({ slug: params.slug, published: true });
//     if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

//     return NextResponse.json(post);
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
//   }
// }


// app/api/blog/[slug]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import Post from '@/models/Post';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await connectToDatabase();
  const post = await Post.findOne({ slug: params.slug, published: true });

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
