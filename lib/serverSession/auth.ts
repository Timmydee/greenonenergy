// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function getServerSession(req: Request) {
//   try {
//     const cookieStore = cookies();
//     const token = (await cookieStore).get("authToken")?.value;

//     if (!token) return null;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//       role: "admin" | "vendor" | "client";
//     };

//     return { user: decoded };
//   } catch (error) {
//     console.error("Session Error:", error);
//     return null;
//   }
// }


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getServerSession(req: Request) {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("authToken")?.value ||
      cookieStore.get("next-auth.session-token")?.value;

      console.log("token", token);

    if (!token) return null;

    const secret =
      cookieStore.get("authToken") ? process.env.JWT_SECRET! : process.env.NEXTAUTH_SECRET!;

    const decoded = jwt.verify(token, secret) as {
      id: string;
      role: "admin" | "vendor" | "client";
    };

    return { user: decoded };
  } catch (error) {
    console.error("Session Error:", error);
    return null;
  }
}
