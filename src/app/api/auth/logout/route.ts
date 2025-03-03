import { NextResponse } from "next/server";

export async function POST(_req: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully!" },
      { status: 200 }
    );

    response.cookies.set("token", "", { expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error logging out!", error: error.message },
      { status: 500 }
    );
  }
}
