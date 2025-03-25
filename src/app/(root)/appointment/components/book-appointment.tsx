"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import AppointmentForm from "./appointment-form";
import { useRouter } from "next/navigation";

const BookAppointment = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: string;
  setIsOpen: (value: string) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className={`fixed z-50 inset-0  bg-black bg-opacity-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="bg-white py-5 lg:pl-5 lg:pr-2 rounded-lg lg:w-full max-w-7xl overflow-hidden h-[80vh] w-[95%]">
        <div className="w-full h-full overflow-y-auto p-5 group">
          <div className="mb-4">
            <h2 className="font-semibold text-neutral-700">
              Initial Consultation -{" "}
              {isOpen === "ankit_agarwal" ? "Ankit Agarwal" : "Anshika"}
            </h2>
            <p className="text-link">
              Check out our availability and book the date and time that works
              for you
            </p>
          </div>
          <AppointmentForm
            setIsOpen={setIsOpen}
            router={router}
            doctorId={isOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
