"use client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Update TimeSlot type to include bookedDates
type TimeSlot = {
  _id: string;
  time: string;
  booked: boolean;
  bookedDates?: string[];
};

const AppointmentForm = ({
  setIsOpen,
  router,
}: {
  setIsOpen: (value: string) => void;
  router: ReturnType<typeof useRouter>;
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

  const [isLoading, setIsLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotsByDate, setSelectedSlotsByDate] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchTimeSlots = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/timeslot");
        if (!res.ok) {
          throw new Error(`Failed to fetch time slots: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched time slots:", data);
        setTimeSlots(data);
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();
  }, []);

  // Extract date details from date
  const weekName = date?.toLocaleDateString("en-US", { weekday: "long" }) || "";
  const day = date?.getDate().toString() || "";
  const month = date?.toLocaleDateString("en-US", { month: "long" }) || "";
  const year = date?.getFullYear().toString() || "";

  // Function to get a consistent date key format
  const getDateKey = (date: Date | undefined) => {
    if (!date) return "";
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Check if a time slot is booked for the current date
  const isSlotBookedForDate = (slot: TimeSlot, dateKey: string) => {
    return slot.bookedDates?.includes(dateKey) || false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const weekName = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const day = selectedDate.getDate().toString();
      const month = selectedDate.toLocaleDateString("en-US", { month: "long" });
      const year = selectedDate.getFullYear().toString();

      // Update form data with selected date
      setFormData({
        ...formData,
        date: `${day} ${month} ${year}`,
        // Maintain time selection if it exists for this date
        time: selectedSlotsByDate[getDateKey(selectedDate)] || "",
      });
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleTimeSelect = (selectedTime: string) => {
    if (!date) return;

    const dateKey = getDateKey(date);

    // Update selected slot for this specific date
    setSelectedSlotsByDate({
      ...selectedSlotsByDate,
      [dateKey]: selectedTime,
    });

    setFormData({ ...formData, time: selectedTime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.time || !date) {
      console.error("Time slot and date are required");
      return;
    }

    // Find the selected slot by time
    const selectedSlot = timeSlots.find((slot) => slot.time === formData.time);
    if (!selectedSlot) {
      console.error("Selected time slot not found in the list");
      return;
    }

    const dateKey = getDateKey(date);
    setIsLoading(true);

    try {
      // First update the time slot to mark it as booked
      const res = await fetch(`/api/timeslot/${selectedSlot._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formData.date,
          dateKey: dateKey,
          booked: true,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || `Failed to book time slot: ${res.status}`
        );
      }

      const data = await res.json();
      console.log("Slot booked:", data);

      // Update local state to reflect the booking
      setTimeSlots(
        timeSlots.map((slot) => {
          if (slot._id === selectedSlot._id) {
            return {
              ...slot,
              bookedDates: [...(slot.bookedDates || []), dateKey],
            };
          }
          return slot;
        })
      );

      // Create an appointment order
      const orderResponse = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentDetails: {
            ...formData,
            timeSlotId: selectedSlot._id,
          },
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Failed to create appointment order: ${orderResponse.status}`
        );
      }

      const orderData = await orderResponse.json();
      console.log("Appointment order created:", orderData);

      // Redirect to the payment page with the order ID and amount
      router.push(
        `/payment?orderId=${orderData._id}&amount=${orderData.amount || 500}`
      );
    } catch (error) {
      console.error("Error during appointment booking process:", error);
      // You may want to add error handling UI here
    } finally {
      setIsLoading(false);
    }
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
                <h2 className="font-semibold text-gray-800">
                  {weekName.slice(0, 3)}
                </h2>
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
          <div className="flex flex-wrap gap-3 mt-2">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {timeSlots.map((slot) => {
                  const currentDateKey = getDateKey(date);
                  const isBookedForCurrentDate = isSlotBookedForDate(
                    slot,
                    currentDateKey
                  );

                  return (
                    <button
                      key={slot._id}
                      type="button"
                      onClick={() => handleTimeSelect(slot.time)}
                      disabled={isBookedForCurrentDate}
                      className={`py-2 px-3 border rounded-md ${
                        isBookedForCurrentDate
                          ? "bg-primary/10 text-gray-400 cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 cursor-pointer"
                      } ${
                        selectedSlotsByDate[currentDateKey] === slot.time
                          ? "border-primary text-primary"
                          : ""
                      }`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </>
            )}
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
          {isLoading ? <Loader /> : "Book Appointment"}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
