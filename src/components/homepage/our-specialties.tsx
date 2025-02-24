import { ourSpecialties } from "@/constants/constant";
import Image from "next/image";
import React from "react";
import { Lens } from "../ui/lens";

const OurSpecialties = () => {
  return (
    <div className="w-full px-20 flex flex-col items-center pb-16 ">
      <p className="text-body font-semibold text-primary">Our Specialties</p>
      <h1 className="text-h2-display">
        What are we <span className="text-green-600 italic">Specialised</span>{" "}
        in?
      </h1>
      <p className="max-w-6xl text-link text-center mt-4">
        Providing holistic treatment for neurological disorders and long-term
        health conditions using ancient Ayurvedic wisdom.
      </p>
      <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10">
        {ourSpecialties.map((item) => (
          <div
            key={item.title}
            className="relative p-5 rounded-2xl flex flex-col justify-between gap-3 bg-neutral-50"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-800 font-medium">
                {item.title}
              </h3>
              <p className="text-link text-gray-600">{item.description}</p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Lens
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel="Zoom Area"
              >
                <Image
                  src={item.img}
                  alt="image placeholder"
                  width={500}
                  height={500}
                />
              </Lens>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurSpecialties;
