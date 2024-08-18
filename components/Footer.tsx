"use client";

import { useState, useEffect } from "react";
import { HiOutlineCopyright } from "react-icons/hi";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-100 py-8 px-4 text-center text-gray-600">
      <div className="flex items-center justify-center gap-2">
        <HiOutlineCopyright className="text-gray-400" />
        <p>{year} Fitness Tracker - All rights reserved.</p>
      </div>
      <div>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          Terms of Service
        </a>
        {" | "}
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;