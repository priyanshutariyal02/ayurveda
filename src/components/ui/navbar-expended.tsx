"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { Menu } from "./navbar-menu";
import { navItems } from "@/constants/navItems";

const NavbarExpanded = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <NavigationMenu
      className={cn(
        "relative transition-all duration-300 ease-in-out h-auto pt-5 z-50",
        className
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-screen-xl px-4 py-2">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Logo
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex text-white text-link">
          <Menu setActive={setActive} className="flex items-center gap-6">
            {navItems.slice(0, navItems.length - 1).map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:bg-black py-1 px-3 rounded-full transition-all duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </Menu>
        </div>
        <Link
          href={"/"}
          className="border border-black text-black-500 px-6 py-2 rounded-full 
             transition-all duration-300 ease-in-out 
             hover:bg-black hover:border-black hover:text-white "
        >
          Contact
        </Link>
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[90vw] bg-white text-black transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          &times;
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
    </NavigationMenu>
  );
};

export default NavbarExpanded;
