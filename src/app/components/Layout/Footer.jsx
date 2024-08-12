import {
  FacebookFilled,
  FacebookOutlined,
  InstagramFilled,
  InstagramOutlined,
  TwitterOutlined,
  TwitterSquareFilled,
  YoutubeFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex px-4 py-8 text-white w-full bg-black">
      <div className="flex flex-col items-center justify-center w-1/5">
        <div className="text-xl font-bold tracking-wider">BrandLuminAI</div>

        <div className="text-center">Built by Ashutosh Bind</div>
      </div>

      <div className="w-4/5 flex items-center">
        <div className="mx-4 flex items-center hover:bg-white hover:text-black transition-all flex-1 self-stretch flex-col justify-around py-2">
          <Link
            href={"/videos"}
            className="text-lg font-semibold tracking-wider my-4"
          >
            Videos
          </Link>
        </div>
        <div className="mx-4 flex items-center flex-1 self-stretch flex-col justify-around hover:bg-white hover:text-black py-2">
          <Link
            href={"/ideas"}
            className="text-lg font-semibold tracking-wider my-4"
          >
            Ideas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
