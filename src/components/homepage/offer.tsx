import React from "react";
import Image from "next/image";
import Link from "next/link";

const Offer = () => {
  return (
    <div className="w-full flex items-center justify-center pb-16">
      <div className="w-full grid md:grid-cols-2 items-center bg-gradient-to-r from-white to-orange-50 p-8">
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
        <div className="flex flex-col justify-center gap-10">
          <h1 className="text-h1 max-w-4xl text-primary">
            Buy 5 Vatahari Oil & Get{" "}
            <span className="text-neutral-700">15% Off</span>
          </h1>
          <div className="">
            <Link
              href="/"
              className="mt-6 px-6 py-3 bg-primary text-black font-semibold rounded-full hover:bg-primary/70 transition-all"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
