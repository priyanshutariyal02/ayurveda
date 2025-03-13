import React from "react";
import Image from "next/image";
import yoga from "../../app/assets/yoga.png";
import Link from "next/link";
const Experience = () => {
  return (
    <div className="my-10 py-10 w-full px-5 lg:px-20 flex flex-col lg:flex-row bg-gradient-to-r from-white to-orange-50">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Image
          src={yoga}
          alt="yoga"
          width={600}
          height={600}
          className=" drop-shadow-xl"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center flex-col gap-5 mt-8 lg:mt-0">
        <h2 className="text-center font-semibold italic text-primary">
          "Experience the Healing Power of Ayurveda"
        </h2>
        <p className="text-center text-body text-neutral-600 max-w-xl">
          Tulsi Ayurveda brings you time-tested Ayurvedic treatments, herbal
          products, and holistic wellness solutions for a balanced life.
        </p>
        <Link
          href={"/appointment"}
          className="mt-4 text-mini uppercase rounded-full bg-primary hover:bg-primary/70 text-white py-3 px-6 duration-150 shadow-md"
        >
          Book Your Consultation
        </Link>
      </div>
    </div>
  );
};

export default Experience;
