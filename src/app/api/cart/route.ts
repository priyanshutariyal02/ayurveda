//api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Cart } from "@/models/cart.models";
import { Product } from "@/models/product.models";

export async function POST(req: NextRequest) {
  try {
    const { userId, action, productId, quantity, discountAmount } =
      await req.json();

    if (action === "create") {
      const existingCart = await Cart.findOne({
        user: userId,
        status: "active",
      });
      if (existingCart) {
        return NextResponse.json(
          { message: "Active cart already exists" },
          { status: 400 }
        );
      }
      const newCart = new Cart({ user: userId });
      await newCart.save();
      return NextResponse.json({ newCart }, { status: 201 });
    }

    let cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    if (action === "add") {
      const product = await Product.findById(productId);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
      const existingItemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    if (action === "remove") {
      cart.items.pull({ product: productId });
    }

    if (action === "update") {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );
      if (itemIndex === -1) {
        return NextResponse.json(
          { message: "Product not in cart" },
          { status: 404 }
        );
      }
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    if (action === "discount") {
      cart.discount = discountAmount;
    }

    if (action === "checkout") {
      cart.status = "checkout";
    }

    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const cart = await Cart.findOne({
      user: userId,
      status: "active",
    }).populate("items.product");
    if (!cart) {
      return NextResponse.json(
        { message: "No active cart found" },
        { status: 404 }
      );
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching cart", error: error.message },
      { status: 500 }
    );
  }
}
