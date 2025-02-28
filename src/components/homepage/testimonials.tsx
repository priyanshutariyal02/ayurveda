"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mythrojan LLC",
      feedback:
        "PrimeVista has transformed our financial operations with accuracy and efficiency. Their team is proactive, reliable, and a true asset to our business.",
      image:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
    {
      name: "Lord of Battles Inc",
      feedback:
        "Exceptional service and deep expertise! PrimeVista ensures seamless bookkeeping and compliance, allowing us to focus on scaling our business.",
      image:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
    {
      name: "Medieworld Europe SL",
      feedback:
        "Timely, precise, and highly professional—PrimeVista has been instrumental in streamlining our accounting processes with unmatched attention to detail.",
      image:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
    {
      name: "Mcavini LLC",
      feedback:
        "A trusted partner for our financial needs! PrimeVista's team is dedicated, responsive, and consistently delivers top-notch solutions.",
      image:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
  ];

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
    <div className="w-full py-5 lg:py-14 px-5 lg:px-28 text-gray-800">
      <div className="w-full flex flex-col lg:items-center lg:justify-center">
        <p className="text-body font-semibold text-primary">Testimonials</p>
        <h1 className="text-h2-display">
          What Our <span className="text-green-600 italic">Clients</span> say?
        </h1>

        <p className="text-link max-w-2xl text-left lg:text-center">
          Our clients&apos; success is our greatest achievement. Hear what they
          have to say about our expertise, accuracy, and commitment to
          excellence.
        </p>
      </div>
      <div className="w-full mt-12">
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="w-full flex items-center justify-center flex-col p-6 shadow-lg rounded-md bg-white h-[20rem] text-center">
                <div className="w-20 h-20 border-4 border-primary rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="text-xl font-semibold">{testimonial.name}</h1>
                <p className="text-link mt-4 mb-4 text-neutral-600">
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <p className="capitalize text-mini text-neutral-500 mt-16 text-center">
          Our users say <strong className="text-primary">Excellent</strong>
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
