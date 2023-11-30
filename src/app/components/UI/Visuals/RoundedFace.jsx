"use client";

import Image from "next/image";

const RoundedFace = ({ size, className, src, txt }) => {
  return (
    <div
      className={`${className} rounded-full ${
        size === "S" ? "h-8 w-8" : size === "M" ? "h-12 w-12" : "h-16 w-16"
      }`}
    >
      {src && src.length && <Image src={src} alt="Display pic" fill={true} />}
      {txt && txt.length && txt[0]}
    </div>
  );
};

export default RoundedFace;
