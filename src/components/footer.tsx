"use client";

import {
  IconBrandInstagram,
  IconMapPin,
  IconPhone,
  IconMail,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
// import PrivacyPolicy from "./privacy-policy";
// import Disclaimer from "./disclaimer";
// import StandardTerms from "./standard-terms";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleOpenModal = (doc: string) => {
    setSelectedDocument(doc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDocument("");
  };

  const sections = [
    {
      label: "Company",
      links: [
        { name: "About Us", link: "/about" },
        { name: "Services", link: "/services" },
        { name: "Case Studies", link: "/caseStudies" },
        { name: "Insights", link: "/insight" },
      ],
    },
    {
      label: "Useful Links",
      links: [
        {
          name: "Privacy Policy",
          onClick: () => handleOpenModal("Privacy Policy"),
        },
        {
          name: "Standard Terms",
          onClick: () => handleOpenModal("Standard Terms"),
        },
        { name: "Disclaimer", onClick: () => handleOpenModal("Disclaimer") },
        { name: "Contact", link: "/contact" },
      ],
    },
  ];

  const locations = [
    {
      city: "New York",
      address: "29 Briggs St, Hicksville, NY 11801",
      phone: "+1 816-375-5732",
      email: "hello@primevistaglobal.com",
    },
    {
      city: "Dehradun",
      address: "'1A RCR' Racecourse Road",
      phone: "+91 999-726-7260",
      email: "hello@primevistaglobal.com",
    },
  ];

  return (
    <footer className="p-5 lg:px-28 md:p-8 lg:p-10 absolute left-0 w-full">
      <hr className="border-t mb-14" />
      <div className="w-full flex flex-wrap justify-between gap-4 lg:justify-items-center">
        <div className="w-full lg:w-1/4 flex flex-col gap-5">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Tulsi <span className="text-secondary-green">Ayurveda</span>
          </h1>
          <p className="text-link">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam alias
            provident deleniti perspiciatis quae distinctio similique accusamus
            vitae commodi quasi.
          </p>
        </div>
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-4 items-start">
            <h3 className="mb-4 font-medium text-h4 text-gray-700">
              {section.label}
            </h3>
            <ul className="flex flex-col items-start gap-3 text-gray-500">
              {section.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="text-link hover:text-primary duration-200 cursor-pointer"
                >
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="focus:outline-none"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.link}>{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Location Column */}
        <div className="flex flex-col gap-4 items-start">
          <h3 className="mb-4 font-medium text-h4 text-gray-700">Locations</h3>
          {locations.map((location, index) => (
            <div key={index} className="mb-4 text-gray-500">
              <h4 className="font-medium text-body text-gray-600">
                {location.city}
              </h4>
              <div className="flex items-center gap-2 text-link">
                <IconMapPin size={16} /> <span>{location.address}</span>
              </div>
              <div className="flex items-center gap-2 text-link">
                <IconPhone size={16} /> <span>{location.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-link">
                <IconMail size={16} /> <span>{location.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-5 lg:gap-0 lg:flex-row justify-between items-center mt-8 border-t pt-4">
        <p className="text-gray-600 text-center lg:text-left">
          © {new Date().getFullYear()} Tulsi Ayurveda. All rights reserved.
        </p>

        <div className="flex space-x-4">
          <Link href={"/"} target="blank">
            <IconBrandLinkedin
              className="hover:text-gray-400 cursor-pointer"
              size={20}
            />
          </Link>
          <Link href={"/"} target="blank">
            <IconBrandInstagram
              className="hover:text-gray-400 cursor-pointer"
              size={20}
            />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {/* {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          {selectedDocument === "Privacy Policy" && (
            <PrivacyPolicy handleCloseModal={handleCloseModal} />
          )}
          {selectedDocument === "Disclaimer" && (
            <Disclaimer handleCloseModal={handleCloseModal} />
          )}
          {selectedDocument === "Standard Terms" && (
            <StandardTerms handleCloseModal={handleCloseModal} />
          )}
        </div>
      )} */}
    </footer>
  );
};

export default Footer;
