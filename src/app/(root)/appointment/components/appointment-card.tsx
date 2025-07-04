"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { appointment } from "@/constants/constant";
import { IconVideo } from "@tabler/icons-react";
import BookAppointment from "./book-appointment";
import consultNow from "../../../assets/consultNow.webp";

const AppointmentCard = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: string;
  setIsOpen: (value: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-12">
      <h1 className="text-center text-primary font-semibold">Appontments</h1>
      <div className="w-full flex items-center justify-center px-4 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row gap-10 mx-auto max-w-7xl">
          {appointment.map((item) => (
            <div
              key={item.name}
              className="flex flex-col border rounded-2xl p-3"
            >
              {isOpen && (
                <BookAppointment isOpen={isOpen} setIsOpen={setIsOpen} />
              )}
              <div className="w-full rounded-lg">
                <Image
                  src={consultNow}
                  alt="consult"
                  width={500}
                  height={600}
                  className="w-[20rem] rounded-2xl object-cover"
                />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Initial Consultation - {item.name}
                </h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <IconVideo className="mr-2 text-secondary" />
                  Available Online
                </div>
                <p className="text-gray-500 text-sm">Duration: 30 min</p>
              </div>
              <button
                // href={item.link}
                onClick={() => setIsOpen(item.id)}
                className="mt-4 bg-background text-white font-medium text-center py-2 rounded-lg hover:bg-background/70 duration-200"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
