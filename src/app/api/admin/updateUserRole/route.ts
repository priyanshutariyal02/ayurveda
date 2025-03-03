import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
interface UserDocument extends Document {
  role: string;
}
export async function GET(req: NextRequest) {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const { role } = await req.json();

    const newUserData: Partial<UserDocument> = { role };

    const user = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error updating user role",
      error: (error as Error).message,
    });
  }
}
