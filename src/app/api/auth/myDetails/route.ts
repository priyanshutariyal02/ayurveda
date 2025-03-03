import { NextResponse } from "next/server";
import { User } from "@/models/user.models";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Cannot find user" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error getting user details!", error },
      { status: 500 }
    );
  }
}
