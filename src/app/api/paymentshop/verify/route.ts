// // src/app/api/paymentshop/verify/route.ts
// import { NextResponse } from "next/server";
// import PaymentShop from "@/models/paymentshop.model"; // Import the PaymentShop model
// import dbConnect from "@/lib/db.connect"; // Import your database connection utility

// export async function POST(req: Request) {
//   try {
//     await dbConnect(); // Connect to the database

//     const { name, email, phone, address, street, flatNumber, cart, total, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
//       await req.json();

//     // Validate the request data
//     if (!name || !email || !phone || !cart || !total || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Save payment details to the database
//     const payment = new PaymentShop({
//       name,
//       email,
//       phone,
//       address,
//       street,
//       flatNumber,
//       cart,
//       total,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//       status: "completed",
//     });

//     await payment.save();

//     // Return a success response
//     return NextResponse.json(
//       { message: "Payment details saved successfully", payment },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving payment details:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import PaymentShop from "@/models/paymentshop.model";
import Checkout from "@/models/checkout.model";
import dbConnect from "@/lib/db.connect";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { 
      name, 
      email, 
      phone, 
      address, 
      street, 
      flatNumber, 
      cart, 
      total, 
      checkoutId,
      razorpayPaymentId, 
      razorpayOrderId, 
      razorpaySignature 
    } = await req.json();

    if (!name || !email || !phone || !cart || !total || 
        !razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !checkoutId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Save payment details
    const payment = new PaymentShop({
      name,
      email,
      phone,
      address: address || "",
      street: street || "",
      flatNumber: flatNumber || "",
      cart: cart.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      checkoutId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      status: "completed",
    });

    await payment.save();

    // Update checkout status to "completed"
    await Checkout.findByIdAndUpdate(checkoutId, { 
      status: "completed",
      paymentId: payment._id 
    });

    return NextResponse.json(
      { message: "Payment details saved successfully", payment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving payment details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}