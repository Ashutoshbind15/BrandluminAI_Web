"use client";

import React, { useState } from "react";
import ReactSlider from "react-slider";

const AgeRangeSlider = ({ recommendedRange, ageIcons }) => {
  const [ageRange, setAgeRange] = useState([
    recommendedRange.min,
    recommendedRange.max,
  ]);

  // Function to render icons
  const renderIcons = () => {
    return ageIcons.map((icon, index) => {
      if (icon.age >= ageRange[0] && icon.age <= ageRange[1]) {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `calc(${(icon.age / 100) * 100}% - 10px)`,
              top: "-30px",
            }}
          >
            {icon.icon}
          </div>
        );
      }
      return null;
    });
  };
  const Track = (props, state) => {
    const { key, ...restProps } = props;

    let classNames = "example-track ";
    if (state.index === 1) classNames += "example-track-selected";
    return <div {...restProps} className={classNames} key={key} />;
  };
  const renderThumb = (props, state) => {
    const { key, ...restProps } = props;

    let thumbClass = "example-thumb";
    if (state.index === 1) {
      thumbClass += " right-thumb"; // Add a special class for the right thumb
    }
    return (
      <div {...restProps} key={key} className={thumbClass}>
        {state.valueNow}
      </div>
    );
  };

  return (
    <div className="relative p-4 bg-white border-1 border-black pt-10 rounded-b-xl flex flex-col items-center">
      <div className="relative w-96">{renderIcons()}</div>
      <ReactSlider
        className="horizontal-slider custom-track w-96"
        renderTrack={Track}
        renderThumb={renderThumb}
        defaultValue={[recommendedRange.min, recommendedRange.max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={10}
        onChange={(value) => setAgeRange(value)}
      />
      <div className="mt-12 mb-3">
        Selected Age Range: {ageRange[0]} - {ageRange[1]}
      </div>
    </div>
  );
};

export default AgeRangeSlider;
