"use client";
import Image from "next/image";
import React from "react";
import a1 from "../../assets/a1.avif";
import Link from "next/link";
import { motion } from "framer-motion";
import { about, gallery } from "@/constants/constant";
import vm from "../../assets/vm.png";
import Slider from "react-slick";
import SmoothScroll from "@/components/smooth-scroll";

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <SmoothScroll>
      <div className="w-full px-5 lg:px-16 py-16">
        <div className="w-full flex flex-col justify-center items-center gap-12">
          <h1 className="text-h2-display text-center text-background">
            About Us
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            <Image
              src={a1}
              alt="About Us"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/4"
          >
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {about.map((item, index) => (
                <motion.li
                  key={index}
                  className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-secondary hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.heading}
                  </h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={"/appointment"}
            className="px-8 py-3 text-lg font-medium bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all"
          >
            Consult Now
          </Link>
        </motion.div>
        <section className="w-full flex flex-col items-center">
          {/* Large screens */}
          <div className="hidden lg:flex justify-center items-center w-full px-16">
            <Image
              src={vm}
              alt="Vision and Mission"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Below lg screens */}
          <div className="lg:hidden flex flex-col items-center justify-center w-full px-6 py-12 space-y-8">
            <div className="w-full p-6 border-l-4 border-primary bg-primary/5 rounded-lg">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a global leader in holistic health and wellness by
                offering authentic Ayurvedic treatments and therapies that
                restore balance and promote overall well-being. We envision a
                world where traditional Ayurvedic knowledge and modern medical
                practices unite to enhance the quality of life for all.
              </p>
            </div>

            <div className="w-full p-6 border-l-4 border-secondary-green bg-secondary-green/5 rounded-lg">
              <h2 className="text-2xl font-semibold text-secondary-green mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission at{" "}
                <span className="font-semibold">Tulsi Ayurveda Clinic</span> is
                to provide personalized and comprehensive Ayurvedic healthcare
                solutions that cater to the unique needs of each individual. We
                are also on a mission to train and nurture more{" "}
                <span className="font-semibold">Vaidyas</span> in society,
                ensuring Ayurveda is not just seen as an alternative treatment
                but as a primary healthcare system.
              </p>
            </div>
          </div>
        </section>
        <div className="w-full mt-12">
          <div className="w-full flex flex-col items-center mb-10">
            <h1 className="text-h2-display leading-tight ">
              Glimpses of <span className="text-green-600 italic">Tuslsi</span>{" "}
              Ayurveda
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mt-4 md:text-center">
              Tulsi Ayurveda blends ancient wisdom with modern wellness to
              restore balance in mind, body, and spirit. With personalized
              treatments and expert guidance, we help you embrace Ayurveda as a
              path to natural healing and well-being.
            </p>
          </div>
          <Slider {...sliderSettings}>
            {gallery.map((img, index) => (
              <div key={index} className="p-4 w-full">
                <div className="w-full flex items-center justify-center flex-col p-6 overflow-hidden bg-white h-[30rem] rounded-xl text-center">
                  <Image
                    src={img.name}
                    alt={"gallery"}
                    className="w-full h-full object-cover rounded-xl"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default About;
