import React from "react";
import Link from "next/link";
import { FocusCards } from "../ui/focus-cards";

const OurSpecialties = () => {
  return (
    <div className="w-full px-5 lg:px-20 flex flex-col items-center pb-16 relative gap-5">
      <h1 className="text-primary font-semibold">Our Specialities</h1>
      <h3 className="text-neutral-600 font-medium italic text-center">
        Bringing Balance, Restoring Health
      </h3>
      <div className="lg:absolute top-96 flex flex-col sm:flex-row gap-5 lg:flex-col">
        <Link
          href={""}
          className="bg-primary py-2 px-4 rounded-full hover:bg-primary/70 duration-200 text-white"
        >
          Book a Consultation
        </Link>
        <Link
          href={""}
          className="bg-primary py-2 px-4 rounded-full hover:bg-primary/70 duration-200 text-white"
        >
          Explore Our Treatments
        </Link>
      </div>
      {/* <p className="max-w-xl text-link text-center mt-4">
        Providing holistic treatment for neurological disorders and long-term
        health conditions using ancient Ayurvedic wisdom.
      </p> */}

      <FocusCards />
    </div>
  );
};

export default OurSpecialties;
