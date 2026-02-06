"use client";

import React from "react";

type ButtonProps = {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;   // ✅ REQUIRED
  className?: string;     // ✅ REQUIRED
  children: React.ReactNode;
};

export default function Button({
  type = "button",
  disabled = false,
  onClick,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}     // ✅ PASS CLICK HANDLER
      className={`
        w-full
        bg-pink-600
        text-white
        py-3
        rounded-xl
        hover:bg-pink-700
        disabled:opacity-60
        disabled:cursor-not-allowed
        transition
        hover:cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
