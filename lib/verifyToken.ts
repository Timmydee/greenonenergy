import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Returns { id, role }
  } catch (error) {
    return null; // Invalid token
  }
}
