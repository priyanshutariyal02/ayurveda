import { achievements } from "@/constants/constant";
import Image from "next/image";
import React from "react";

const OurAchievements = () => {
  return (
    <div className="w-full py-10 lg:py-16 px-5 lg:px-28 text-gray-800 flex flex-col lg:flex-row gap-14 items-center">
      {/* Text Section */}
      <div className="w-full flex flex-col items-start">
        <h1 className="text-h2-display leading-tight">
          Our <span className="text-green-600 italic">Achievements</span>
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mt-4">
          Tulsi Ayurveda has successfully treated thousands of patients with
          chronic conditions, pioneered Ayurvedic neurological treatments,
          expanded globally, developed unique herbal formulations, and promoted
          sustainable healing practices.
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-3 gap-10 mt-10 justify-center">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border flex flex-col items-center justify-center w-44 p-3"
            >
              <h3 className="text-h3 text-gray-600">{item.value}+</h3>
              <p className="text-gray-500 text-link text-center mt-2 px-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1495461199391-8c39ab674295?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Achievements"
          width={1000}
          height={1000}
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default OurAchievements;
