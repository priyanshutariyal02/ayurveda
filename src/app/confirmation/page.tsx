// File: app/confirmation/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can fetch appointment details if needed
    // For now, we'll just use the URL params
    const appointmentId = searchParams.get("appointmentId");

    if (appointmentId) {
      setAppointmentData({
        id: appointmentId,
        date: searchParams.get("date"),
        time: searchParams.get("time"),
      });
    } else {
      // If no params, just show a generic confirmation
      setAppointmentData({
        id: "recent",
        status: "confirmed",
      });
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4">Loading your confirmation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Appointment Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your appointment has been successfully booked and payment has been
          received. We look forward to seeing you!
        </p>
        <div className="border-t border-gray-200 pt-4 mb-6">
          <p className="text-gray-500 mb-2">
            Appointment Fee: <span className="font-semibold">₹500</span>
          </p>
          <p className="text-gray-500 mb-2">
            Status: <span className="font-semibold text-green-500">Paid</span>
          </p>
          {appointmentData.date && (
            <p className="text-gray-500 mb-2">
              Date:{" "}
              <span className="font-semibold">{appointmentData.date}</span>
            </p>
          )}
          {appointmentData.time && (
            <p className="text-gray-500 mb-2">
              Time:{" "}
              <span className="font-semibold">{appointmentData.time}</span>
            </p>
          )}
        </div>
        <Link
          href="/"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/70 duration-200 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
