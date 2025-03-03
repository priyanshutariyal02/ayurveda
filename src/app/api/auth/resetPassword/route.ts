import { User } from "@/models/user.models";
import bcrypt from "bcryptjs";
import {  NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      email,
      otp,
      newPassword,
    }: { email: string; otp: string; newPassword: string } = await req.json();

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordOTP = null as unknown as string;
    user.resetPasswordOTPExpiry = null as unknown as Date;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error resetting password", error },
      { status: 500 }
    );
  }
}
