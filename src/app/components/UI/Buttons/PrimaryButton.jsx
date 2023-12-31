"use client";

import React from "react";

const PrimaryButton = ({ className, onClick, children, size = "medium" }) => {
  if (size === "lg") {
    return (
      <span
        className={`${className} px-8 py-2 cursor-pointer bg-black text-white text-center hover:scale-105 transition-all`}
        onClick={onClick}
      >
        {children}
      </span>
    );
  } else if (size === "sm") {
    return (
      <span
        className={`${className} px-4 py-1 cursor-pointer bg-black text-white text-center hover:scale-105 transition-all`}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={`${className} px-4 py-1 cursor-pointer bg-black text-white text-center hover:scale-105 transition-all`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default PrimaryButton;
