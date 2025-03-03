import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product.models";

// **Get a Single Product**
export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("id");
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// **Update a Product**
export async function PUT(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("id");
    const updates = await req.json();

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// **Delete a Product**
export async function DELETE(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("id");
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await product.deleteOne();
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
