"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import s1 from "../../app/assets/s1.avif";
import s2 from "../../app/assets/s2.avif";
import s3 from "../../app/assets/s3.avif";
import s4 from "../../app/assets/s4.avif";
import s5 from "../../app/assets/s5.avif";
import s6 from "../../app/assets/s6.avif";
const images = [
  {
    title: "Arthritis",
    desc: "Arthritis causes joint pain and stiffness. Tulsi Ayurveda treats it with herbs, detox, and lifestyle changes for natural, lasting relief.",
    image: s1,
  },
  {
    title: "Infertility",
    desc: "Infertility is the inability to conceive. Tulsi Ayurveda treats it naturally with herbs, detox, and lifestyle changes.",
    image: s2,
  },
  {
    title: "Psoriasis",
    desc: "Psoriasis is a skin condition with red, scaly patches. Ayurveda treats it using herbal remedies, Panchkarma, and dietary changes",
    image: s3,
  },
  {
    title: "Piles",
    desc: "Piles are swollen veins in the rectum or anus, causing pain, bleeding, and discomfort, often treated with Ayurveda and lifestyle changes.",
    image: s4,
  },
  {
    title: "PCOD",
    desc: "PCOD causes hormonal imbalance, irregular periods, and weight gain, managed with Ayurveda and lifestyle changes.",
    image: s5,
  },
  {
    title: "Cervical spondylitis",
    desc: "Cervical spondylitis causes neck pain, treated in Ayurveda with herbs, Panchkarma, and posture correction.",
    image: s6,
  },
];

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-72 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/70 flex flex-col gap-5 py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-h3 font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
        <p className="text-link text-neutral-300">{card.desc}</p>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: StaticImageData;
};

export function FocusCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
        {images.map((item, index) => (
          <Card
            card={item}
            key={index}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-6 gap-2  mx-auto md:px-8 w-full">
        <div className="grid grid-rows-3">
          <div className="row-span-2">
            <Card
              card={images[0]}
              index={0}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
          <div className="row-span-1 bg-primary/10"></div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-1"></div>
          <div className="row-span-2">
            <Card
              card={images[1]}
              index={1}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1">
            <Card
              card={images[2]}
              index={2}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-1 bg-primary/10"></div>
          <div className="row-span-1 "></div>
          <div className="row-span-1">
            <Card
              card={images[3]}
              index={3}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-1"></div>
          <div className="row-span-2">
            <Card
              card={images[4]}
              index={4}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-2">
            <Card
              card={images[5]}
              index={5}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
          <div className="row-span-1 bg-primary/10"></div>
        </div>
      </div>
    </div>
  );
}
