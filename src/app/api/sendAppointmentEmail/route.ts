import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function POST(req: Request) {
  try {
    const { email, subject, appointmentData, paymentData } = await req.json();

    if (!email || !appointmentData || !paymentData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a Google Calendar event with Google Meet link
    const eventStartTime = new Date(
      `${appointmentData.date}T${appointmentData.time}:00`
    );
    const eventEndTime = new Date(eventStartTime.getTime() + 30 * 60000); // 30 minutes later

    const event = {
      summary: `Appointment with ${appointmentData.name}`, // Event title
      description: `Appointment with ${appointmentData.name}`, // Event description
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: "Asia/Kolkata", // Adjust timezone as needed
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: "Asia/Kolkata", // Adjust timezone as needed
      },
      conferenceData: {
        createRequest: {
          requestId: crypto.randomBytes(10).toString("hex"), // Unique request ID
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
      attendees: [
        { email: appointmentData.email }, // User's email
        { email: process.env.DOCTOR_EMAIL || "doctor@example.com" }, // Doctor's email
      ],
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    const meetLink = calendarResponse.data.hangoutLink;

    // Update appointment data with the meet link
    appointmentData.meetLink = meetLink;

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format payment date
    const paymentDate = new Date(paymentData.createdAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    // Create HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background-color: #4CAF50; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
          <h1 style="color: white; margin: 0;">Appointment Confirmation</h1>
        </div>

        <div style="padding: 20px;">
          <p>Dear ${appointmentData.name},</p>
          <p>Thank you for booking your appointment! Your payment has been successfully processed.</p>

          <div style="margin: 25px 0; border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px;">
            <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-top: 0;">Appointment Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Date:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>${
                  appointmentData.date
                }</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Time:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>${
                  appointmentData.time
                }</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Meeting Link:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><a href="${meetLink}" style="color: #4285F4;">${meetLink}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Status:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong style="color: #4CAF50;">${
                  appointmentData.status
                }</strong></td>
              </tr>
            </table>
          </div>

          <div style="margin: 25px 0; border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px;">
            <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-top: 0;">Payment Receipt</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Payment ID:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>${
                  paymentData.razorpayPaymentId
                }</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Amount Paid:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>₹${paymentData.amount.toFixed(
                  2
                )}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Payment Date:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>${paymentDate}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: #666;">Payment Status:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong style="color: #4CAF50;">${
                  paymentData.status
                }</strong></td>
              </tr>
            </table>
          </div>

          <div style="background-color: #E3F2FD; padding: 15px; border-radius: 5px; margin: 25px 0;">
            <h2 style="color: #0D47A1; margin-top: 0;">Virtual Appointment Information</h2>
            <p>Please join your appointment using the Google Meet link above. We recommend joining 5 minutes before your scheduled appointment time.</p>
          </div>

          <p>If you have any questions or need to reschedule, please contact us.</p>
          <p style="margin-top: 25px;">Thank you,<br>Your Appointment Team</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `;

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Appointment Confirmation",
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // return NextResponse.json({ success: true });
    return NextResponse.json({
      success: true,
      meetLink: meetLink, // Add this line to return the meet link
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
