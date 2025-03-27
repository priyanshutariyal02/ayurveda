import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/db.connect";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { cart, userInfo, total } = await req.json();

    // Validate required fields
    if (!cart || !userInfo || total === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart, user information, and total are required",
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Validate cart items
    if (!Array.isArray(cart)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid cart data",
          error: "Cart must be an array",
        },
        { status: 400 }
      );
    }

    // Validate total is a number
    if (isNaN(total) || total <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid total amount",
          error: "Total must be a positive number",
        },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(total * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
