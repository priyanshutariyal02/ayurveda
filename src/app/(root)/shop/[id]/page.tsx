"use client";
import { products } from "@/constants/constant";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="text-center text-red-600 text-xl">Product not found!</div>
    );
  }

  return (
    <div className="w-full min-h-screen px-5 lg:px-16 py-16 text-gray-900">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1">
          <Image
            src={product.img}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.sub}</p>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
            {product.tag}
          </span>
          <p className="text-lg font-medium">Size: {product.size}</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{product.price}.00
          </p>

          {/* Add to Bag Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
