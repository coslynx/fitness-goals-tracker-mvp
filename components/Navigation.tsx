"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navigation = () => {
  const { data: session } = useSession();
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
    <nav className="flex gap-4">
      {session ? (
        <>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/goals"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Goals
          </Link>
          <Link
            href="/workouts"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Workouts
          </Link>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors duration-200"
          >
            Register
          </Link>
        </>
      )}
      <button
        onClick={toggleDarkMode}
        className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200"
      >
        {isDarkMode ? (
          <HiOutlineSun className="h-5 w-5" />
        ) : (
          <BsFillMoonStarsFill className="h-5 w-5" />
        )}
      </button>
    </nav>
  );
};

export default Navigation;