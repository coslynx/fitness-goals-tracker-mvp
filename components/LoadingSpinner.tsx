"use client";

import { useState, useEffect } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isLoading && (
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-400 animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;