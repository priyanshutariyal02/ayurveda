import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching user details",
      error: (error as Error).message,
    });
  }
}
