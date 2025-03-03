import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middlewares/verifytoken";
import { myDetails } from "@/controllers/auth.controllers";

export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return myDetails(req);
}
