import About from "@/components/homepage/about";
import Hero from "@/components/homepage/hero";
import OurProducts from "@/components/homepage/our-porducts";
import OurSpecialties from "@/components/homepage/our-specialties";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="w-full">
      {/* Ensure proper spacing */}
      <div className="relative -top-12">
        <Hero />
      </div>
      {/* Add margin to avoid overlapping */}
      <About />
      <OurSpecialties />
      <OurProducts />
      <div className="w-full flex items-center justify-center pb-16">
        <div className="w-full grid md:grid-cols-2 items-center bg-[#183225] p-8 shadow-lg">
          {/* Product Image with Filter */}
          <div className="flex justify-center relative">
            <Image
              src="https://static.wixstatic.com/media/ff7094_56805a6bd80e44f78029833d5cdcf21d~mv2.png/v1/fill/w_745,h_696,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png"
              alt="Vatahari Oil"
              width={1000}
              height={1000}
              className="w-[40rem] max-w-full filter brightness-110 contrast-125 drop-shadow-lg rounded-3xl relative top-20"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center gap-10 text-white">
            <h1 className="text-h1 max-w-4xl text-white">
              Buy 5 Vatahari Oil & Get{" "}
              <span className="text-yellow-400">15% Off</span>
            </h1>
            <div className="">
              <Link
                href="/"
                className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-500 transition-all"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
