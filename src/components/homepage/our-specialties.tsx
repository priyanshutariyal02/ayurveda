import React from "react";
import Link from "next/link";
import { FocusCards } from "../ui/focus-cards";

const OurSpecialties = () => {
  return (
    <div className="w-full px-20 flex flex-col items-center pb-16 relative">
      <div className="absolute top-96 flex flex-col gap-5">
        <Link
          href={""}
          className="bg-primary py-2 px-4 rounded-full hover:bg-primary/70 duration-200 text-white"
        >
          Book a Consultation
        </Link>
        <Link
          href={""}
          className="bg-primary py-2 px-4 rounded-full hover:bg-primary/70 duration-200 text-white"
        >
          Explore Our Treatments
        </Link>
      </div>
      <h1 className="text-primary font-semibold">Our Specialities</h1>
      <h3 className="text-neutral-600 font-medium italic">
        Bringing Balance, Restoring Health
      </h3>
      {/* <p className="max-w-xl text-link text-center mt-4">
        Providing holistic treatment for neurological disorders and long-term
        health conditions using ancient Ayurvedic wisdom.
      </p> */}

      <FocusCards/>
      {/* <div className="w-full grid grid-cols-5 gap-2">
        <div className="w-full h-full grid grid-rows-3">
          <div className="row-span-2 w-full h-full  flex items-center justify-center">
            <div className="w-full h-full relative">
              <Image
                src={s1}
                alt=""
                width={600}
                height={600}
                className="object-contain w-full h-full"
              />
              <div className="hidden hover:flex w-full z-50 flex-col absolute top-0">
                <h4>Arthritis</h4>
                <p>
                  Arthritis causes joint pain and stiffness. Tulsi Ayurveda
                  treats it with herbs, detox, and lifestyle changes for
                  natural, lasting relief.
                </p>
              </div>
            </div>
          </div>
          <div className="row-span-1 bg-amber-50"></div>
        </div>
        <div className="w-full h-full grid grid-rows-3">
          <div className="row-span-1"></div>
          <div className="row-span-2">
            <div className="w-full h-full relative">
              <Image
                src={s2}
                alt=""
                width={600}
                height={600}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full grid grid-rows-3">
          <div></div>
          <div></div>
          <div className="w-full h-full">
            <Image
              src={s3}
              alt=""
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="w-full h-full grid grid-rows-3">
          <div className="row-span-1"></div>
          <div className="row-span-2">
            <Image
              src={s4}
              alt=""
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="w-full h-full grid grid-rows-3">
          <div className="row-span-2 w-full h-full">
            <Image
              src={s5}
              alt=""
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="row-span-1 bg-gray-100"></div>
        </div>
      </div> */}
      {/* <div className="w-full grid grid-cols-5 gap-2">
        <div className="grid grid-rows-3 gap-2">
          <div className="w-full">
            <Image
              src={s1}
              alt=""
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />{" "}
          </div>
          <div className="border-2 border-primary/50 flex flex-col justify-center rounded-b-3xl p-5 gap-5">
            <h4>Arthritis</h4>
            <p>
              Arthritis causes joint pain and stiffness. Tulsi Ayurveda treats
              it with herbs, detox, and lifestyle changes for natural, lasting
              relief.
            </p>
          </div>
          <div className=" w-full">
            <Image
              src={s2}
              alt=""
              width={600}
              height={600}
              className="object-contain rounded-l-3xl w-full h-full"
            />{" "}
          </div>
        </div>
        <div className="w-full grid grid-rows-3 gap-2">
          <div className="border-2 border-primary/50 flex flex-col justify-center p-5 gap-5">
            <h4>Psoriasis</h4>
            <p>
              Psoriasis is a skin condition with red, scaly patches. Ayurveda
              treats it using herbal remedies, Panchkarma, and dietary changes
            </p>
          </div>

          <div className="w-full">
            <Image
              src={s3}
              alt=""
              width={600}
              height={600}
              className="object-contain rounded-b-3xl w-full h-full"
            />{" "}
          </div>
          <div className="border-2 border-primary/50 flex flex-col justify-center rounded-r-3xl p-5 gap-5">
            <h4>Infertility</h4>
            <p>
              Infertility is the inability to conceive. Tulsi Ayurveda treats it
              naturally with herbs, detox, and lifestyle changes.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-rows-3 gap-2">
          <div className="row-span-1"></div>
          <div className="border-2 border-primary/50 flex flex-col justify-center p-5 gap-5">
            <h4>Piles</h4>
            <p>
              Piles are swollen veins in the rectum or anus, causing pain,
              bleeding, and discomfort, often treated with Ayurveda and
              lifestyle changes.
            </p>
          </div>

          <div className="w-full">
            <Image
              src={s4}
              alt=""
              width={600}
              height={600}
              className="object-contain rounded-b-3xl w-full h-full"
            />{" "}
          </div>
        </div>
        <div className="w-full grid grid-rows-3 gap-2">
          <div className="row-span-1"></div>
          <div className="border-2 border-primary/50 flex flex-col justify-center p-5 gap-5">
            <h4>PCOD</h4>
            <p>
              PCOD causes hormonal imbalance, irregular periods, and weight
              gain, managed with Ayurveda and lifestyle changes.
            </p>
          </div>
          <div className="w-full">
            <Image
              src={s5}
              alt=""
              width={600}
              height={600}
              className="object-contain rounded-b-3xl w-full h-full"
            />{" "}
          </div>
        </div>
        <div className="w-full grid grid-rows-3 gap-2">
          <div className=""></div>
          <div className="w-full">
            <Image
              src={s6}
              alt=""
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />{" "}
          </div>
          <div className="border-2 border-primary/50 flex flex-col justify-center rounded-b-3xl p-5 gap-5">
            <h4>PCOD</h4>
            <p>
              PCOD causes hormonal imbalance, irregular periods, and weight
              gain, managed with Ayurveda and lifestyle changes.
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10">
        {ourSpecialties.map((item) => (
          <div
            key={item.title}
            className="relative p-5 rounded-2xl flex flex-col justify-between gap-3 bg-neutral-50"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-800 font-medium">
                {item.title}
              </h3>
              <p className="text-link text-gray-600">{item.description}</p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Lens
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel="Zoom Area"
              >
                <Image
                  src={item.img}
                  alt="image placeholder"
                  width={500}
                  height={500}
                />
              </Lens>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default OurSpecialties;
