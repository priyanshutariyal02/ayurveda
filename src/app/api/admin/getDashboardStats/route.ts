import { Order } from "@/models/order.models";
import { Product } from "@/models/product.models";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
interface OrderDocument extends Document {
  totalPrice: number;
  createdAt: Date;
  orderStatus: string;
}
export async function GET(req: NextRequest) {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders: OrderDocument[] = await Order.find({
      orderStatus: "Delivered",
    });
    const totalIncome = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    // Monthly income
    const monthlyIncome = await Order.aggregate([
      {
        $match: { orderStatus: "Delivered" },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          total: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalIncome,
        monthlyIncome,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching dashboard stats",
      error: (error as Error).message,
    });
  }
}
