"use client";
import SmoothScroll from "@/components/smooth-scroll";
import React, { useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AppointmentForm from "./appointment-form";



const BookAppointment = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: string;
  setIsOpen: (value: string) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend API
    console.log("Form Data:", formData);
    // After successful submission, you might want to close the modal and reset the form
    setIsOpen("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <div
      className={`fixed z-50 inset-0  bg-black bg-opacity-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="bg-white py-5 lg:pl-5 lg:pr-2 rounded-lg lg:w-full max-w-7xl overflow-hidden h-[80vh] w-[90%]">
        <div className="w-full h-full overflow-y-auto p-5 group">
          <div className="mb-4">
            <h2 className="font-semibold text-neutral-700">Initial Consultation - {isOpen}</h2>
            <p className="text-link">
              Check out our availability and book the date and time that works
              for you
            </p>
          </div>
          <AppointmentForm setIsOpen={setIsOpen} />

         
        
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
