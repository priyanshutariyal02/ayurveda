import { login } from "@/controllers/auth.controllers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return login(req);
}
