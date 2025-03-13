import Image from "next/image";
import Link from "next/link";
import React from "react";
import aboutImage from "../../app/assets/about.png";

const About = () => {
  return (
    <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row items-center justify-around px-5 lg:px-20 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-primary">About Us</h1>
        </div>
        <div>
          <h3 className="text-neutral-600 font-medium italic">
            Healing Through Nature, Rooted in Tradition.
          </h3>
        </div>
        <div>
          <p className="text-body text-neutral-600 mt-4">
            At Tulsi Ayurveda, we blend ancient Ayurvedic wisdom with modern
            care to restore balance and well-being. Our mission goes beyond
            treatment—we educate, empower, and inspire a holistic lifestyle.
            With a focus on preventive care and nurturing future Vaidyas, we
            strive to make Ayurveda a global healthcare pillar.
          </p>
        </div>
        <div className="mt-5">
          <Link
            href={"/about"}
            className="px-4 py-2 rounded-full text-body text-white hover:bg-primary/70 bg-primary hover:text-white duration-200 transition-all ease-in-out shadow-md"
          >
            Read More
          </Link>
        </div>
      </div>
      <Image
        src={aboutImage}
        alt="about"
        width={600}
        height={600}
        className="w-[20rem] lg:w-[30rem] drop-shadow-xl"
      />
      {/* <div className="w-full flex flex-col py-16 px-6 md:px-20">
        <h1 className="text-h2-display max-w-xl">
          <span className="text-primary">Visionaries</span> Behind Tulsi Ayurveda
        </h1>

        <div className="w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 p-5">
          <div className="w-full md:w-1/2">
            <Image
              src="https://static.wixstatic.com/media/c58084_66d8ac9e4cf540c98936fbfdd5f495e5~mv2.png/v1/fill/w_731,h_582,fp_0.49_0.17,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Green%20and%20White%20Ayurveda%20New%20Year%20Wellness%20Youtube%20Thumbnail-5.png"
              alt="DR ANKIT AGARWAL"
              width={1000}
              height={1000}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-h3 font-semibold text-gray-800">
              Dr. Ankit Agarwal
            </h2>
            <p className="text-lg text-gray-600 leading-8">
              Dr. Ankit Agarwal, a 3rd-generation Vaidya, is a distinguished
              Ayurvedic expert committed to revolutionizing holistic healthcare.
              With a deep-rooted understanding of traditional Indian medicine,
              he has successfully treated over{" "}
              <span className="font-semibold text-green-600">
                42,000+ patients
              </span>
              , specializing in neurological disorders and chronic ailments.
            </p>
            <p className="text-lg text-gray-600 leading-8">
              Holding a <span className="font-semibold">BAMS</span> and{" "}
              <span className="font-semibold">MD in Ayurveda</span> from
              Uttarakhand, along with expertise in Acupressure and Acupuncture,
              Dr. Agarwal seamlessly integrates ancient Ayurvedic wisdom with
              modern therapeutic approaches. His vision through Tulsi Ayurveda
              is to make Ayurveda a globally recognized and accessible
              healthcare system.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 p-5 mt-16">
          <div className="w-full md:w-1/2">
            <Image
              src="https://static.wixstatic.com/media/c58084_c2075842d3f8453eb01da888ecbc9298~mv2.png/v1/fill/w_729,h_598,fp_0.50_0.51,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-02-02%20at%2023_38_49.png"
              alt="DR. ANSHIKA MAMGAIN"
              width={1000}
              height={1000}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Dr. Anshika Mamgain
            </h2>
            <p className="text-lg text-gray-600 leading-8">
              Dr. Anshika Mamgain is a passionate expert in{" "}
              <span className="font-semibold text-green-600">
                Anorectal diseases
              </span>
              , including piles, fistula, fissure, pilonidal sinus, and
              non-healing ulcers. With her expertise in Ksharsutra, Uttarvasti,
              and Panchkarma, she is dedicated to transforming the lives of
              patients suffering from infertility, PCOD, and hormonal issues.
            </p>
            <p className="text-lg text-gray-600 leading-8">
              <span className="font-semibold">Education & Certifications:</span>{" "}
              <br />
              - Bachelor of Ayurvedic Medicine and Surgery (BAMS) <br />-
              Anorectal Certification (SDM Hassan, Karnataka)
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default About;
