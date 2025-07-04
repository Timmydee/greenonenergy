import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define UserToken type
interface UserToken {
  id: string;
  role: "admin" | "vendor" | "user";
}

export async function middleware(req: NextRequest) {
  console.log("Cookies in middleware:", req.cookies.getAll());

  // Public routes that should NOT require authentication
  const publicRoutes = ["/api/auth/login", "/api/auth/register", "api/uploadimage"];

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    console.log("Skipping auth for public route:", req.nextUrl.pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  console.log("Extracted Token:", token);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized. No token found." }, { status: 401 });
  }

  try {
    // Convert secret to Uint8Array for jose verification
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secretKey);

    if (!payload.role) {
      return NextResponse.json({ message: "Invalid token data" }, { status: 401 });
    }

    // Role-based access control
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/api/admin") && payload.role !== "admin") {
      return NextResponse.json({ message: "Forbidden. Admin access only." }, { status: 403 });
    }

    if (pathname.startsWith("/api/vendor") && payload.role !== "vendor") {
      return NextResponse.json({ message: "Forbidden. Vendor access only." }, { status: 403 });
    }

    // Allow request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

// Apply middleware only to protected API routes
export const config = {
  matcher: ["/api/admin/:path*", "/api/vendor/:path*"],
};
