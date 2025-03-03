import { Product } from "@/models/product.models";
import { Order } from "@/models/order.models";
import { NextRequest, NextResponse } from "next/server";

// Create a new order => /api/order/new
const newOrder = async (req: NextRequest, res: NextResponse) => {
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
};

// Get single order => /api/order/:id
const getSingleOrder = async (req: NextRequest, res: NextResponse) => {
  try {
    const order = await Order.findById(req.headers.get("orderId")).populate(
      "user",
      "name email"
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching order", error: error.message },
      { status: 500 }
    );
  }
};

// Get logged in user orders => /api/orders/me
const myOrders = async (req: NextRequest, res: NextResponse) => {
  try {
    const orders = await Order.find({ user: req.headers.get("userId") });

    return NextResponse.json({ success: true, orders }, { status: 200 });
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
};

// Admin: Get all orders => /api/admin/orders
const allOrders = async (req: NextRequest, res: NextResponse) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    return NextResponse.json(
      { success: true, totalAmount, orders },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching all orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

// Admin: Update order status => /api/admin/order/:id
const updateOrder = async (req: NextRequest, res: NextResponse) => {
  try {
    const order = await Order.findById(req.headers.get("orderId"));

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    if (order.orderStatus === "Delivered") {
      return NextResponse.json(
        { success: false, message: "You have already delivered this order" },
        { status: 400 }
      );
    }

    if (req.headers.get("orderStatus") === "Delivered") {
      order.deliveredAt = new Date();
    }

    order.orderStatus = req.headers.get("orderStatus") ?? "Pending";

    await order.save();

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error updating order", error: error.message },
      { status: 500 }
    );
  }
};

// Admin: Delete order => /api/admin/order/:id
const deleteOrder = async (req: NextRequest, res: NextResponse) => {
  try {
    const order = await Order.findById(req.headers.get("orderId"));

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No Order found with this ID" },
        { status: 404 }
      );
    }

    await order.deleteOne();

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error deleting order", error: error.message },
      { status: 500 }
    );
  }
};

export {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
};
