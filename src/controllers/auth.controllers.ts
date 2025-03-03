import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";
import { generateOTP } from "@/utils/generateOtp";
import { sendEmail } from "@/utils/sendEmail";

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
}

const signup = async (req: NextRequest, res: NextResponse) => {
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
};

const login = async (req: NextRequest) => {
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
};

const logout = async (_req: NextRequest, res: NextResponse) => {
  try {
    res.cookies.set("token", "", { expires: new Date(0) });
    return NextResponse.json(
      { message: "Logged out successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error logging out!", error },
      { status: 500 }
    );
  }
};

const myDetails = async (req: NextRequest) => {
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
};

const requestPasswordReset = async (req: NextRequest, res: NextResponse) => {
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
};

const resetPassword = async (req: NextRequest, res: NextResponse) => {
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
};

export {
  signup,
  login,
  logout,
  myDetails,
  requestPasswordReset,
  resetPassword,
};
