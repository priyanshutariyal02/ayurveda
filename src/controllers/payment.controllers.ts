import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Payment } from "@/models/payment.models";
import { Order } from "@/models/order.models";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const createRazorpayOrder = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const { userId, orderId, amount } = await req.json();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1, // Auto capture payment
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create payment record
    const payment = new Payment({
      user: userId,
      order: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      status: "pending",
    });

    await payment.save();

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error creating Razorpay order",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const verifyPayment = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Verify signature
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET as string
    );
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    // Check signature
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Update payment record
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Payment record not found" },
        { status: 404 }
      );
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.status = "success";
    await payment.save();

    // Update order status
    await Order.findByIdAndUpdate(payment.order, { paymentStatus: "paid" });

    return NextResponse.json({
      message: "Payment successful",
      paymentId: payment._id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error verifying payment",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const getPaymentDetails = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const paymentId = req.nextUrl.searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { message: "Payment ID is required" },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(paymentId)
      .populate("user", "name email")
      .populate("order");

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(payment);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching payment details",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export { createRazorpayOrder, verifyPayment, getPaymentDetails };
