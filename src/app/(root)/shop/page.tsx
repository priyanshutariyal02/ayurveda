"use client";
import SmoothScroll from "@/components/smooth-scroll";
import { Product, products } from "@/constants/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Shop = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  console.log(cart);

  return (
    <SmoothScroll>
      <div className="w-full px-5 lg:px-16 py-16 text-gray-900">
        <h1 className="text-h2-display text-center text-gray-700 mb-5 lg:mb-10">
          All Products
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="w-full h-full flex flex-col justify-between gap-5 rounded-xl cursor-pointer"
              onClick={() => router.push(`/shop/${item.id}`)}
            >
              <div className="relative w-full flex flex-col justify-between gap-4">
                {item.tag === "New Offer" && (
                  <p className="absolute top-3 left-3 bg-green-100 border border-secondary-green font-semibold text-secondary-green text-sm px-2 py-1 rounded-full">
                    {item.tag}
                  </p>
                )}
                <Image
                  src={item.img}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="rounded-lg w-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-link font-semibold mt-2">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Size: {item.size}</p>
                <p className="text-link font-medium">₹{item.price}.00</p>
                <button
                  type="button"
                  className="border font-medium border-background text-background px-4 py-2 rounded-lg hover:bg-background hover:text-white transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Shop;
