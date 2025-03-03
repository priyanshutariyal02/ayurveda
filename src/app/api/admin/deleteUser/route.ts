import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error deleting user",
      error: (error as Error).message,
    });
  }
}
