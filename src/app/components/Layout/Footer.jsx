import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex py-2 px-4 text-white w-full">
      <div className="flex flex-col items-center justify-center w-1/5">
        <div>Footer</div>
        <div>GI</div>
      </div>

      <div className="px-6 flex items-center">
        <Link href="/" />
        <Link href="/" />
        <Link href="/" />
      </div>
      <div className="px-6 flex items-center">
        <Link href="/" />
        <Link href="/" />
        <Link href="/" />
      </div>
      <div className="px-6 flex items-center">
        <Link href="/" />
        <Link href="/" />
        <Link href="/" />
      </div>
    </div>
  );
};

export default Footer;
