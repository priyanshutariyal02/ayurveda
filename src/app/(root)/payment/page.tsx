"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PaymentComp from "@/components/payment";

const Payment: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Corrected script removal logic
      const scriptElement = document.querySelector(`script[src="${script.src}"]`);
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  if (!orderId || !amount ) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">Missing required parameters</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[60dvh] flex items-center justify-center">
      {scriptLoaded ? (
        <PaymentComp
          orderId={orderId}
          amount={parseFloat(amount)}
        />
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <p>Loading payment gateway...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;