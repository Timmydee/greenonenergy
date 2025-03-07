import jwt from "jsonwebtoken";

export function verifyAdmin(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return false;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.isAdmin === true; // Only allow admin users
  } catch (error) {
    return false;
  }
}
