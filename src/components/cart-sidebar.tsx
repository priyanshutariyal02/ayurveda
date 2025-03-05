import { IconX } from "@tabler/icons-react";
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
      <div className="p-4">Your cart is empty.</div>
    </div>
  );
};

export default CartSidebar;
