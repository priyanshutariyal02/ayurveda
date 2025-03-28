// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getOrderConfirmationEmail,
  getOrderConfirmationEmailtoDr,
} from "@/lib/emailTemplate";

export async function POST(req: Request) {
  try {
    const { name, email, address, phone, flatNumber, street, cart } =
      await req.json();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Tulsi Ayurveda" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Order Confirmation",
      html: getOrderConfirmationEmail(name),
    });

    await transporter.sendMail({
      from: `"Tulsi Ayurveda" <${process.env.SMTP_USER}>`,
      to: "himanshubhandari4675@gmail.com",
      subject: "New Order Received",
      html: getOrderConfirmationEmailtoDr(
        name,
        email,
        phone,
        address,
        street,
        flatNumber,
        cart
      ),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}