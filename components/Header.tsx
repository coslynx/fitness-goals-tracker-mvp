"use client";

import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { HiOutlineSun } from "react-icons/hi";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) {
      setIsDarkMode(JSON.parse(storedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Fitness Tracker
        </h1>
        <div className="flex items-center">
          <Navigation />
          <button
            onClick={toggleDarkMode}
            className="ml-4 rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDarkMode ? (
              <HiOutlineSun className="h-5 w-5" />
            ) : (
              <BsFillMoonStarsFill className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;