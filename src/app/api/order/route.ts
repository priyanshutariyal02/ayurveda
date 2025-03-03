import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product.models";
import { Order } from "@/models/order.models";

// **Create a New Order**
export async function POST(req: NextRequest) {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = await req.json();

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: new Date(),
      user: req.headers.get("userId"),
    });

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = product.stock - item.quantity;
        await product.save();
      }
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error creating order", error: error.message },
      { status: 500 }
    );
  }
}

// **Get Logged-in User's Orders**
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ user: userId });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
