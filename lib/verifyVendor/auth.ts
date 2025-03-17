import { jwtVerify } from "jose";
import * as cookie from "cookie";
import mongoose from "mongoose";

export async function verifyVendor(req: Request) {
  try {
    // Parse cookies from the request header
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.authToken;

    if (!token) {
      // console.log("No token provided");
      return null;
    }
    // console.log("Token Received:", token);

    // Convert secret to Uint8Array
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Verify the JWT token
    const { payload } = await jwtVerify(token, secretKey);

    // console.log("Decoded Token:", payload);

    // const vendorId = (payload as { id: string }).id;

        // Validate the vendorId
        // if (!mongoose.Types.ObjectId.isValid(vendorId)) {
        //     console.error("Invalid vendor ID in token:", vendorId);
        //     return null;
        // }


    return (payload as { id: string }).id; // Return vendor ID or any other data you stored in the token
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
