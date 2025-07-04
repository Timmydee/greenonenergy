// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;

// utils/cloudinary.ts

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async (images: string[]) => {
  try {
    const uploadPromises = images.map((image) =>
      cloudinary.uploader.upload(image, {
        folder: "products", 
      })
    );
    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.secure_url); // Return array of uploaded image URLs
  } catch (error) {
    throw new Error("Image upload failed");
  }
};
