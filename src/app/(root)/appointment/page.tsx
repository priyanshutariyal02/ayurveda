"use client";
import React, { useState } from "react";

import SmoothScroll from "@/components/smooth-scroll";
import AppointmentCard from "./components/appointment-card";
const Appointment = () => {
  const [isOpen, setIsOpen] = useState<string>("");
  return (
    <div className="w-full px-5 lg:px-16 py-16">
      {!isOpen ? (
        <SmoothScroll>
          <AppointmentCard isOpen={isOpen} setIsOpen={setIsOpen} />
        </SmoothScroll>
      ) : (
        <AppointmentCard isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Appointment;
