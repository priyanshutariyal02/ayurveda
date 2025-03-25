import { Product } from "@/constants/constant";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartSidebar = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  // Load cart from local storage when the sidebar opens
  useEffect(() => {
    if (isCartOpen) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isCartOpen]);

  // Update cart in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Increase quantity of an item
  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity of an item
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Ensure quantity doesn't go below 1
        : item
    );
    setCart(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    setIsCartOpen(false); // Close the sidebar
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-[20rem] lg:w-1/3 bg-white text-black transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Close Button */}
      <button
        aria-label="close"
        type="button"
        className="absolute top-4 right-4"
        onClick={() => setIsCartOpen(false)}
      >
        <IconX className="w-7 h-7 text-black" />
      </button>
      <div className="p-4 w-full h-full flex flex-col items-start">
        <h4>Cart ({cart.length} items)</h4>
        <hr className="mt-3 border-neutral-300 w-full" />
        {cart.length > 0 ? (
          <div className="w-full h-full bg-neutral-50 text-neutral-500 flex flex-col gap-4 p-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-full hover:bg-neutral-200 transition"
                    >
                      -
                    </button>
                    <p className="text-sm">{item.quantity}</p>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-full hover:bg-neutral-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-neutral-50 text-neutral-500 flex items-center justify-center">
            No items
          </div>
        )}
        <div className="w-full border-t border-neutral-300 p-5 flex flex-col gap-2">
          {/* Subtotal Row */}
          <div className="w-full flex items-center justify-between">
            <p className="text-body font-semibold">Subtotal</p>
            <p className="text-body font-semibold">₹{subtotal}</p>
          </div>

          {/* Note */}
          <small className="text-sm text-neutral-500">
            Taxes and shipping are calculated at checkout.
          </small>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white text-center py-2 rounded-lg hover:bg-black/80 transition duration-200 mt-2"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;