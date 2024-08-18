"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  isRequired?: boolean;
  error?: string;
}

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isRequired,
  error,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="relative">
      <label
        htmlFor={label}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
          focused || value ? "text-gray-700 dark:text-gray-300" : ""
        }`}
      >
        {label}
        {isRequired && (
          <span className="text-red-500">*</span>
        )}
      </label>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm ${
          focused ? "border-blue-500" : "border-gray-300"
        } ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;