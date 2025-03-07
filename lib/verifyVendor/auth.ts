import jwt from "jsonwebtoken";

export function verifyVendor(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.vendorId; // Return the authenticated vendor's ID
  } catch (error) {
    return null;
  }
}
