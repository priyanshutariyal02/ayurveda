// import { NextRequest, NextResponse } from "next/server";
// import { Product } from "@/models/product.models";
// import { Order } from "@/models/order.models";

// // **Create a New Order**
// export async function POST(req: NextRequest) {
//   try {
//     const {
//       orderItems,
//       shippingInfo,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       paymentInfo,
//     } = await req.json();

//     const order = await Order.create({
//       orderItems,
//       shippingInfo,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       paymentInfo,
//       paidAt: new Date(),
//       user: req.headers.get("userId"),
//     });

//     // Update product stock
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product);
//       if (product) {
//         product.stock = product.stock - item.quantity;
//         await product.save();
//       }
//     }

//     return NextResponse.json({ success: true, order }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: "Error creating order", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // **Get Logged-in User's Orders**
// export async function GET(req: NextRequest) {
//   try {
//     const userId = req.headers.get("userId");
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     const orders = await Order.find({ user: userId });
//     return NextResponse.json({ success: true, orders });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error fetching orders",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// import dbConnect from "@/lib/db.connect";
// import { AppointmentOrder } from "@/models/appointment.models";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const { appointmentDetails } = body;

//     if (!appointmentDetails) {
//       return NextResponse.json(
//         { message: "Appointment details are required" },
//         { status: 400 }
//       );
//     }

//     // Create a new appointment order
//     const appointmentOrder = new AppointmentOrder({
//       name: appointmentDetails.name,
//       email: appointmentDetails.email,
//       phone: appointmentDetails.phone,
//       date: appointmentDetails.date,
//       time: appointmentDetails.time,
//       timeSlotId: appointmentDetails.timeSlotId,
//       message: appointmentDetails.message || "",
//       // If you have a logged-in user, you can add their ID here
//       // user: req.user._id,
//     });

//     const savedOrder = await appointmentOrder.save();

//     return NextResponse.json(savedOrder, { status: 201 });
//   } catch (error: any) {
//     console.error("Error creating appointment order:", error);
//     return NextResponse.json(
//       { message: error.message || "Failed to create appointment order" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect();

//     const orders = await AppointmentOrder.find().sort({ createdAt: -1 });

//     return NextResponse.json(orders);
//   } catch (error: any) {
//     console.error("Error fetching appointment orders:", error);
//     return NextResponse.json(
//       { message: error.message || "Failed to fetch appointment orders" },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/lib/db.connect";
import { AppointmentOrder } from "@/models/appointment.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { appointmentDetails } = await req.json();

    // Make sure doctorId is present
    if (!appointmentDetails.doctorId) {
      return NextResponse.json(
        { message: "Doctor ID is required" },
        { status: 400 }
      );
    }

    // Create the appointment order
    const order = await AppointmentOrder.create({
      name: appointmentDetails.name,
      email: appointmentDetails.email,
      phone: appointmentDetails.phone,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      timeSlotId: appointmentDetails.timeSlotId,
      doctorId: appointmentDetails.doctorId, // Ensure doctorId is included
      message: appointmentDetails.message || "",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Failed to create appointment order:", error);
    return NextResponse.json(
      { message: "Failed to create appointment order", error: String(error) },
      { status: 500 }
    );
  }
}
