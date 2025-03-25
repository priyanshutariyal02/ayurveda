// src/app/api/paymentshop/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import PaymentShop from "@/models/paymentshop.model"; // Import the PaymentShop model
import  dbConnect  from "@/lib/db.connect"; // Import your database connection utility

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Public key
  key_secret: process.env.RAZORPAY_KEY_SECRET || "", // Private key
});

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to the database

    const { cart, userInfo, total } = await req.json();

    // Validate the request data
    if (!cart || !userInfo || !total) {
      return NextResponse.json(
        { message: "Cart, user information, and total are required" },
        { status: 400 }
      );
    }

    // Create a Razorpay order
    const options = {
      amount: total * 100, // Amount in paise (e.g., ₹100 = 10000 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Return the Razorpay order ID and other details
    return NextResponse.json(
      {
        message: "Razorpay order created successfully",
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 