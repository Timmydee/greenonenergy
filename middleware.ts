import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define UserToken type for better TypeScript support
interface UserToken extends JwtPayload {
  id: string;
  role: "admin" | "vendor" | "user";
}

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Get JWT from HTTP-only cookie

  if (!token) {
    return NextResponse.json({ message: "Unauthorized. No token found." }, { status: 401 });
  }

  try {
    // Verify JWT token and cast it as UserToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserToken;

    if (!decoded.role) {
      return NextResponse.json({ message: "Invalid token data" }, { status: 401 });
    }

    // Determine the required role for this route
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/api/admin") && decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden. Admin access only." }, { status: 403 });
    }

    if (pathname.startsWith("/api/vendor") && decoded.role !== "vendor") {
      return NextResponse.json({ message: "Forbidden. Vendor access only." }, { status: 403 });
    }

    // Attach user ID and role to request headers (optional)
    req.headers.set("X-User-Id", decoded.id);
    req.headers.set("X-User-Role", decoded.role);

    return NextResponse.next(); // Allow request to proceed
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

// Apply middleware only to protected API routes
export const config = {
  matcher: ["/api/admin/:path*", "/api/vendor/:path*"], // Add protected routes
};
