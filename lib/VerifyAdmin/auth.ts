import { jwtVerify } from "jose";
import * as cookie from "cookie";

export async function verifyAdmin(req: Request) {
  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "")
    const token = cookies.authToken

    if(!token) {
      return null
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!)

    const {payload} = await jwtVerify(token, secretKey)
    return (payload as { id: string }).id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

