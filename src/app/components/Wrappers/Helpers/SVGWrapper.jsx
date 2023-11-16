"use client";
const SVGWrapper = ({ className, children }) => {
  return <div className={`${className} relative`}>{children}</div>;
};

export default SVGWrapper;
