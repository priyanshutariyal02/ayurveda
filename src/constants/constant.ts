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

import c4 from "../app/assets/c4.avif";

import ofc1 from "../app/assets/ofc1.avif";
import ofc2 from "../app/assets/ofc2.avif";

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

// shop

export interface Product {
  id: number;
  name: string;
  img: string;
  sub: string;
  desc: string;
  tag: string;
  size: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Combo - 5 Vatahari Oil",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "New Offer",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 2,
    name: "Combo - 3 Vatahari Oil",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "New Offer",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 3,
    name: "Combo - Vatahari Oil + Potli for pain relief",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 4,
    name: "SWARNPRASHAN - Booster for your child",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 5,
    name: "Potl -For Pain relief",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "New Offer",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 6,
    name: "Vita 40 (500g)",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "",
    size: "500ml",
    price: 850,
    desc: "",
  },
  {
    id: 7,
    name: "Vatahari - Pain Relief Oil",
    img: "https://static.wixstatic.com/media/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png/v1/fill/w_431,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c58084_a0899607d3894c73afb204e8aa4a467b~mv2.png",
    sub: "Tulsi Ayurveda Exculsive Offer",
    tag: "",
    size: "500ml",
    price: 850,
    desc: "Vatahari Oil is a powerful Ayurvedic medicated oil designed to relieve joint pain, muscle stiffness, and inflammation. It is enriched with anti-inflammatory herbs that help balance Vata dosha, making it effective for conditions like arthritis, spondylitis, and muscle stiffness. Regular massage with Vatari Oil improves mobility, reduces swelling, and promotes natural healing. Ideal for those seeking long-term relief through Ayurveda.",
  },
];

// courses
interface OnCoursesList {
  name: string;
  img: StaticImageData;
  desc: string;
  link: string;
}

export const onCoursesList: OnCoursesList[] = [
  {
    name: "Nasya Dhoompan",
    img: c4,
    desc: "Nasya & Dhoompan: Ayurvedic therapies for respiratory health, mental clarity, and detoxification.",
    link: "/",
  },
];

interface OffCoursesList {
  name: string;
  img: StaticImageData;
  desc: string;
  price: number;
  sub: string;
  link: string;
}

export const offCoursesList: OffCoursesList[] = [
  {
    name: "1 Month Panchkarma Training",
    img: ofc1,
    desc: "Designed for the general public, this course offers a foundational understanding of Panchakarma therapy, including detoxification techniques, practical applications, and Ayurvedic wellness practices, making it accessible to all health enthusiasts.",
    price: 20000,
    sub: "*Excluding registration fee",
    link: "/",
  },
  {
    name: "2 Months Clinical Training",
    img: ofc2,
    desc: "Specifically designed for BAMS doctors, this program provides hands-on training in clinical research methodologies, regulatory guidelines, and real-world trial applications, equipping professionals with essential skills for the field of clinical studies.",
    price: 30000,
    sub: "*Excluding registration fee",
    link: "/",
  },
];
