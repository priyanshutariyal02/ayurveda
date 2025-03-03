import { Cart } from "@/models/cart.models";
import { Product } from "@/models/product.models";
import { NextRequest, NextResponse } from "next/server";

const createCart = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId } = await req.json();
    const existingCart = await Cart.findOne({ user: userId, status: "active" });

    if (existingCart) {
      return NextResponse.json(
        { message: "Active cart already exists" },
        { status: 400 }
      );
    }

    const newCart = new Cart({ user: userId });
    await newCart.save();

    return NextResponse.json({ newCart }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating cart", error: error.message },
      { status: 500 }
    );
  }
};

const addToCart = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, productId, quantity } = await req.json();

    let cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      cart = new Cart({ user: userId });
    }

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

    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding to cart", error: error.message },
      { status: 500 }
    );
  }
};

const removeFromCart = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, productId } = await req.json();
    const cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items.pull({ product: productId });
    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error removing from cart", error: error.message },
      { status: 500 }
    );
  }
};

const updateCartItemQuantity = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    const { userId, productId, quantity } = await req.json();
    const cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

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

    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating cart", error: error.message },
      { status: 500 }
    );
  }
};

const getCart = async (req: NextRequest): Promise<NextResponse> => {
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
};

const applyDiscount = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, discountAmount } = await req.json();
    const cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    cart.discount = discountAmount;
    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error applying discount", error: error.message },
      { status: 500 }
    );
  }
};

const checkoutCart = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId } = await req.json();
    const cart = await Cart.findOne({ user: userId, status: "active" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    cart.status = "checkout";
    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error during checkout", error: error.message },
      { status: 500 }
    );
  }
};

export {
  createCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  applyDiscount,
  checkoutCart,
};
