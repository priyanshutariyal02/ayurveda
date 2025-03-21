import dbConnect from "@/lib/db.connect";
import { Payment } from "@/models/payment.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const payment = await Payment.findById(params.id);

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(payment);
  } catch (error: any) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch payment" },
      { status: 500 }
    );
  }
}
