// src/models/checkout.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICheckout extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  street: string;
  flatNumber: string;
  cart: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
}

const CheckoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  street: { type: String},
  flatNumber: { type: String},
  cart: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Checkout || mongoose.model<ICheckout>("Checkout", CheckoutSchema); 