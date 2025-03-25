// src/models/paymentshop.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPaymentShop extends Document {
  name: string;
  email: string;
  phone: string;
  address?: string;
  street?: string;
  flatNumber?: string;
  cart: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  status: string;
  createdAt: Date;
}

const PaymentShopSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  street: { type: String },
  flatNumber: { type: String },
  cart: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpaySignature: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PaymentShop || mongoose.model<IPaymentShop>("PaymentShop", PaymentShopSchema); 