import { NextRequest, NextResponse } from "next/server";
import { Payment } from "@/models/payment.models";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db.connect";
import { AppointmentOrder } from "@/models/appointment.models";

// Initialize Razorpay with your key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to generate a Google Meet link
const generateGoogleMeetLink = async (appointmentDate: string, appointmentTime: string) => {
  // In a real application, you would use Google Calendar API
  // This is a placeholder that generates a fake Meet link
  const meetId = crypto.randomBytes(5).toString("hex");
  return `https://meet.google.com/${meetId}`;
};

// Function to send confirmation emails
const sendConfirmationEmails = async (
  patientEmail: string,
  doctorEmail: string,
  appointmentDetails: any,
  paymentDetails: any,
  meetLink: string
) => {
  // Patient email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: "Appointment Confirmation and Payment Receipt",
    html: `
      <h1>Your Appointment is Confirmed!</h1>
      <p>Dear ${appointmentDetails.name},</p>
      <p>Your appointment has been confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}.</p>
      <p>Google Meet Link: <a href="${meetLink}">${meetLink}</a></p>
      <h2>Payment Receipt</h2>
      <p>Payment ID: ${paymentDetails.razorpayPaymentId}</p>
      <p>Amount: ₹${paymentDetails.amount.toFixed(2)}</p>
      <p>Date: ${new Date().toLocaleDateString()}</p>
      <p>Thank you for choosing our services.</p>
    `,
  });

  // Doctor email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: doctorEmail,
    subject: "New Appointment Scheduled",
    html: `
      <h1>New Appointment Alert</h1>
      <p>A new appointment has been scheduled:</p>
      <ul>
        <li>Patient: ${appointmentDetails.name}</li>
        <li>Email: ${appointmentDetails.email}</li>
        <li>Phone: ${appointmentDetails.phone}</li>
        <li>Date: ${appointmentDetails.date}</li>
        <li>Time: ${appointmentDetails.time}</li>
        <li>Message: ${appointmentDetails.message || "N/A"}</li>
      </ul>
      <p>Google Meet Link: <a href="${meetLink}">${meetLink}</a></p>
      <p>Please be available 5 minutes before the scheduled time.</p>
    `,
  });
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { orderId, amount } = body;
    
    if (!orderId || !amount) {
      return NextResponse.json(
        { message: "Order ID and amount are required" },
        { status: 400 }
      );
    }
    
    // Find the appointment order
    const order = await AppointmentOrder.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { message: "Appointment order not found" },
        { status: 404 }
      );
    }
    
    // Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: orderId,
    });
    
    // Create a payment record without requiring user field
    const payment = new Payment({
      order: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      status: "pending",
    });
    
    await payment.save();
    
    return NextResponse.json({
      message: "Payment order created successfully",
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create payment" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    
    // Verify the payment signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
      
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }
    
    // Update the payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          razorpayPaymentId: razorpay_payment_id,
          status: "success",
        },
      },
      { new: true }
    );
    
    if (!payment) {
      return NextResponse.json(
        { message: "Payment record not found" },
        { status: 404 }
      );
    }
    
    // Get the appointment order details
    const appointmentOrder = await AppointmentOrder.findById(payment.order);
    if (!appointmentOrder) {
      return NextResponse.json(
        { message: "Appointment order not found" },
        { status: 404 }
      );
    }
    
    // Generate Google Meet link
    const meetLink = await generateGoogleMeetLink(
      appointmentOrder.date,
      appointmentOrder.time
    );
    
    // Update the appointment order with meet link and payment status
    await AppointmentOrder.findByIdAndUpdate(
      payment.order,
      { 
        $set: { 
          paymentStatus: "paid", 
          status: "confirmed",
          meetLink: meetLink 
        } 
      }
    );
    
    // Send confirmation emails
    try {
      await sendConfirmationEmails(
        appointmentOrder.email,
        process.env.DOCTOR_EMAIL || "doctor@example.com",
        appointmentOrder,
        payment,
        meetLink
      );
    } catch (emailError) {
      console.error("Error sending confirmation emails:", emailError);
      // Continue execution even if email sending fails
    }
    
    return NextResponse.json({
      message: "Payment verified successfully",
      paymentId: payment._id,
      meetLink: meetLink
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}