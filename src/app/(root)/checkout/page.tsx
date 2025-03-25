"use client";
import { Product } from "@/constants/constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

const CheckoutPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async (userInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    street?: string;
    flatNumber?: string;
  }) => {
    try {
      setIsLoading(true);

      // First save checkout information
      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          userInfo,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error("Failed to save checkout information");
      }

      // Create Razorpay order
      const paymentResponse = await fetch("/api/paymentshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          userInfo,
          total: subtotal,
        }),
      });

      const { orderId, amount, currency } = await paymentResponse.json();

      // Wait for Razorpay script to load if not already loaded
      if (!isRazorpayLoaded) {
        await new Promise((resolve) => {
          const checkScriptLoaded = () => {
            if (isRazorpayLoaded) {
              resolve(true);
            } else {
              setTimeout(checkScriptLoaded, 100);
            }
          };
          checkScriptLoaded();
        });
      }

      setIsPaymentProcessing(true);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount.toString(),
        currency: currency,
        name: "Tulsi Ayurveda",
        description: "Payment for your order",
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await fetch("/api/paymentshop/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...userInfo,
                cart,
                total: subtotal,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            localStorage.setItem(
              "userInfo",
              JSON.stringify({ name: userInfo.name, email: userInfo.email })
            );

            await fetch("/api/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userInfo.name,
                email: userInfo.email,
                address: userInfo.address,
                phone: userInfo.phone,
                flatNumber: userInfo.flatNumber,
                street: userInfo.street,
              }),
            });

            setIsEmailSent("Sending E-mail...");
            localStorage.removeItem("cart");
            router.push("/thank-you");
          } catch (error) {
            console.error("Error in payment handler:", error);
          } finally {
            setIsLoading(false);
            setIsPaymentProcessing(false);
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
        setIsLoading(false);
        setIsPaymentProcessing(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
      setIsLoading(false);
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 z-0">
      {(isLoading || isPaymentProcessing) && (
        <div className="w-full z-50 fixed inset-y-0 bg-black/70 flex items-center justify-center">
          <p className="text-body font-medium text-white">
            {isPaymentProcessing ? "Processing payment..." : "Loading..."}
          </p>
        </div>
      )}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Checkout</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-neutral-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-black">
                    ₹{item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">Your cart is empty.</p>
          )}
        </div>
        <div className="border-t border-neutral-300 pt-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-black">Subtotal</p>
            <p className="text-lg font-semibold text-black">₹{subtotal}</p>
          </div>
          <small className="text-sm text-neutral-500">
            Taxes and shipping are calculated at checkout.
          </small>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const userInfo = {
              name: formData.get("name") as string,
              email: formData.get("email") as string,
              phone: formData.get("phone") as string,
              address: formData.get("address") as string,
              street: formData.get("street") as string,
              flatNumber: formData.get("flatNumber") as string,
            };
            handlePayment(userInfo);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              required
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-black"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              required
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-black"
            >
              Street (optional)
            </label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Enter your street"
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="flatNumber"
              className="block text-sm font-medium text-black"
            >
              Flat Number (optional)
            </label>
            <input
              type="text"
              name="flatNumber"
              id="flatNumber"
              placeholder="Enter your flat number"
              className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/90 transition duration-200"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Razorpay script loaded successfully");
          setIsRazorpayLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Razorpay script");
          setIsRazorpayLoaded(false);
        }}
      />
    </div>
  );
};

export default CheckoutPage;
