// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Checkout from "@/models/checkout.model"; // Import the Checkout model
import dbConnect from "@/lib/db.connect" // Import your database connection utility

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to the database

    const { cart, userInfo } = await req.json();

    // Validate the request data
    if (!cart || !userInfo) {
      return NextResponse.json(
        { message: "Cart and user information are required" },
        { status: 400 }
      );
    }

    // Calculate the total price
    const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    // Create a new checkout document
    const checkout = new Checkout({
      ...userInfo,
      cart: cart.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: "pending",
    });

    // Save the checkout document to the database
    await checkout.save();

    // Return a success response
    return NextResponse.json(
      { message: "Checkout successful", checkout },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during checkout:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 