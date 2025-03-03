import { NextResponse } from "next/server";

export async function POST(_req: Request, res: NextResponse) {
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
}
