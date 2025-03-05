import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const CartSidebar = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}) => {
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
        <h4>Cart ({0} item)</h4>
        <hr className="mt-3 border-neutral-300 w-full" />
        <div className="w-full h-full bg-neutral-50 text-neutral-500 flex items-center justify-center">No item</div>
        <div className="w-full border-t border-neutral-300 p-5 flex flex-col gap-2">
          {/* Subtotal Row */}
          <div className="w-full flex items-center justify-between">
            <p className="text-body font-semibold">Subtotal</p>
            <p className="text-body font-semibold">₹0</p>
          </div>

          {/* Note */}
          <small className="text-sm text-neutral-500">
            Taxes and shipping are calculated at checkout.
          </small>

          {/* Checkout Button */}
          <Link
            href="/"
            className="w-full bg-black text-white text-center py-2 rounded-lg hover:bg-black/80 transition duration-200 mt-2"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
