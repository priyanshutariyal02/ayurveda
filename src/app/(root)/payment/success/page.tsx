"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import toast from "react-hot-toast";

interface AppointmentData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  status: string;
  amount: number;
  paymentStatus: string;
  meetLink?: string;
  createdAt: string;
}

interface PaymentData {
  _id: string;
  razorpayPaymentId: string;
  amount: number;
  status: string;
  createdAt: string;
}

const PaymentSuccess: React.FC = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentId) {
        setError("Payment ID is missing");
        setLoading(false);
        return;
      }

      try {
        // Fetch payment details
        const paymentRes = await fetch(`/api/payment/${paymentId}`);
        if (!paymentRes.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const paymentData = await paymentRes.json();
        setPaymentData(paymentData);

        // Fetch appointment details
        const appointmentRes = await fetch(`/api/order/${paymentData.order}`);
        if (!appointmentRes.ok) {
          throw new Error("Failed to fetch appointment details");
        }
        const appointmentData = await appointmentRes.json();
        setAppointmentData(appointmentData);

        // Send confirmation email
        if (appointmentData && appointmentData.email) {
          await sendConfirmationEmail(appointmentData, paymentData);
          setEmailSent(true);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    toast.success("Please, do check your spam folder for appointment confirmation!");
    fetchPaymentDetails();
  }, [paymentId]);

  const sendConfirmationEmail = async (
    appointment: AppointmentData,
    payment: PaymentData
  ) => {
    try {
      const response = await fetch("/api/sendAppointmentEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: appointment.email,
          subject: "Your Appointment Confirmation",
          appointmentData: appointment,
          paymentData: payment,
        }),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to send confirmation email");
      // }

      return await response.json();
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      // We don't set an error state here to avoid disrupting the success page experience
      // Just log the error and continue
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (error || !appointmentData || !paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">
            {error || "Failed to load payment information"}
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 p-6 text-center">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
          <p className="text-white/80 mt-2">
            Your appointment has been confirmed
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Appointment Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{appointmentData.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{appointmentData.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{appointmentData.time}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{appointmentData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{appointmentData.phone}</span>
                </div>
                {appointmentData.message && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Message:</span>
                    <span className="font-medium">
                      {appointmentData.message}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">
                    {appointmentData.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Payment Receipt
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-medium">
                    {paymentData.razorpayPaymentId}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">
                    ₹{paymentData.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium">
                    {formatDate(paymentData.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="font-medium text-green-600">
                    {paymentData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {appointmentData.meetLink && (
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2 text-blue-800">
                Virtual Appointment Link
              </h2>
              <p className="text-gray-700 mb-3">
                Join your appointment using the Google Meet link below:
              </p>
              <a
                href={"https://meet.google.com/kmo-pbra-fae"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Join Meeting
              </a>
              <p className="text-gray-500 text-sm mt-2">
                Please join 5 minutes before your scheduled appointment time.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              {emailSent
                ? "A confirmation email has been sent to your email address with all these details."
                : "We're preparing your confirmation email. You'll receive it shortly."}
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;