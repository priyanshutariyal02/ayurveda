"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type TimeSlot = {
  time: string;
  isBooked: boolean;
};

const initialTimeSlots: TimeSlot[] = [
  { time: "10:00 am", isBooked: false },
  { time: "10:30 am", isBooked: false },
  { time: "11:00 am", isBooked: false },
  { time: "11:30 am", isBooked: false },
  { time: "4:30 pm", isBooked: false },
  { time: "5:00 pm", isBooked: false },
  { time: "5:30 pm", isBooked: false },
  { time: "6:00 pm", isBooked: false },
];

const AppointmentForm = ({
  setIsOpen,
}: {
  setIsOpen: (value: string) => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);

  // ✅ Extract date details directly from `date`
  const weekName = date?.toLocaleDateString("en-US", { weekday: "long" }) || "";
  const day = date?.getDate().toString() || "";
  const month = date?.toLocaleDateString("en-US", { month: "long" }) || "";
  const year = date?.getFullYear().toString() || "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle date selection directly
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormData({
        ...formData,
        date: `${day} ${month} ${year}`,
      });
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleTimeSelect = (selectedTime: string) => {
    const updatedSlots = timeSlots.map((slot) => ({
      ...slot,
      isBooked: slot.time === selectedTime,
    }));
    setTimeSlots(updatedSlots);
    setFormData({ ...formData, time: selectedTime });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setIsOpen("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });
    setTimeSlots(initialTimeSlots);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
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

      {/* Email */}
      <div>
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

      {/* Phone */}
      <div>
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

      {/* Date and Time */}
      <div className="flex gap-5 flex-col lg:flex-row">
        {/* Date */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="flex gap-5 border p-3 rounded-lg items-center justify-around mt-2 flex-col sm:flex-row">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rdp-month_caption:justify-center"
            />
            {date && (
              <div className="p-4 border rounded-lg bg-stone-50">
                <h2 className="font-semibold text-gray-800">{weekName.slice(0,3)}</h2>
                <h4 className="text-gray-600 mt-1">
                  {day} {month} {year}
                </h4>
              </div>
            )}
          </div>
        </div>

        {/* Time Slot */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Time Slot
          </label>
          <div className="w-full flex flex-wrap gap-3 mt-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTimeSelect(slot.time)}
                disabled={slot.isBooked}
                className={`border py-2 w-24 px-2 rounded-lg ${
                  slot.isBooked
                    ? "bg-primary/10 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 cursor-pointer"
                } ${
                  formData.time === slot.time
                    ? "border-primary text-primary"
                    : "border-neutral-300"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
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

      {/* Buttons */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => setIsOpen("")}
          className="bg-neutral-200 hover:bg-gray-300 px-4 py-2 rounded-md mr-2"
        >
          Close
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/70 duration-200"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
