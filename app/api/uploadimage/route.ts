// app/api/vendor/uploadimages/route.ts
import { NextResponse } from "next/server";
import { uploadImages } from "@/lib/cloudinary";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images } = body;

    // Validate the number of images
    if (!images || images.length < 1 || images.length > 3) {
      return NextResponse.json(
        { error: "Please upload between 1 and 3 images" },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const imageUrls = await uploadImages(images);
    return NextResponse.json({ imageUrls }, { status: 200 });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}