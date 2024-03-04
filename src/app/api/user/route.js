import Account from "@/app/models/Account";
import User from "@/app/models/User";
import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async (req, res) => {
  try {
    const sess = await getServerSession(authOptions);

    if (!sess) {
      return NextResponse.json({ msg: "Not Authenticated" }, { status: 401 });
    }

    const uid = sess?.user?.id;

    await connectDB();
    const user = await User.findById(uid)
      .select("-password -salt -__v")
      .populate([
        {
          path: "videos",
          model: Video,
        },
        {
          path: "accounts",
          model: Account,
        },
      ]);
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Err" }, { status: 500 });
  }
};
