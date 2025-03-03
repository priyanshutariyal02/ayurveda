"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { Menu } from "./navbar-menu";
import { navItems } from "@/constants/navItems";
import { IconShoppingBag, IconMenu2, IconX } from "@tabler/icons-react";
import LoginDialog from "../homepage/login-dialog";

const NavbarExpanded = ({ className }: { className?: string }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <NavigationMenu
      className={cn(
        "relative transition-all duration-300 ease-in-out h-auto z-40",
        className
      )}
    >
      {(isSidebarOpen || isCartOpen) && (
        <div className="fixed inset-y-0 w-full top-0 left-0 bg-background/80 z-50"></div>
      )}
      <div className="flex items-center justify-between mx-auto max-w-screen-xl px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-body font-bold">
          Logo
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex text-link">
          <Menu className="flex items-center gap-6">
            {navItems.slice(0, navItems.length - 1).map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:bg-background hover:text-white py-1 px-3 rounded-full transition-all duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </Menu>
        </div>

        {/* Actions (Cart & Login) */}
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <div className="relative">
            <span className="bg-secondary rounded-full flex items-center justify-center text-xs w-4 h-4 absolute top-0 -right-2 font-semibold text-white">
              0
            </span>
            <IconShoppingBag
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="w-7 h-7 text-background cursor-pointer hover:text-background/70 duration-200"
            />
          </div>

          {/* Login Button */}
          <LoginDialog />

          {/* Contact Button */}
          <Link
            href="/contact"
            className="border hidden lg:block border-black px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Contact
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label="menu"
            className="lg:hidden p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IconMenu2 className="w-7 h-7 text-background" />
          </button>
        </div>
      </div>

      {/* Cart Sidebar */}
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

      {/* Sidebar Menu (Mobile) */}
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
    </NavigationMenu>
  );
};

export default NavbarExpanded;
