"use client";

import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandYoutube,
  IconPhoneCall,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {
  const sections = [
    {
      label: "Menu",
      links: [
        { name: "Home", link: "/" },
        { name: "About", link: "/" },
        { name: "Shop", link: "/" },
        { name: "Appointments", link: "/" },
        { name: "Courses", link: "/" },
        { name: "Blogs", link: "/" },
      ],
    },
    {
      label: "Legal",
      links: [
        { name: "Terms & Conditions", link: "/" },
        { name: "Privacy Policy", link: "/" },
        { name: "Shipping Policy", link: "/" },
        { name: "Refund Policy", link: "/" },
        { name: "FAQ", link: "/" },
        { name: "Accessibility Statement", link: "/" },
      ],
    },
  ];

  // Newsletter Form State
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }

    console.log("Email:", email);
    console.log("Subscribed:", subscribed);

    setMessage("Thank you for subscribing!");
    setEmail("");
    setSubscribed(false);
  };

  return (
    <footer className="p-8 lg:px-28">
      <hr className="border-t mb-10" />

      <div className="w-full flex flex-col lg:flex-row justify-between gap-14">
        {/* Left Section */}
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold">
            Tulsi <span className="text-green-600">Ayurveda</span>
          </h1>
          <p className="text-gray-600 text-sm mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam alias
            provident deleniti perspiciatis quae distinctio.
          </p>
          {/* Newsletter Section */}
          <div className="flex flex-col gap-4 w-full mt-10">
            <h3 className="text-lg font-semibold text-gray-700">
              Let's Stay in Touch
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <label className="flex items-center gap-2 text-gray-700 text-sm">
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={subscribed}
                  onChange={(e) => setSubscribed(e.target.checked)}
                  className="w-4 h-4 accent-green-600"
                />
                Subscribe to our newsletter
              </label>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Submit
              </button>

              {message && <p className="text-sm text-green-600">{message}</p>}
            </form>
          </div>
        </div>

        {/* Navigation & Newsletter */}

        <div className="grid grid-cols-3 md:grid-cols-3 gap-10 w-full justify-items-center">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-gray-700">
                {section.label}
              </h3>
              <ul className="flex flex-col gap-2 text-gray-600 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="hover:text-green-600">
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Contact Section */}
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center gap-2">
                <IconPhoneCall size={18} /> +91-6398383100
              </p>
              <p className="flex items-center gap-2">
                <IconMail size={18} /> tulsiayurvedaclinic@gmail.com
              </p>
            </div>

            <div className="flex gap-4 mt-2">
              <Link href="/" target="_blank">
                <IconBrandInstagram
                  size={24}
                  className="text-gray-600 hover:text-green-600"
                />
              </Link>
              <Link href="/" target="_blank">
                <IconBrandFacebook
                  size={24}
                  className="text-gray-600 hover:text-green-600"
                />
              </Link>
              <Link href="/" target="_blank">
                <IconBrandLinkedin
                  size={24}
                  className="text-gray-600 hover:text-green-600"
                />
              </Link>
              <Link href="/" target="_blank">
                <IconBrandYoutube
                  size={24}
                  className="text-gray-600 hover:text-green-600"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full pt-6 flex justify-center border-t mt-8">
        <p className="text-gray-600 text-center text-sm">
          © {new Date().getFullYear()} Tulsi Ayurveda. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
