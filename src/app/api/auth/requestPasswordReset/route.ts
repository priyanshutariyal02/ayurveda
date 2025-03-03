import {  NextResponse } from "next/server";
import { User } from "@/models/user.models";
import { generateOTP } from "@/utils/generateOtp";
import { sendEmail } from "@/utils/sendEmail";

export async function GET(req: Request) {
  try {
    const { email }: { email: string } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    await user.save();

    const emailSent = await sendEmail({
      email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`,
    });

    if (!emailSent) {
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error requesting password reset", error },
      { status: 500 }
    );
  }
}
