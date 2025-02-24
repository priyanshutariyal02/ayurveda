import { StaticImageData } from "next/image";
import s1 from "../app/assets/s1.avif";
import s2 from "../app/assets/s2.avif";
import s3 from "../app/assets/s3.avif";
import s4 from "../app/assets/s4.avif";
import s5 from "../app/assets/s5.avif";
import s6 from "../app/assets/s6.avif";

import p1 from "../app/assets/p1.avif";
import p2 from "../app/assets/p2.avif";
import p3 from "../app/assets/p3.avif";
import p4 from "../app/assets/p4.avif";

interface OurSpecialties {
  title: string;
  description: string;
  img: StaticImageData;
}

interface OurProducts {
  title: string;
  img: StaticImageData;
  link: string;
}

export const ourProducts: OurProducts[] = [
  {
    title: "Vatahari Oil",
    img: p1,
    link: "",
  },
  {
    title: "Vita 40",
    img: p2,
    link: "",
  },
  {
    title: "Pain Relief Potli",
    img: p3,
    link: "",
  },
  {
    title: "Swarnprashan - Booster",
    img: p4,
    link: "",
  },
];

export const ourSpecialties: OurSpecialties[] = [
  {
    title: "Arthritis",
    description:
      "Arthritis causes joint pain and stiffness. Tulsi Ayurveda treats it with herbs, detox, and lifestyle changes for natural, lasting relief.",
    img: s1,
  },
  {
    title: "Infertility",
    description:
      "Infertility is the inability to conceive. Tulsi Ayurveda treats it naturally with herbs, detox, and lifestyle changes.",
    img: s2,
  },
  {
    title: "Psoriasis",
    description:
      "Psoriasis is a skin condition with red, scaly patches. Ayurveda treats it using herbal remedies, Panchkarma, and dietary changes",
    img: s3,
  },
  {
    title: "Piles",
    description:
      "Piles are swollen veins in the rectum or anus, causing pain, bleeding, and discomfort, often treated with Ayurveda and lifestyle changes.",
    img: s4,
  },
  {
    title: "PCOD",
    description:
      "PCOD causes hormonal imbalance, irregular periods, and weight gain, managed with Ayurveda and lifestyle changes.",
    img: s5,
  },
  {
    title: "Cervical spondylitis",
    description:
      "Cervical spondylitis causes neck pain, treated in Ayurveda with herbs, Panchkarma, and posture correction.",
    img: s6,
  },
];
