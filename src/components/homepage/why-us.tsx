import Image from "next/image";
import React from "react";
import whyus from "../../app/assets/whyus.png";
const WhyUs = () => {
  return (
    <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row-reverse items-center justify-around px-5 lg:px-20 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-primary text-right">Why Us?</h1>
        </div>
        <div>
          <p className="text-body text-right text-neutral-600 mt-4">
            Choose Tulsi Ayurveda for authentic, result-oriented healing backed
            by ancient wisdom and modern expertise. We offer personalized
            treatments, expert-led training, and exclusive therapies designed
            for lasting well-being. Experience Ayurveda beyond treatment—embrace
            a lifestyle that transforms health naturally.
          </p>
        </div>
      </div>
      <Image
        src={whyus}
        alt="about"
        width={600}
        height={600}
        className="w-[20rem] lg:w-[30rem] drop-shadow-xl opacity-40"
      />
    </div>
  );
};

export default WhyUs;
