import Image from "next/image";
import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect.tsx";
import Link from "next/link.js";

import logo from "../../app/assets/tulsi-logo.png";

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
    className: "text-primary",
  },
];

const Hero = () => {
  return (
    <div className="w-full p-0 relative">
      <div className="w-full min-h-[100dvh] overflow-hidden relative bg-background">
        <Image
          // src="https://static.wixstatic.com/media/nsplsh_332d7361735067586e6f51~mv2_d_7952_5304_s_4_2.jpg/v1/fill/w_1827,h_996,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20Annie%20Spratt.jpg"
          src="https://images.unsplash.com/photo-1495461199391-8c39ab674295?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="object-cover opacity-40"
        />
      </div>

      {/* <div className="absolute top-36 left-28 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_9b904c7921cf41959cc1c0100e9742a9~mv2.png/v1/fill/w_180,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/Green%20and%20White%20Ayurveda%20New%20Year%20Wellness%20Youtube%20Thumbnail-2.png"
          alt="Hero Image"
          className="rounded-xl w-[10rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div>

      <div className="absolute bottom-36 left-64 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_9b904c7921cf41959cc1c0100e9742a9~mv2.png/v1/fill/w_180,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/Green%20and%20White%20Ayurveda%20New%20Year%20Wellness%20Youtube%20Thumbnail-2.png"
          alt="Hero Image"
          className="rounded-xl w-[10rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div>

      <div className="absolute -bottom-28 right-4 z-20">
        <Image
          src="https://static.wixstatic.com/media/c58084_637365e8f9484b2aab1828df567bd6a9~mv2.png/v1/fill/w_600,h_600,al_c,lg_1,q_85,enc_avif,quality_auto/GettyImages-1823979425_b.png"
          alt="Hero Image"
          className="rounded-xl w-[35rem] z-20 drop-shadow-xl"
          width={1000}
          height={1000}
        />
      </div> */}
      <div className="absolute w-full top-0 left-0">
        <div className="w-full h-screen flex items-center justify-center flex-col">
          <Image
            src={logo}
            // src={
            //   "https://static.wixstatic.com/media/ff7094_de52692f41be4309b762f37e7b4d4cfb~mv2.jpeg/v1/crop/x_0,y_1,w_225,h_224/fill/w_295,h_288,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/logo.jpeg"
            // }
            width={1000}
            height={1000}
            alt="logo"
            className="w-56 h-56 rounded-full drop-shadow-lg"
          />
          <h1 className="text-h1 text-white font-semibold tracking-widest">
            TULSI AYURVEDA
          </h1>
          {/* <p className="text-h3 text-white">
            Real Ayurveda with Tulsi Ayurveda
          </p> */}
          <TypewriterEffectSmooth words={words} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
