import jwt from "jsonwebtoken";

export function verifyVendor(req: Request) {
  try {
    // Get the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided or invalid format");
      return null;
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded Token:", decoded);

    return (decoded as { id: string }).id; // Return vendor ID
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
