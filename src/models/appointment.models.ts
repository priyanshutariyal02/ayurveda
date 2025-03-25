import mongoose from "mongoose";

const AppointmentOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true,
    },
    doctorId: {
      type: String, // Ensure this field is required
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    amount: {
      type: Number,
      default: 500, // Default appointment cost
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    meetLink: {
      type: String,
    },
    receiptUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const AppointmentOrder =
  mongoose.models.AppointmentOrder ||
  mongoose.model("AppointmentOrder", AppointmentOrderSchema);