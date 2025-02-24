import { ourProducts } from "@/constants/constant";
import { head } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurProducts = () => {
  return (
    <div className="w-full px-20 flex flex-col items-center pb-16 ">
      <p className="text-body font-semibold text-primary">Our Products</p>
      <h1 className="text-h2-display">
        Pure & Natural <span className="text-green-600 italic">Ayurvedic</span>{" "}
        Essential
      </h1>
      <p className="max-w-6xl text-link text-center mt-4">
        Explore our range of meticulously designed products, created to enhance
        your lifestyle with quality, innovation, and style. Each piece is
        thoughtfully crafted to deliver exceptional performance and lasting
        value.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-10 mt-10">
        {ourProducts.map((item) => (
          <div
            key={item.title}
            className="border p-5 rounded-xl flex flex-col gap-5"
          >
            <div className="flex justify-between items-center">
              <h4>{item.title}</h4>
              <Link
                href={item.link}
                className="bg-gray-800 text-white px-4 py-1 rounded-xl hover:bg-gray-600 duration-200 transition-all ease-in-out"
              >
                Shop
              </Link>
            </div>
            <Image
              src={item.img}
              alt={item.title}
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
