"use client";

import React from "react";
import ReactSlider from "react-slider";
import { motion } from "framer-motion";
import { Button } from "../../utilUI/ui/button";

const LengthCustomizationSlider = ({
  min = 0,
  max = 100,
  standardRange = 50,
  colorRanges = [
    { color: "#ff0000", intensity: 0 },
    { color: "#00ff00", intensity: 50 },
    { color: "#0000ff", intensity: 100 },
  ],
}) => {
  const generateGradient = (colorRanges) => {
    // Assuming colorRanges is an array of objects with color and intensity
    // Example: [/.{ color: '#ff0000', intensity: 50 }, { color: '#00ff00', intensity: 100 }, ...]

    // Create a string for each color stop
    const colorStops = colorRanges.map((range) => {
      return `${range.color} ${range.intensity}%`;
    });

    // Join the color stops into a linear-gradient string
    return `linear-gradient(to right, ${colorStops.join(", ")})`;
  };

  const gradientStyle = {
    background: generateGradient(colorRanges),
  };

  const defaultValue = Array.isArray(standardRange)
    ? standardRange
    : [standardRange];

  // Custom thumb component
  const Thumb = (props, state) => (
    <motion.div {...props} className="thumb cursor-pointer">
      <div>Yo</div>
    </motion.div>
  );

  return (
    <div className="w-80 h-10 rounded-lg overflow-hidden" style={gradientStyle}>
      <ReactSlider
        className="horizontal-slider h-full"
        thumbClassName="absolute top-1/2 translate-y-1/2 h-4 w-4 bg-blue-500 rounded-full focus:outline-none"
        trackClassName="h-2 bg-gray-200"
        renderThumb={Thumb}
        min={min}
        max={max}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default LengthCustomizationSlider;
