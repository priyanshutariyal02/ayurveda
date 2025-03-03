import { isAdmin, verifyToken } from "@/middlewares/verifytoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Replace with real stats fetching logic
  return NextResponse.json({ message: "Dashboard stats", stats: {} });
}
