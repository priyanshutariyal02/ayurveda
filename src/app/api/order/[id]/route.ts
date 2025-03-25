// import { NextRequest, NextResponse } from "next/server";
// import { Order } from "@/models/order.models";

// // **Get a Single Order**
// export async function GET(req: NextRequest) {
//   try {
//     const orderId = req.nextUrl.searchParams.get("id");
//     const order = await Order.findById(orderId).populate("user", "name email");

//     if (!order) {
//       return NextResponse.json(
//         { success: false, message: "No Order found with this ID" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, order });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: "Error fetching order", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // **Update Order Status (Admin)**
// export async function PUT(req: NextRequest) {
//   try {
//     const orderId = req.nextUrl.searchParams.get("id");
//     const orderStatus = req.headers.get("orderStatus");

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return NextResponse.json(
//         { success: false, message: "No Order found with this ID" },
//         { status: 404 }
//       );
//     }

//     if (order.orderStatus === "Delivered") {
//       return NextResponse.json(
//         { success: false, message: "Order is already delivered" },
//         { status: 400 }
//       );
//     }

//     if (orderStatus === "Delivered") {
//       order.deliveredAt = new Date();
//     }

//     order.orderStatus = orderStatus ?? "Pending";
//     await order.save();

//     return NextResponse.json({ success: true, order });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: "Error updating order", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // **Delete an Order (Admin)**
// export async function DELETE(req: NextRequest) {
//   try {
//     const orderId = req.nextUrl.searchParams.get("id");
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return NextResponse.json(
//         { success: false, message: "No Order found with this ID" },
//         { status: 404 }
//       );
//     }

//     await order.deleteOne();
//     return NextResponse.json({
//       success: true,
//       message: "Order deleted successfully",
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: "Error deleting order", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/lib/db.connect";
import { AppointmentOrder } from "@/models/appointment.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const order = await AppointmentOrder.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { message: "Appointment order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error fetching appointment order:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch appointment order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();

    const updatedOrder = await AppointmentOrder.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Appointment order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error("Error updating appointment order:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update appointment order" },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();

//     const deletedOrder = await AppointmentOrder.findByIdAndDelete(params.id);

//     if (!deletedOrder) {
//       return NextResponse.json(
//         { message: "Appointment order not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       message: "Appointment order deleted successfully",
//     });
//   } catch (error: any) {
//     console.error("Error deleting appointment order:", error);
//     return NextResponse.json(
//       { message: error.message || "Failed to delete appointment order" },
//       { status: 500 }
//     );
//   }
// }


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    console.log("Deleting appointment order with ID:", params.id);

    const deletedOrder = await AppointmentOrder.findByIdAndDelete(params.id);

    if (!deletedOrder) {
      console.log("Appointment order not found:", params.id);
      return NextResponse.json(
        { message: "Appointment order not found" },
        { status: 404 }
      );
    }

    console.log("Appointment order deleted successfully:", deletedOrder);
    return NextResponse.json({
      message: "Appointment order deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting appointment order:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete appointment order" },
      { status: 500 }
    );
  }
}