"use client";

import { ProfileFilled } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import PrimaryButton from "../UI/Buttons/PrimaryButton";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useUser } from "@/app/utils/hooks/queries";
import { Skeleton } from "../utilUI/ui/skeleton";

const AccountDropbar = ({ auth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const { user, isUserError, isUserLoading, userError } = useUser();

  if (!auth) {
    return (
      <Link href={"/auth"} className="text-md font-normal">
        Login
      </Link>
    );
  }
  return (
    <div
      className="py-2 btm-shadow flex flex-col relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUserLoading ? (
        <div className="flex items-center">
          <div className="px-2 border-r-1 border-black">
            <ProfileFilled />
          </div>
          <div className="pt-1 px-2 font-normal">{user?.name}</div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 border-r-2 border-black pr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      )}

      {isHovered && (
        <div className="absolute bg-white z-30 font-normal px-2 top-full w-80 transform right-0 py-8 shadow-lg flex flex-col items-center">
          <PrimaryButton
            onClick={() => router.push("/profile")}
            className={"my-3"}
          >
            Profile
          </PrimaryButton>
          <PrimaryButton onClick={() => signOut()} className={"my-3"}>
            Logout
          </PrimaryButton>
          <PrimaryButton
            onClick={() => router.push("/auth")}
            className={"my-3"}
          >
            Link Accounts
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default AccountDropbar;
