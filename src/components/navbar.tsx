"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import NavbarExpanded from "./ui/navbar-expended";
import NavbarSimple from "./ui/navbar-simple";

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const Navbar = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 10);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`h-12 ${className}`}>
      <NavbarExpanded className={cn("navbar")} />
      <NavbarSimple
        isScrolled={isScrolled}
        className={`
            duration-100 ${isScrolled ? "opacity-100" : "opacity-0"}
          `}
      />
    </div>
  );
};

export default Navbar;
