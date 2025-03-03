import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product.models";
import { Order } from "@/models/order.models";
import { User } from "@/models/user.models";

const getDashboardStats = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find({ orderStatus: "Delivered" });
    const totalIncome = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    // Monthly income
    const monthlyIncome = await Order.aggregate([
      { $match: { orderStatus: "Delivered" } },
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching dashboard stats",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const getAllUsers = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const users = await User.find().select("-password");
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
};

const getUserDetails = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const user = await User.findById(req.nextUrl.searchParams.get("id")).select(
      "-password"
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user details",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const updateUserRole = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const { role } = await req.json();
    const user = await User.findByIdAndUpdate(
      req.nextUrl.searchParams.get("id"),
      { role },
      { new: true, runValidators: true }
    );
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating user role",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

const deleteUser = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  try {
    const user = await User.findById(req.nextUrl.searchParams.get("id"));
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    await user.deleteOne();
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
};

export {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
};
