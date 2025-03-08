"use client";

import Image from "next/image";
import React, { useState } from "react";

import c1 from "../../assets/c1.avif";
import c2 from "../../assets/c2.avif";
import c3 from "../../assets/c3.avif";

import SmoothScroll from "@/components/smooth-scroll";
import { offCoursesList, onCoursesList } from "@/constants/constant";
import Link from "next/link";

const Courses = () => {
  const [active, setActive] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setActive(id);
  };
  return (
    <SmoothScroll>
      <div className="w-full px-5 lg:px-16 py-20 relative">
        <div className="w-full flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-h2-display text-background max-w-5xl font-semibold">
            Empower Yourself with Ayurveda - Learn, Heal, Thrive!
          </h1>
          <p className="text-body text-neutral-800">It&apos;s Time to Grow</p>
          <p className="max-w-2xl text-link text-neutral-800">
            Tulsi Ayurveda offers expert-led Ayurvedic courses, blending ancient
            wisdom with modern learning. Learn online through engaging,
            easy-to-follow lessons and transform your health naturally
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => scrollToSection("online")}
              className="border px-5 py-2.5 rounded-full border-background hover:text-white hover:bg-background duration-200"
            >
              Online Courses
            </button>
            <button
              onClick={() => scrollToSection("offline")}
              className="border px-5 py-2.5 rounded-full border-background hover:text-white hover:bg-background duration-200"
            >
              Offline Courses
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-evenly gap-10 py-20 relative">
          <Image
            src={c1}
            alt="c1"
            width={500}
            height={500}
            className="w-[20rem] drop-shadow-lg object-cover rounded-xl"
          />
          <Image
            src={c2}
            alt="c2"
            width={500}
            height={500}
            className="w-[30rem] lg:absolute -bottom-7 z-20 object-cover drop-shadow-lg rounded-xl"
          />
          <Image
            src={c3}
            alt="c3"
            width={500}
            height={500}
            className="w-[20rem] drop-shadow-lg object-cover rounded-xl"
          />
        </div>

        <div
          className="lg:mt-28 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
          id="online"
        >
          <div className="w-full max-w-7xl">
            <h3 className="mb-12 font-semibold text-center text-h4">
              Online Courses List
            </h3>
            <div className="w-full flex flex-wrap items-center justify-center gap-12">
              {onCoursesList.map((course) => (
                <div
                  key={course.name}
                  className="w-[26rem] bg-neutral-100 rounded-xl p-5 flex flex-col justify-between items-start gap-4 drop-shadow-lg"
                >
                  <Image
                    src={course.img}
                    alt={course.name}
                    width={500}
                    height={500}
                    className="rounded-xl w-full object-cover"
                  />
                  <h4 className="text-lg font-semibold">{course.name}</h4>
                  <p className="text-link text-neutral-700">{course.desc}</p>
                  <Link
                    href={course.link}
                    className="bg-background hover:bg-background/70 duration-200 px-4 py-2 text-mini text-white rounded-xl"
                  >
                    Enroll Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 lg:mt-28 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
          id="offline"
        >
          <div className="w-full max-w-7xl">
            <h3 className="mb-12 font-semibold text-center text-h4">
              Offline Courses List
            </h3>
            <div className="flex flex-wrap items-start justify-center gap-12">
              {offCoursesList.map((course) => (
                <div
                  key={course.id}
                  className="bg-neutral-100 w-[26rem] rounded-xl p-5 flex flex-col items-start gap-5 drop-shadow-lg"
                >
                  <h4 className="text-body font-semibold text-left w-full">
                    {course.name}
                  </h4>
                  <Image
                    src={course.img}
                    alt={course.name}
                    width={500}
                    height={300}
                    className="rounded-xl w-full h-[10rem] object-cover"
                  />
                  <p className="text-gray-700 text-link">{course.desc}</p>
                  <div>
                    <p className="text-body text-secondary font-semibold">
                      ₹{course.price}/-
                    </p>
                    <p className="text-sm font-semibold">{course.sub}</p>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="bg-background hover:bg-background/70 text-white text-mini px-4 py-2 rounded-xl transition-colors duration-200"
                  >
                    Enroll Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Courses;
