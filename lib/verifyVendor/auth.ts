import { jwtVerify } from "jose";
import * as cookie from "cookie";

export async function verifyVendor(req: Request) {
  try {
    // Parse cookies from the request header
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.authToken;

    if (!token) {
      // console.log("No token provided");
      return null;
    }
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, secretKey);


    return (payload as { id: string }).id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
