import { ourProducts } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurProducts = () => {
  return (
    <div className="w-full px-5 lg:px-20 flex flex-col items-center pb-16 ">
      <h1 className="text-primary font-semibold">Our Products</h1>
      <h3 className="text-neutral-600 font-medium italic text-center">
        Pure & Natural Ayurvedic Essential
      </h3>
      {/* <p className="max-w-xl text-link text-center mt-4">
        Explore our range of meticulously designed products, created to enhance
        your lifestyle with quality, innovation, and style. Each piece is
        thoughtfully crafted to deliver exceptional performance and lasting
        value.
      </p> */}

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10 mt-10">
        {ourProducts.map((item) => (
          <div
            key={item.title}
            className="w-full h-full border border-gray-300 rounded-xl p-5 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <Link
                href={item.link}
                className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-600 hover:scale-105 transition-all"
              >
                Shop
              </Link>
            </div>
            <div className="w-full aspect-[4/3] relative">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
