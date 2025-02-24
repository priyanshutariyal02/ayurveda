import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="w-full flex items-center flex-col pb-10">
      <h1 className="text-body text-primary font-semibold">About Us</h1>
      <h1 className="text-h2-display">
        What is <span className="text-green-600 italic">Tulsi</span> Ayurvada?
      </h1>
      <p className="max-w-6xl text-link text-center mt-4">
        At Tulsi Ayurveda, we are committed to transforming lives through
        authentic Ayurvedic treatments that restore balance and promote holistic
        well-being. Rooted in the ancient wisdom of Ayurveda, our approach
        integrates traditional healing practices with modern advancements,
        ensuring personalized care for every individual. Our mission extends
        beyond treatment—we aim to educate, empower, and inspire individuals to
        embrace an Ayurvedic lifestyle for long-term health. With a strong focus
        on preventive care and natural healing, we also nurture the next
        generation of Vaidyas, fostering a future where Ayurveda is recognized
        as a global primary healthcare system. At Tulsi Ayurveda, we believe in
        not just treating ailments but transforming lives through the timeless
        wisdom of Ayurveda.
      </p>
      <Link
        href={"/about"}
        className="mt-6 px-6 py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-white duration-200 transition-all ease-in-out"
      >
        Read More
      </Link>
      <div className="w-full flex flex-col py-16 px-6 md:px-20">
        <h1 className="text-h2-display max-w-xl">
          <span className="text-primary">Visionaries</span> Behind Tulsi Ayurveda
        </h1>

        {/* DR. ANKIT AGARWAL */}
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

        {/* DR. ANSHIKA MAMGAIN */}
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
      </div>
    </div>
  );
};

export default About;
