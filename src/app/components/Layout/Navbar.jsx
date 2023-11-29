"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: sess } = useSession();

  return (
    <div className="p-4 text-xl font-bold text-white bg-blue-700 flex items-center justify-between">
      <Link href={"/"}>V2C</Link>

      <div className="flex items-center">
        <Link href="/videos" className="mr-4">
          Videos
        </Link>
        <Link href="/ideas" className="mr-4">
          Ideas
        </Link>
        {sess && <button onClick={() => signOut()}>Logout</button>}
        {!sess && <Link href={"/auth"}>Login</Link>}
      </div>
    </div>
  );
};

export default Navbar;
