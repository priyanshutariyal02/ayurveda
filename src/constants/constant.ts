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

import g1 from "../app/assets/g1.avif";
import g2 from "../app/assets/g2.avif";
import g3 from "../app/assets/g3.avif";
import g4 from "../app/assets/g4.avif";
import g5 from "../app/assets/g5.avif";

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

interface OurAchievements {
  title: string;
  value: number;
}

interface About {
  heading: string;
  desc: string;
}

interface Gallery {
  name: StaticImageData;
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

export const achievements: OurAchievements[] = [
  {
    title: "Happy Patients",
    value: 40000,
  },
  {
    title: "Countries",
    value: 30,
  },
  {
    title: "Student",
    value: 30000,
  },
  {
    title: "Seminars",
    value: 20,
  },
];

// about
export const about: About[] = [
  {
    heading: "Authentic Ayurvedic Care",
    desc: "Rooted in ancient Ayurvedic principles while embracing modern innovation.",
  },
  {
    heading: "Holistic Healing Approach",
    desc: "Focuses on overall well-being rather than just treating symptoms.",
  },
  {
    heading: "Experienced Ayurvedic Doctors",
    desc: "A team of qualified experts dedicated to natural healing.",
  },
  {
    heading: "Personalized Treatment Plans",
    desc: "Customized solutions based on individual health needs.",
  },
  {
    heading: "Online Consultation Services",
    desc: "Easy access to Ayurvedic expertise from anywhere in the world.",
  },
  {
    heading: "Natural & Time-Tested Remedies",
    desc: "Using herbs, therapies, and lifestyle changes for sustainable health.",
  },
  {
    heading: "Global Reach",
    desc: "Spreading Ayurvedic wisdom beyond borders.",
  },
  {
    heading: "Commitment to Wellness",
    desc: "Aiming to transform lives with accessible and reliable Ayurvedic solutions.",
  },
];

// gallery

export const gallery: Gallery[] = [
  {
    name: g1,
  },
  {
    name: g2,
  },
  {
    name: g3,
  },
  {
    name: g4,
  },
  {
    name: g5,
  },
];
