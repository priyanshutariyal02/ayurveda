import { navItems } from "@/constants/navItems";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) => {
  return (

      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[90vw] bg-white text-black transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Close Button */}
        <button
          aria-label="close"
          type="button"
          className="absolute top-4 right-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IconX className="w-7 h-7 text-black" />
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col items-start pl-8 pt-10 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-sm py-2 hover:text-blue-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
  );
};

export default SidebarMenu;
