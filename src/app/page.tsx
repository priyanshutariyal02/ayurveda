"use client";
import About from "@/components/homepage/about";
import Experience from "@/components/homepage/experience";
import Hero from "@/components/homepage/hero";
import Offer from "@/components/homepage/offer";
import OurAchievements from "@/components/homepage/our-achievements";
import OurProducts from "@/components/homepage/our-porducts";
import OurSpecialties from "@/components/homepage/our-specialties";
import SlideSection from "@/components/homepage/slide-section";
import Testimonials from "@/components/homepage/testimonials";
import WhyUs from "@/components/homepage/why-us";
import SmoothScroll from "@/components/smooth-scroll";
import React from "react";

const Home = () => {
  return (
    <SmoothScroll>
      <div className="w-full bg-white">
        <div className="relative -top-12">
          <Hero />
        </div>
        <SlideSection />
        <Experience />
        <About />
        <WhyUs />
        <OurSpecialties />
        <OurProducts />
        <Offer /> {/* advertisment */}
        <OurAchievements />
        <Testimonials />
      </div>
    </SmoothScroll>
  );
};

export default Home;
