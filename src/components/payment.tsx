"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentProps {
  //   userId: string;
  orderId: string;
  amount: number;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  message?: string;
  razorpayOrderId: string;
  amount: number;
  key: string;
}

interface VerifyPaymentResponse {
  message: string;
  paymentId: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentComp: React.FC<PaymentProps> = ({ orderId, amount }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const initializePayment = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Create Razorpay order
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   userId,
          orderId,
          amount,
        }),
      });

      const data: CreateOrderResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment");
      }

      // Initialize Razorpay
      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: "INR",
        name: "Your Store Name",
        description: "Payment for Order #" + orderId,
        order_id: data.razorpayOrderId,
        handler: async function (response: RazorpayResponse) {
          await verifyPayment(response);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (response: RazorpayResponse): Promise<void> => {
    try {
      setLoading(true);
      const verificationResponse = await fetch("/api/payment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data: VerifyPaymentResponse = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(data.message || "Payment verification failed");
      }

      // Redirect to success page
      router.push(`/payment/success?paymentId=${data.paymentId}`);
    } catch (err: any) {
      setError(err.message || "Payment verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
      <div className="mb-4">
        <p className="text-gray-700">Order ID: {orderId || "N/A"}</p>
        <p className="text-gray-700">
          Amount: ₹{amount ? amount.toFixed(2) : "0.00"}
        </p>
      </div>
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}
      <button
        onClick={initializePayment}
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentComp;
