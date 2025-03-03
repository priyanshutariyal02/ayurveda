import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product.models";

// **Get All Products**
export async function GET() {
  try {
    const products = await Product.find();
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

// **Create a New Product**
export async function POST(req: NextRequest) {
  try {
    const { name, price, description, category, stock, imageUrl } = await req.json();

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await product.save();

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}
