import { achievements } from "@/constants/constant";
import Image from "next/image";
import React from "react";

const OurAchievements = () => {
  return (
    <div className="w-full py-10 lg:py-16 px-5 lg:px-28 text-gray-800 flex flex-col lg:flex-row gap-14 items-center">
      {/* Text Section */}
      <div className="w-full flex flex-col items-center lg:items-start">
        <h1 className="text-primary text-h2-display font-semibold">
          Our Achievements
        </h1>

        <p className="text-body text-gray-700 max-w-2xl mt-4 text-center lg:text-left">
          Tulsi Ayurveda has successfully treated thousands of patients with
          chronic conditions, pioneered Ayurvedic neurological treatments,
          expanded globally, developed unique herbal formulations, and promoted
          sustainable healing practices.
        </p>

        {/* Achievements Grid */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 mt-10">
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
      <div className="w-full relative rounded-2xl overflow-hidden shadow-[0px_0px_200px_-10px_#ffb97c79] rounded-tl-full">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] ">
          <Image
            src="https://images.unsplash.com/photo-1551892589-865f69869476?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Achievements"
            fill
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
