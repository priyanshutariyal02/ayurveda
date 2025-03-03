import { User } from "@/models/user.models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, email, password, role }: SignupRequest = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }

    if (role && !["user", "admin"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role specified" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      role: role || "user",
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error signing up!" }, { status: 500 });
  }
}
