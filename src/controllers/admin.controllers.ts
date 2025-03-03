import { Order } from "@/models/order.models";
import { Product } from "@/models/product.models";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";

interface OrderDocument extends Document {
  totalPrice: number;
  createdAt: Date;
  orderStatus: string;
}

interface UserDocument extends Document {
  role: string;
}

const getDashboardStats = async (req: NextRequest, res: NextResponse) => {
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
};

const getAllUsers = async (req: NextRequest, res: NextResponse) => {
  try {
    const users = await User.find().select("-password");

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching users",
      error: (error as Error).message,
    });
  }
};

const getUserDetails = async (req: NextRequest, res: NextResponse) => {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching user details",
      error: (error as Error).message,
    });
  }
};

const updateUserRole = async (req: NextRequest, res: NextResponse) => {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const { role } = await req.json();

    const newUserData: Partial<UserDocument> = { role };

    const user = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error updating user role",
      error: (error as Error).message,
    });
  }
};

const deleteUser = async (req: NextRequest, res: NextResponse) => {
  try {
    const { id } = req.nextUrl.searchParams as unknown as { id: string };
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error deleting user",
      error: (error as Error).message,
    });
  }
};

export {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
};
