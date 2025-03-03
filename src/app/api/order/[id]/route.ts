import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/order.models";

// **Get a Single Order**
export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");
    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching order", error: error.message },
      { status: 500 }
    );
  }
}

// **Update Order Status (Admin)**
export async function PUT(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");
    const orderStatus = req.headers.get("orderStatus");

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    if (order.orderStatus === "Delivered") {
      return NextResponse.json(
        { success: false, message: "Order is already delivered" },
        { status: 400 }
      );
    }

    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    order.orderStatus = orderStatus ?? "Pending";
    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error updating order", error: error.message },
      { status: 500 }
    );
  }
}

// **Delete an Order (Admin)**
export async function DELETE(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    await order.deleteOne();
    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error deleting order", error: error.message },
      { status: 500 }
    );
  }
}
