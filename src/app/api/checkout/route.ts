import { NextResponse } from "next/server";
import Checkout from "@/models/checkout.model";
import dbConnect from "@/lib/db.connect";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { cart, userInfo } = await req.json();

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
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address || "",
      street: userInfo.street || "",
      flatNumber: userInfo.flatNumber || "",
      cart: cart.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: "pending",
    });

    await checkout.save();

    return NextResponse.json(
      { 
        message: "Checkout successful", 
        checkout: {
          _id: checkout._id,
          status: checkout.status,
          total: checkout.total,
          createdAt: checkout.createdAt
        }
      },
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
