// components/AppointmentForm.js
"use client";
import React, { useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const guideLine = [
  {
    title: "Rescheduling Policy",
    desc: "If a patient misses the consultation, they are allowed to reschedule only once. Further rescheduling will require a new booking.",
  },
  {
    title: "Follow-Up Consultation Fee",
    desc: "After the initial consultation, the follow-up consultation will be charged at ₹300.",
  },
  {
    title: "Cancellation Policy",
    desc: "Appointments once booked are non-refundable. However, rescheduling is allowed as per the above policy.",
  },
  {
    title: "Timely Attendance",
    desc: "Patients are requested to join the consultation on time. A delay of more than 10 minutes may result in the session being marked as missed.",
  },
];

const AppointmentForm = ({
  setIsOpen,
}: {
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Your Name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Your Email"
          required
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <ReactPhoneInput
          country={"us"}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputClass="mt-1 p-2 border rounded-md w-full"
          containerClass="w-full"
          inputStyle={{ width: "100%", borderColor: "#e5e7eb" }}
        />
      </div>
      <div className="w-full mb-4 gap-5 flex items-center justify-between ">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            aria-label="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            aria-label="time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Message (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Your Message"
        />
      </div>
      {/* appointment guidelines */}
      <div>
        <h3 className="mb-4">Appointment Booking Guidelines</h3>
        <div className="w-full grid grid-cols-2 gap-5">
          {guideLine.map((item) => (
            <div
              key={item.title}
              className="w-full h-full border rounded-xl p-5 bg-neutral-50"
            >
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => setIsOpen("")}
          className="bg-neutral-300 hover:bg-neutral-200 border duration-300 px-4 py-2 rounded-md mr-2"
        >
          Close
        </button>
        <button
          type="submit"
          className="bg-background text-white px-4 py-2 rounded-md hover:bg-background/70 duration-200"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
