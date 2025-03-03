import { User } from "@/models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password }: { email: string; password: string } =
      await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found!" }, { status: 400 });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatched) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_KEY as string
    );

    res.cookies.set("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return NextResponse.json({ existingUser, jwtToken }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error logging in!", error },
      { status: 500 }
    );
  }
}
