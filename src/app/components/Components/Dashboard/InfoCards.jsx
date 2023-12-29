import React from "react";

const InfoCards = ({ children, color, className }) => {
  return (
    <div
      className={`py-2 px-4 shadow-lg rounded-lg text-${color} ${className}`}
    >
      {children}
    </div>
  );
};

export default InfoCards;
