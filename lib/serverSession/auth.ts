// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";

// export async function getServerSession(req: Request) {
//   try {
//     const cookieStore = await cookies();

//     const token =
//       cookieStore.get("authToken")?.value ||
//       cookieStore.get("next-auth.session-token")?.value;

//     console.log("Extracted Token:", token);

//     if (!token) return null;

//     const secretKey = new TextEncoder().encode(
//       cookieStore.get("authToken") ? process.env.JWT_SECRET! : process.env.NEXTAUTH_SECRET!
//     );

//     const { payload } = await jwtVerify(token, secretKey);

//     return { user: payload as { id: string; role: "admin" | "vendor" | "client" } };
//   } catch (error) {
//     console.error("Session Error:", error);
//     return null;
//   }
// }


import { cookies } from "next/headers";
import { jwtVerify, jwtDecrypt } from "jose";

export async function getServerSession() {
  try {
    const cookieStore = await cookies();

    // Extract the token (either custom JWT or NextAuth.js session token)
    const token =
      cookieStore.get("authToken")?.value ||
      cookieStore.get("next-auth.session-token")?.value;

    console.log("Extracted Token:", token);

    if (!token) {
      console.log("No token found");
      return null;
    }

    let payload: Record<string, unknown>;

    // Determine which secret to use based on the token source
    if (cookieStore.get("authToken")) {
      // Verify custom JWT (JWS)
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload: decodedPayload } = await jwtVerify(token, secretKey);
      payload = decodedPayload;
    } else {
      // Decrypt NextAuth.js JWE
      const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
      const { payload: decryptedPayload } = await jwtDecrypt(token, secretKey);
      payload = decryptedPayload;
    }

    console.log("Decoded Payload:", payload);

    // Return the session data
    return { user: payload as { id: string; role: "admin" | "vendor" | "client" } };
  } catch (error) {
    console.error("Session Error:", error);
    return null;
  }
}