import Image from "next/image";
import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect.tsx";

const words = [
  {
    text: "Real",
  },
  {
    text: "Ayurveda",
  },
  {
    text: "with",
  },
  {
    text: "Tulsi",
  },
  {
    text: "Ayurveda.",
    className: "text-green-500 dark:text-yellow-400",
  },
];

const Hero = () => {
  return (
    <div className="w-full p-0 relative">
      <div className="w-full min-h-[95vh] overflow-hidden relative">
        <Image
          src="https://static.wixstatic.com/media/nsplsh_332d7361735067586e6f51~mv2_d_7952_5304_s_4_2.jpg/v1/fill/w_1827,h_996,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20Annie%20Spratt.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="rounded-br-full object-cover"
        />
      </div>

      {/* top left  */}
      <div className="absolute top-36 left-28 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_9b904c7921cf41959cc1c0100e9742a9~mv2.png/v1/fill/w_180,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/Green%20and%20White%20Ayurveda%20New%20Year%20Wellness%20Youtube%20Thumbnail-2.png"
          alt="Hero Image"
          className="rounded-xl w-[10rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div>

      {/* bottom left  */}
      <div className="absolute bottom-36 left-64 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_9b904c7921cf41959cc1c0100e9742a9~mv2.png/v1/fill/w_180,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/Green%20and%20White%20Ayurveda%20New%20Year%20Wellness%20Youtube%20Thumbnail-2.png"
          alt="Hero Image"
          className="rounded-xl w-[10rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div>

      {/* bottom right */}
      <div className="absolute -bottom-28 right-4 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_637365e8f9484b2aab1828df567bd6a9~mv2.png/v1/fill/w_600,h_600,al_c,lg_1,q_85,enc_avif,quality_auto/GettyImages-1823979425_b.png"
          alt="Hero Image"
          className="rounded-xl w-[35rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div>
      <div className="absolute w-full top-0 left-0">
        <div className="w-full h-screen flex items-center justify-center flex-col">
          <Image
            src={
              "https://static.wixstatic.com/media/ff7094_de52692f41be4309b762f37e7b4d4cfb~mv2.jpeg/v1/crop/x_0,y_1,w_225,h_224/fill/w_295,h_288,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/logo.jpeg"
            }
            width={1000}
            height={1000}
            alt="logo"
            className="w-56 h-56 rounded-full border-8 border-white drop-shadow-lg"
          />
          <h1 className="text-h1 text-white font-semibold"><span className="text-green-700">TULSI</span> AYURVEDA</h1>
          {/* <p className="text-h3 text-white">
            Real Ayurveda with Tulsi Ayurveda
          </p> */}
          <TypewriterEffectSmooth words={words} />
          <button
            type="button"
            className="mt-4 text-link uppercase rounded-full bg-white border border-white hover:bg-transparent hover:text-white text-black py-3 px-6 duration-150"
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
