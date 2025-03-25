import { NextRequest, NextResponse } from "next/server";
import { Payment } from "@/models/payment.models";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db.connect";
import { AppointmentOrder } from "@/models/appointment.models";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

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

// Initialize Google Calendar API
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

// Create OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials (you'll need to obtain these initially)
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to generate a Google Meet link
// const generateGoogleMeetLink = async (
//   appointmentDate: string,
//   appointmentTime: string
// ) => {
//   try {
//     const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

//     // Parse date and time
//     const [year, month, day] = appointmentDate.split("-").map(Number);
//     const [hours, minutes] = appointmentTime.split(":").map(Number);

//     const startDateTime = new Date(year, month - 1, day, hours, minutes);
//     const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes duration

//     const event = {
//       summary: "Doctor Appointment",
//       description: "Virtual consultation via Google Meet",
//       start: {
//         dateTime: startDateTime.toISOString(),
//         timeZone: "Asia/Kolkata", // Adjust to your timezone
//       },
//       end: {
//         dateTime: endDateTime.toISOString(),
//         timeZone: "Asia/Kolkata", // Adjust to your timezone
//       },
//       conferenceData: {
//         createRequest: {
//           requestId: crypto.randomBytes(16).toString("hex"),
//           conferenceSolutionKey: {
//             type: "hangoutsMeet",
//           },
//         },
//       },
//       attendees: [{ email: process.env.DOCTOR_EMAIL }],
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: "email", minutes: 24 * 60 }, // 1 day before
//           { method: "popup", minutes: 30 }, // 30 minutes before
//         ],
//       },
//     };

//     const response = await calendar.events.insert({
//       calendarId: GOOGLE_CALENDAR_ID,
//       requestBody: event,
//       conferenceDataVersion: 1,
//     });

//     return response.data.hangoutLink || "";
//   } catch (error) {
//     console.error("Error creating Google Meet:", error);
//     // Fallback to generating a random meet ID if API fails
//     const meetId = crypto.randomBytes(5).toString("hex");
//     return `https://meet.google.com/${meetId}`;
//   }
// };

const generateGoogleMeetLink = async (
  appointmentDate: string,
  appointmentTime: string
) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // Validate OAuth2 credentials
    const credentials = oAuth2Client.credentials;
    if (!credentials || !credentials.refresh_token) {
      console.error("Invalid or missing OAuth2 credentials");
      throw new Error("OAuth2 authentication failed");
    }

    // Parse date and time
    const [year, month, day] = appointmentDate.split("-").map(Number);
    const [hours, minutes] = appointmentTime.split(":").map(Number);

    const startDateTime = new Date(year, month - 1, day, hours, minutes);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes duration

    const event = {
      summary: "Doctor Appointment",
      description: "Virtual consultation via Google Meet",
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: crypto.randomBytes(16).toString("hex"),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
      attendees: [{ email: process.env.DOCTOR_EMAIL }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: 1,
    });

    console.log("Google Calendar Event Response:", response.data);

    return response.data.hangoutLink || "";
  } catch (error) {
    console.error("Detailed Error in Meet Link Generation:", error);

    // More granular error handling
    if (error instanceof Error) {
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);
    }

    // Fallback to generating a random meet ID
    const meetId = crypto.randomBytes(5).toString("hex");
    return `https://meet.google.com/${meetId}`;
  }
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
      <p>Your appointment has been confirmed for ${
        appointmentDetails.date
      } at ${appointmentDetails.time}.</p>
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
    await AppointmentOrder.findByIdAndUpdate(payment.order, {
      $set: {
        paymentStatus: "paid",
        status: "confirmed",
        meetLink: meetLink,
      },
    });

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
      meetLink: meetLink,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
