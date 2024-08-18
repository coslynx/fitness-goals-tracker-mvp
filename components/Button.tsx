"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  label,
  variant = "primary",
  onClick,
  disabled = false,
  className,
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setModal } = useStore();

  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
    }
    setIsLoading(false);
  };

  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`
        px-4
        py-2
        rounded-md
        font-medium
        text-white
        transition
        duration-200
        ${
          variant === "primary"
            ? "bg-blue-500 hover:bg-blue-600"
            : variant === "secondary"
            ? "bg-gray-500 hover:bg-gray-600"
            : variant === "tertiary"
            ? "bg-gray-300 hover:bg-gray-400"
            : variant === "danger"
            ? "bg-red-500 hover:bg-red-600"
            : ""
        }
        ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isLoading ? "cursor-wait" : ""}
      `}
    >
      {isLoading ? (
        <BsFillArrowRightCircleFill className="animate-spin" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;