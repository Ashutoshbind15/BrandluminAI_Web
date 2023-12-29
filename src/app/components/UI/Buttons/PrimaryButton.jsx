"use client";

import React from "react";

const PrimaryButton = ({ className, onClick, children }) => {
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
