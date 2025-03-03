import { login } from "@/controllers/auth.controllers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  return login(req, res);
}
