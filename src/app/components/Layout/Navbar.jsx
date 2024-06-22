"use client";

import { CalendarFilled, StarFilled } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AccountDropbar from "./AccountDropbar";

const Navbar = () => {
  const { data: sess } = useSession();

  return (
    <div className="p-4 text-xl font-bold bg-white text-black flex items-center justify-between border-b-1 border-black">
      <Link href={"/"}>BrandLuminAI</Link>

      <div className="flex items-center font-normal">
        <Link
          href="/videos"
          className="px-4 border-r-1 border-black hover:font-semibold hover:decoration-black active:underline hover:underline"
        >
          Videos
        </Link>
        <Link
          href="/ideas"
          className="px-4 border-black hover:font-semibold hover:decoration-black active:underline hover:underline"
        >
          Ideas
        </Link>
      </div>

      <div>
        {sess && <AccountDropbar auth={true} />}
        {!sess && <AccountDropbar auth={false} />}
      </div>
    </div>
  );
};

export default Navbar;
