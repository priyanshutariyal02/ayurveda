"use client";

import SmoothScroll from "@/components/smooth-scroll";
import { offCoursesList } from "@/constants/constant";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import EnrollNow from "../components/enroll-now";

const CoursePage = () => {
  const { id } = useParams();
  const course = offCoursesList.find((item) => item.id === Number(id));

  return (
    <SmoothScroll>
      <div className="w-full min-h-screen flex flex-col items-center py-10 px-4 sm:px-8 md:px-12 lg:px-16">
        {!course ? (
          <div className="flex flex-col justify-center items-center text-center mt-28">
            <h2 className="text-2xl font-semibold">Course not found!</h2>
          </div>
        ) : (
          <div className="w-full max-w-7xl bg-neutral-50 rounded-lg p-6 md:p-10">
            <div className="flex flex-col items-center text-center gap-6">
              <h1 className="text-3xl md:text-4xl font-bold">{course.name}</h1>
              <div className="w-full rounded-lg overflow-hidden">
                <Image
                  src={course.img}
                  alt={course.name}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <section className="text-center">
                <h2 className="text-h3 font-semibold">About The Course</h2>
              </section>

              <section className="space-y-6">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-h4 font-semibold">{course.q1}</h4>
                  <p className="leading-relaxed mt-2 text-link">
                    {course.ans1}
                  </p>
                </div>

                {course.page.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <h4 className="text-h4 font-semibold">{item.q}</h4>
                    <div className="space-y-6 mt-4">
                      <div className="text-link">
                        <h5 className="text-body font-semibold">Theory</h5>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {item.ans.theory.map((points, i) => (
                            <li key={i}>{points}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-link">
                        <h5 className="text-body font-semibold">
                          Practical Training
                        </h5>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {item.ans.practical.map((points, i) => (
                            <li key={i}>{points}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <section className="flex flex-col md:flex-row justify-between items-center bg-secondary/20 p-6 rounded-lg">
                <div className="text-link">
                  <p className="mb-1 text-body">
                    <span className="font-bold">Price: </span>₹{course.price2}/-
                  </p>
                  <p className="text-link">
                    [₹20000 (Course Fee) + ₹5000 (Registration Fee)]
                  </p>
                </div>
                {/* <Link
                  href="/"
                  className="mt-4 md:mt-0 bg-secondary hover:bg-secondary/70 text-white px-6 py-2 rounded-lg duration-200"
                >
                  Enroll Now
                </Link> */}
                <EnrollNow course={course.name} />
              </section>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
};

export default CoursePage;
