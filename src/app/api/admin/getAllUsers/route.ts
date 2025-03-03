import { isAdmin, verifyToken } from "@/middlewares/verifytoken";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  try {
    const users = await User.find().select("-password");

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching users",
      error: (error as Error).message,
    });
  }
}


