"use client";
import { useState, useEffect } from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { Product, products } from "@/constants/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // For toast notifications

const Shop = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]); // Use `product` instead of `item`
    }
    toast.success("Product added to cart! Check out your cart to proceed."); // Show a toast notification
  };

  // Check if a product is in the cart
  const isProductInCart = (productId: number) => {
    return cart.some((item) => item.id === productId);
  };

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
              className="w-full h-full flex flex-col justify-between gap-5 rounded-xl"
              // onClick={() => router.push(`/shop/${item.id}`)}
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
                  className={`border font-medium border-background text-background px-4 py-2 rounded-lg transition-all duration-200 ${
                    isProductInCart(item.id)
                      ? "bg-black/80 text-white" // Faded black when added
                      : "hover:bg-background hover:text-white" // Default style
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  {isProductInCart(item.id) ? "Add More" : "Add to Bag"}
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