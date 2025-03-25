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

  const deleteAppointmentOnFailure = async (orderId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete appointment data");
      }

      console.log("Appointment data deleted due to payment failure");
    } catch (error) {
      console.error("Error deleting appointment data:", error);
    }
  };

  // const initializePayment = async (): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Create Razorpay order
  //     const response = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         //   userId,
  //         orderId,
  //         amount,
  //       }),
  //     });

  //     const data: CreateOrderResponse = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to create payment");
  //     }

  //     // Initialize Razorpay
  //     const options = {
  //       key: data.key,
  //       amount: data.amount * 100,
  //       currency: "INR",
  //       name: "Your Store Name",
  //       description: "Payment for Order #" + orderId,
  //       order_id: data.razorpayOrderId,
  //       handler: async function (response: RazorpayResponse) {
  //         await verifyPayment(response);
  //       },
  //       prefill: {
  //         name: "",
  //         email: "",
  //         contact: "",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const verifyPayment = async (response: RazorpayResponse): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     const verificationResponse = await fetch("/api/payment", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         razorpay_order_id: response.razorpay_order_id,
  //         razorpay_payment_id: response.razorpay_payment_id,
  //         razorpay_signature: response.razorpay_signature,
  //       }),
  //     });

  //     const data: VerifyPaymentResponse = await verificationResponse.json();

  //     if (!verificationResponse.ok) {
  //       throw new Error(data.message || "Payment verification failed");
  //     }

  //     // Redirect to success page
  //     router.push(`/payment/success?paymentId=${data.paymentId}`);
  //   } catch (err: any) {
  //     setError(err.message || "Payment verification failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      paymentObject.on("payment.failed", async function (response: any) {
        console.error("Payment failed:", response);
        await deleteAppointmentOnFailure(orderId); // Delete appointment data on payment failure
        setError("Payment failed. Please try again.");
      });
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
        await deleteAppointmentOnFailure(orderId); // Delete appointment data if verification fails
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
    <div className="max-w-md w-full mx-auto p-5">
      <h2 className="text-h3 font-bold mb-4">Complete Your Payment</h2>
      <div className="mb-4">
        <p className="text-gray-700 text-link">
          <span className="font-medium">Order ID:</span> {orderId || "N/A"}
        </p>
        <p className="text-gray-70 text-link">
          <span className="font-medium">Amount:</span> ₹
          {amount ? amount.toFixed(2) : "0.00"}
        </p>
      </div>
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}
      <div className="flex w-full items-center justify-end">
        <button
          onClick={initializePayment}
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/70 duration-200 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentComp;
