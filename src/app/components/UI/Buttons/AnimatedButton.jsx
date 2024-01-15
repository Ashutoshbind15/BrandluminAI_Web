"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ onStateChange, children, onClick }) => {
  const [selected, setSelected] = useState(false);

  // Animation variants for the bottom line
  const lineVariants = {
    selected: { width: "100%", backgroundColor: "#000000" },
    unselected: { width: "0%", backgroundColor: "#808080" },
  };

  // Handle button click
  const handleClick = () => {
    setSelected(!selected);
  };

  // Inform parent component about state change
  useEffect(() => {
    if (onStateChange) {
      onStateChange(selected);
    }
  }, [selected, onStateChange]);

  return (
    <button
      className="relative inline-flex items-center justify-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
      onClick={handleClick}
    >
      {children}
      <motion.div
        className="absolute bottom-0 h-[3px] left-0"
        variants={lineVariants}
        animate={selected ? "selected" : "unselected"}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
};

export default AnimatedButton;
