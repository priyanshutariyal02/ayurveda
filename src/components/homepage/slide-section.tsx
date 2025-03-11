"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import exp1 from "../../app/assets/exp1.jpg";
import exp2 from "../../app/assets/exp2.jpg";

interface ExpertData {
  heading: string;
  img: StaticImageData;
  para: string;
  link: string;
}

const expertData: ExpertData[] = [
  {
    heading: "India's Best Ayurvedic Clinic For Chronic Diseases",
    img: exp1,
    para: "Your health is an investment, not an expense. Nourish it naturally with Ayurveda!",
    link: "#",
  },
  {
    heading:
      "Suffering from Piles? Experience Permanent Relief with Tulsi Ayurveda",
    img: exp2,
    para: "Ayurveda treats not just piles or fissures but the root imbalance causing them.",
    link: "#",
  },
  {
    heading: "India's Most Authentic Panchakarma Therapy - Rooted in Tradition",
    img: exp1,
    para: "Healing begins when you listen to your body; Ayurveda helps you understand its language!",
    link: "#",
  },
];

const SlideSection: React.FC = () => {
  return (
    <div className="w-full bg-white text-gray-800 flex items-center justify-center">
      <div className="w-full mx-auto px-5 lg:px-20">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          freeMode={true}
          grabCursor={true}
          loop={true}
        >
          <AnimatePresence
            initial={false}
            custom={{ width: "100%", height: "auto" }}
          >
            {expertData.map((data, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex gap-10 justify-between shadow-lg rounded-2xl overflow-hidden p-6 lg:px-10"
                >
                  <div className="w-full flex flex-col justify-center gap-10">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      Welcome to{" "}
                      <span className="text-primary font-bold">
                        TULSI AYURVEDA
                      </span>
                    </h3>
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
                      {data.heading}
                    </h1>
                    <p className="text-lg text-gray-600">{data.para}</p>
                    <div>
                      <Link
                        href={data.link}
                        className="inline-block mt-4 px-6 py-3 text-white bg-primary rounded-full shadow-md hover:bg-primary-dark transition-all duration-300"
                      >
                        Get in touch
                      </Link>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-h-[50vh] flex justify-end relative"
                  >
                    {/* Gradient Background Behind Image */}
                    <div className="absolute -top-28 -left-28 h-[60rem] w-[400px] bg-gradient-to-b from-[#ffffff] to-[#ffffff] opacity-[20] blur-[50px] flex-shrink-0 z-50" />

                    {/* Image (Higher z-index) */}
                    <Image
                      src={data.img}
                      alt={data.heading}
                      width={500}
                      height={500}
                      className="w-[40rem] h-[40rem] object-cover rounded-xl shadow-md z-0 object-center"
                    />
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </AnimatePresence>
        </Swiper>
      </div>
    </div>
  );
};

export default SlideSection;
