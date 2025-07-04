import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/serverSession/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(req);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
