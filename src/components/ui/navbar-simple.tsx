"use client";
import React, { useState } from "react";
import { Menu } from "./navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navItems } from "@/constants/navItems";

const NavbarSimple = ({
  className,
  isScrolled,
}: {
  className: string;
  isScrolled: boolean;
}) => {
  return (
    <div
      className={`relative w-full hidden md:flex items-center justify-center p-2 ${className}`}
    >
      <div
        className={cn(
          `fixed top-4 md:top-4 inset-x-0  max-w-md md:max-w-xl mx-auto z-50`,
          className
        )}
      >
        <Menu
          className={`flex justify-center items-center md:gap-4 text-14px md:text-16px shadow-xl ${
            isScrolled ? "bg-white" : "bg-transparent"
          }`}
        >
          {navItems.slice(0, navItems.length - 1).map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="hover:text-amber-500 rounded-full duration-200"
            >
              {item.name}
            </Link>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default NavbarSimple;
